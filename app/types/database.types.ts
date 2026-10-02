export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

type Table<Row, Insert, Update> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: []
}

type ContactRow = {
  id: string
  organization_id: string
  full_name: string
  email: string | null
  phone: string | null
  source: string | null
  stage_id: string | null
  assigned_to: string | null
  next_action: string | null
  next_action_at: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      contact_activity: Table<
        { id: string; organization_id: string; contact_id: string; actor_id: string | null; event_type: string; summary: string; created_at: string },
        { id?: string; organization_id: string; contact_id: string; actor_id?: string | null; event_type: string; summary: string; created_at?: string },
        { actor_id?: string | null; event_type?: string; summary?: string }
      >
      contacts: Table<
        ContactRow,
        { id?: string; organization_id: string; full_name: string; email?: string | null; phone?: string | null; source?: string | null; stage_id?: string | null; assigned_to?: string | null; next_action?: string | null; next_action_at?: string | null; created_by?: string; created_at?: string; updated_at?: string },
        { full_name?: string; email?: string | null; phone?: string | null; source?: string | null; stage_id?: string | null; assigned_to?: string | null; next_action?: string | null; next_action_at?: string | null; updated_at?: string }
      >
      demo_requests: Table<
        { id: string; name: string; company_name: string; email: string; phone: string | null; interest: string; details: string | null; source: string; created_at: string },
        { id?: string; name: string; company_name: string; email: string; phone?: string | null; interest?: string; details?: string | null; source?: string; created_at?: string },
        { name?: string; company_name?: string; email?: string; phone?: string | null; interest?: string; details?: string | null; source?: string }
      >
      organization_memberships: Table<
        { organization_id: string; user_id: string; role: 'admin' | 'manager' | 'agent' | 'analyst'; display_name: string; created_at: string },
        { organization_id: string; user_id: string; role: 'admin' | 'manager' | 'agent' | 'analyst'; display_name?: string; created_at?: string },
        { role?: 'admin' | 'manager' | 'agent' | 'analyst'; display_name?: string }
      >
      organizations: Table<
        { id: string; name: string; created_at: string },
        { id?: string; name: string; created_at?: string },
        { name?: string }
      >
      pipeline_stages: Table<
        { id: string; organization_id: string; name: string; position: number; created_at: string },
        { id?: string; organization_id: string; name: string; position: number; created_at?: string },
        { name?: string; position?: number }
      >
    }
    Views: Record<string, never>
    Functions: {
      create_organization: { Args: { organization_name: string }; Returns: string }
      has_org_role: { Args: { target_org: string; allowed_roles: string[] }; Returns: boolean }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
