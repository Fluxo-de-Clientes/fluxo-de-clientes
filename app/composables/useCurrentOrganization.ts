import type { Database } from '~/types/database.types'

export interface OrganizationMembership {
  id: string
  name: string
  role: Database['public']['Tables']['organization_memberships']['Row']['role']
}

export function useCurrentOrganization() {
  const supabase = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  const organizations = useState<OrganizationMembership[]>('organizations', () => [])
  const selectedId = useCookie<string | null>('fluxo-organization', { sameSite: 'lax', default: () => null })
  const loading = useState('organizations-loading', () => false)
  const loadError = useState<string | null>('organizations-error', () => null)

  const current = computed(() => organizations.value.find(item => item.id === selectedId.value) ?? organizations.value[0] ?? null)

  async function refresh() {
    if (!user.value) {
      organizations.value = []
      selectedId.value = null
      return
    }

    loading.value = true
    loadError.value = null
    try {
      const { data: memberships, error: membershipsError } = await supabase
        .from('organization_memberships')
        .select('organization_id, role')
        .eq('user_id', user.value.sub)

      if (membershipsError) throw membershipsError
      if (!memberships?.length) {
        organizations.value = []
        selectedId.value = null
        return
      }

      const ids = memberships.map(item => item.organization_id)
      const { data: rows, error: organizationsError } = await supabase
        .from('organizations')
        .select('id, name')
        .in('id', ids)

      if (organizationsError) throw organizationsError
      organizations.value = rows.map(organization => ({
        ...organization,
        role: memberships.find(item => item.organization_id === organization.id)!.role
      }))
      if (!organizations.value.some(item => item.id === selectedId.value)) {
        selectedId.value = organizations.value[0]?.id ?? null
      }
    } catch (error) {
      loadError.value = 'Não foi possível carregar as empresas. Tente novamente.'
      console.error('Failed to load organization memberships', error)
    } finally {
      loading.value = false
    }
  }

  function select(id: string) {
    if (organizations.value.some(item => item.id === id)) selectedId.value = id
  }

  return { organizations, current, selectedId, loading, loadError, refresh, select }
}
