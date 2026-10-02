create table public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  company_name text not null check (char_length(company_name) between 2 and 160),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 32),
  interest text not null default 'outro'
    check (interest in ('atendimento', 'funil', 'automacao', 'analise', 'ia', 'outro')),
  details text check (details is null or char_length(details) <= 2000),
  source text not null default 'site' check (char_length(source) <= 120),
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;
revoke all on public.demo_requests from anon, authenticated;
grant insert, select on public.demo_requests to service_role;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 160),
  created_at timestamptz not null default now()
);

create table public.organization_memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'manager', 'agent', 'analyst')),
  display_name text not null default 'Membro' check (char_length(display_name) between 1 and 120),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index organization_memberships_user_id_idx
  on public.organization_memberships(user_id);

create or replace function public.has_org_role(target_org uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_org
      and membership.user_id = (select auth.uid())
      and membership.role = any(allowed_roles)
  );
$$;

revoke all on function public.has_org_role(uuid, text[]) from public, anon;
grant execute on function public.has_org_role(uuid, text[]) to authenticated;

create table public.pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  position smallint not null check (position >= 0),
  created_at timestamptz not null default now(),
  unique (organization_id, id),
  unique (organization_id, position),
  unique (organization_id, name)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 160),
  email text check (email is null or char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 32),
  source text check (source is null or char_length(source) <= 120),
  stage_id uuid,
  assigned_to uuid references auth.users(id) on delete set null,
  next_action text check (next_action is null or char_length(next_action) <= 500),
  next_action_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (organization_id, stage_id)
    references public.pipeline_stages(organization_id, id)
);

create index contacts_organization_updated_idx
  on public.contacts(organization_id, updated_at desc);
create index contacts_assigned_to_idx
  on public.contacts(organization_id, assigned_to);

create table public.contact_activity (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('created', 'updated')),
  summary text not null check (char_length(summary) between 2 and 500),
  created_at timestamptz not null default now()
);

create index contact_activity_contact_created_idx
  on public.contact_activity(contact_id, created_at desc);

alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.contacts enable row level security;
alter table public.contact_activity enable row level security;

revoke all on public.organizations, public.organization_memberships,
  public.pipeline_stages, public.contacts, public.contact_activity
  from anon, authenticated;
grant select on public.organizations, public.organization_memberships,
  public.pipeline_stages, public.contacts, public.contact_activity to authenticated;
grant insert, update, delete on public.contacts to authenticated;

create policy "Members can view their organizations"
  on public.organizations for select to authenticated
  using (public.has_org_role(id, array['admin', 'manager', 'agent', 'analyst']));

create policy "Members can view organization memberships"
  on public.organization_memberships for select to authenticated
  using (public.has_org_role(organization_id, array['admin', 'manager', 'agent', 'analyst']));

create policy "Members can view pipeline stages"
  on public.pipeline_stages for select to authenticated
  using (public.has_org_role(organization_id, array['admin', 'manager', 'agent', 'analyst']));

create policy "Members can view permitted contacts"
  on public.contacts for select to authenticated
  using (
    public.has_org_role(organization_id, array['admin', 'manager', 'analyst'])
    or assigned_to = (select auth.uid())
    or created_by = (select auth.uid())
  );

create policy "Operators can create contacts"
  on public.contacts for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and (
      public.has_org_role(organization_id, array['admin', 'manager'])
      or (
        public.has_org_role(organization_id, array['agent'])
        and (assigned_to is null or assigned_to = (select auth.uid()))
      )
    )
  );

create policy "Managers and assigned operators can update contacts"
  on public.contacts for update to authenticated
  using (
    public.has_org_role(organization_id, array['admin', 'manager'])
    or (
      public.has_org_role(organization_id, array['agent'])
      and assigned_to = (select auth.uid())
    )
  )
  with check (
    public.has_org_role(organization_id, array['admin', 'manager'])
    or (
      public.has_org_role(organization_id, array['agent'])
      and assigned_to = (select auth.uid())
    )
  );

create policy "Managers can delete contacts"
  on public.contacts for delete to authenticated
  using (public.has_org_role(organization_id, array['admin', 'manager']));

create policy "Members can view contact activity"
  on public.contact_activity for select to authenticated
  using (public.has_org_role(organization_id, array['admin', 'manager', 'agent', 'analyst']));

create or replace function public.create_organization(organization_name text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_organization_id uuid;
  authenticated_user_id uuid := (select auth.uid());
  member_display_name text;
begin
  if authenticated_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if char_length(trim(organization_name)) not between 2 and 160 then
    raise exception 'Organization name must be between 2 and 160 characters' using errcode = '22023';
  end if;

  select coalesce(
    nullif(trim(user_record.raw_user_meta_data ->> 'full_name'), ''),
    split_part(user_record.email, '@', 1),
    'Administrador'
  )
  into member_display_name
  from auth.users as user_record
  where user_record.id = authenticated_user_id;

  insert into public.organizations(name)
  values (trim(organization_name))
  returning id into new_organization_id;

  insert into public.organization_memberships(organization_id, user_id, role, display_name)
  values (new_organization_id, authenticated_user_id, 'admin', member_display_name);

  insert into public.pipeline_stages(organization_id, name, position)
  values
    (new_organization_id, 'Novo contato', 0),
    (new_organization_id, 'Em atendimento', 1),
    (new_organization_id, 'Qualificado', 2),
    (new_organization_id, 'Proposta', 3),
    (new_organization_id, 'Concluído', 4);

  return new_organization_id;
end;
$$;

revoke all on function public.create_organization(text) from public, anon;
grant execute on function public.create_organization(text) to authenticated;

create or replace function public.validate_contact_scope()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' and (
    new.organization_id is distinct from old.organization_id
    or new.created_by is distinct from old.created_by
  ) then
    raise exception 'Contact organization and creator are immutable' using errcode = '42501';
  end if;

  if new.stage_id is not null and not exists (
    select 1 from public.pipeline_stages stage
    where stage.id = new.stage_id and stage.organization_id = new.organization_id
  ) then
    raise exception 'Stage must belong to the contact organization' using errcode = '23503';
  end if;

  if new.assigned_to is not null and not exists (
    select 1 from public.organization_memberships membership
    where membership.organization_id = new.organization_id
      and membership.user_id = new.assigned_to
  ) then
    raise exception 'Assignee must be a member of the contact organization' using errcode = '23503';
  end if;

  if tg_op = 'UPDATE'
    and public.has_org_role(new.organization_id, array['agent'])
    and new.assigned_to is distinct from old.assigned_to then
    raise exception 'Agents cannot reassign contacts' using errcode = '42501';
  end if;

  new.updated_at := now();
  return new;
end;
$$;

create trigger validate_contact_scope_before_write
  before insert or update on public.contacts
  for each row execute function public.validate_contact_scope();

create or replace function public.record_contact_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  activity_summary text;
begin
  if tg_op = 'INSERT' then
    activity_summary := 'Contato criado';
  elsif new.stage_id is distinct from old.stage_id then
    activity_summary := 'Etapa do contato atualizada';
  elsif new.assigned_to is distinct from old.assigned_to then
    activity_summary := 'Responsável atualizado';
  elsif new.next_action is distinct from old.next_action
    or new.next_action_at is distinct from old.next_action_at then
    activity_summary := 'Próxima ação atualizada';
  else
    activity_summary := 'Dados do contato atualizados';
  end if;

  insert into public.contact_activity(organization_id, contact_id, actor_id, event_type, summary)
  values (
    new.organization_id,
    new.id,
    (select auth.uid()),
    case when tg_op = 'INSERT' then 'created' else 'updated' end,
    activity_summary
  );

  return new;
end;
$$;

create trigger record_contact_activity_after_write
  after insert or update on public.contacts
  for each row execute function public.record_contact_activity();
