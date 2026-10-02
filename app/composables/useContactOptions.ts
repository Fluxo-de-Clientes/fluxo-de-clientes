import type { Database } from '~/types/database.types'

export function useContactOptions() {
  const supabase = useSupabaseClient<Database>()
  const stages = useState<Database['public']['Tables']['pipeline_stages']['Row'][]>('contact-stages', () => [])
  const members = useState<Database['public']['Tables']['organization_memberships']['Row'][]>('organization-members', () => [])

  async function refresh(organizationId: string) {
    const [stagesResult, membersResult] = await Promise.all([
      supabase
        .from('pipeline_stages')
        .select('*')
        .eq('organization_id', organizationId)
        .order('position'),
      supabase
        .from('organization_memberships')
        .select('*')
        .eq('organization_id', organizationId)
        .order('display_name')
    ])

    if (stagesResult.error) throw stagesResult.error
    if (membersResult.error) throw membersResult.error
    stages.value = stagesResult.data
    members.value = membersResult.data
  }

  return { stages, members, refresh }
}
