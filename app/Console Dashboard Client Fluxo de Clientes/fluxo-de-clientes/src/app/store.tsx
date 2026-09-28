import { demoNow } from '../lib/utils'
import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import type {
  Contact,
  Organization,
  Conversation,
  Campaign,
  Automation,
  Activity,
  Period,
  Notification,
  DomainStatus,
} from '../types'
import {
  organizations as initialOrganizations,
  mockContacts,
  mockConversations,
  mockCampaigns,
  mockAutomations,
  mockActivities,
  mockDomains,
} from '../data/mock'
import { safeRead, safeWrite } from '../lib/utils'
import type { ContactFormValues } from '../lib/csv'
interface State {
  organizations: Organization[]
  organizationId: string
  contacts: Contact[]
  conversations: Conversation[]
  campaigns: Campaign[]
  automations: Automation[]
  activities: Activity[]
  period: Period
  customRange: { from: string; to: string }
  notifications: Notification[]
  compact: boolean
  readOnly: boolean
  domains: DomainStatus[]
  sessionData: Record<string, unknown>
  revision: number
}
interface Actions {
  setSessionData: (key: string, update: (old: unknown) => unknown) => void
  setDomains: (update: (old: DomainStatus[]) => DomainStatus[]) => void
  setOrganization: (id: string) => void
  setPeriod: (v: Period) => void
  setCustomRange: (v: State['customRange']) => void
  toggleCompact: () => void
  setReadOnly: (v: boolean) => void
  addContact: (v: ContactFormValues) => string
  updateContact: (id: string, v: Partial<Contact>) => void
  updateConversation: (id: string, v: Partial<Conversation>) => void
  saveCampaign: (v: Campaign) => boolean
  updateAutomation: (id: string, v: Partial<Automation>) => void
  addAutomation: (v: Automation) => void
  addOrganization: (v: Organization) => void
  updateOrganization: (id: string, v: Partial<Organization>) => void
  markRead: (id: string) => void
  addActivity: (text: string, contactId?: string) => void
  reset: () => void
}
const Context = createContext<(State & Actions) | null>(null)
const draftSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  audience: z.string(),
  subject: z.string(),
  sender: z.string(),
  content: z.string(),
  status: z.literal('Rascunho'),
  date: z.string().refine((v) => !Number.isNaN(Date.parse(v))),
  sent: z.number(),
  delivered: z.number(),
  opened: z.number(),
  clicks: z.number(),
  unsubscribed: z.number(),
})
function initial(loadDrafts = true): State {
  const loaded = z
    .array(draftSchema)
    .safeParse(loadDrafts ? safeRead<unknown>('fc-drafts', []) : [])
  const drafts = loaded.success
    ? loaded.data.filter(
        (d, i, all) =>
          initialOrganizations.some((o) => o.id === d.organizationId) &&
          all.findIndex((x) => x.id === d.id) === i,
      )
    : []
  return {
    domains: mockDomains,
    sessionData: {},
    revision: 0,
    organizations: initialOrganizations,
    organizationId: 'org-1',
    contacts: mockContacts,
    conversations: mockConversations,
    campaigns: [...mockCampaigns.filter((c) => !drafts.some((d) => d.id === c.id)), ...drafts],
    automations: mockAutomations,
    activities: mockActivities,
    period: ['7', '30', '90', 'custom'].includes(safeRead<string>('fc-period', '30'))
      ? safeRead<Period>('fc-period', '30')
      : '30',
    customRange: safeRead<State['customRange']>('fc-range', {
      from: '2026-09-01',
      to: '2026-09-28',
    }),
    compact: safeRead<boolean>('fc-compact', false),
    readOnly: false,
    notifications: [
      {
        id: 'n1',
        title: 'Conversas aguardam sua atenção',
        description: 'Revise os contatos sem retorno há mais de 48 horas.',
        route: '/atendimento',
        read: false,
      },
      {
        id: 'n2',
        title: 'Campanha de reativação concluída',
        description: '52 cliques e novas oportunidades para retomar.',
        route: '/campanhas',
        read: false,
      },
      {
        id: 'n3',
        title: 'Saúde de envio atualizada',
        description: 'Domínio principal verificado no cenário demonstrativo.',
        route: '/dominios',
        read: true,
      },
    ],
  }
}
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, set] = useState<State>(initial)
  const canEdit = () => {
    if (state.readOnly) {
      toast.error('Seu perfil está em modo de leitura. Altere em Configurações.')
      return false
    }
    return true
  }
  const addActivity = (text: string, contactId?: string) =>
    set((s) => ({
      ...s,
      activities: [
        {
          id: crypto.randomUUID(),
          organizationId: s.organizationId,
          contactId,
          text,
          date: demoNow().toISOString(),
        },
        ...s.activities,
      ],
    }))
  const actions: Actions = {
    setSessionData: (key, update) =>
      set((s) => ({ ...s, sessionData: { ...s.sessionData, [key]: update(s.sessionData[key]) } })),
    setDomains: (update) => {
      if (!canEdit()) return
      set((s) => {
        const domains = update(s.domains)
        return {
          ...s,
          domains,
          organizations: s.organizations.map((o) => ({
            ...o,
            health: domains.some(
              (d) => d.organizationId === o.id && d.name === o.domain && d.status === 'Verificado',
            )
              ? 'Saudável'
              : 'Atenção',
          })),
        }
      })
    },
    setOrganization: (organizationId) => set((s) => ({ ...s, organizationId })),
    setPeriod: (period) => {
      safeWrite('fc-period', period)
      set((s) => ({ ...s, period }))
    },
    setCustomRange: (customRange) => {
      safeWrite('fc-range', customRange)
      set((s) => ({ ...s, customRange }))
    },
    toggleCompact: () =>
      set((s) => {
        safeWrite('fc-compact', !s.compact)
        return { ...s, compact: !s.compact }
      }),
    setReadOnly: (readOnly) => set((s) => ({ ...s, readOnly })),
    addContact: (v) => {
      if (!canEdit()) return ''
      const id = crypto.randomUUID()
      set((s) => ({
        ...s,
        contacts: [
          {
            ...v,
            id,
            organizationId: s.organizationId,
            stage: 'Entrada',
            team: 'Comercial',
            lastActivity: demoNow().toISOString(),
            createdAt: demoNow().toISOString(),
            score: 50,
            status: 'Ativo',
            tags: ['Novo contato'],
            value: 0,
            nextStep: 'Fazer primeiro atendimento',
            risk: false,
            notes: [],
          },
          ...s.contacts,
        ],
      }))
      addActivity(v.name + ' foi cadastrado', id)
      return id
    },
    updateContact: (id, v) => {
      if (!canEdit()) return
      set((s) => ({
        ...s,
        conversations:
          v.owner !== undefined
            ? s.conversations.map((conversation) =>
                conversation.contactId === id && conversation.organizationId === s.organizationId
                  ? { ...conversation, owner: v.owner! }
                  : conversation,
              )
            : s.conversations,
        contacts: s.contacts.map((c) =>
          c.id === id && c.organizationId === s.organizationId
            ? {
                ...c,
                ...v,
                ...(v.stage
                  ? {
                      status: v.stage === 'Perdido' ? 'Inativo' : 'Ativo',
                      risk: ['Cliente', 'Perdido'].includes(v.stage) ? false : c.risk,
                    }
                  : {}),
                id: c.id,
                organizationId: c.organizationId,
              }
            : c,
        ),
      }))
      if (v.stage) addActivity('Contato movido para ' + v.stage, id)
    },
    updateConversation: (id, v) => {
      if (!canEdit()) return
      set((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === id && c.organizationId === s.organizationId
            ? { ...c, ...v, id: c.id, organizationId: c.organizationId }
            : c,
        ),
      }))
    },
    saveCampaign: (v) => {
      if (!canEdit()) return false
      const campaigns = [
        ...state.campaigns.filter((c) => c.id !== v.id),
        { ...v, organizationId: state.organizationId },
      ]
      const persistable = campaigns.filter(
        (c) =>
          c.status === 'Rascunho' && initialOrganizations.some((o) => o.id === c.organizationId),
      )
      const stored = safeWrite('fc-drafts', persistable)
      set((s) => ({ ...s, campaigns }))
      if (!stored) toast.info('O navegador não permitiu salvar. O rascunho continua nesta sessão.')
      return stored && initialOrganizations.some((o) => o.id === v.organizationId)
    },
    updateAutomation: (id, v) => {
      if (!canEdit()) return
      set((s) => ({
        ...s,
        automations: s.automations.map((a) =>
          a.id === id && a.organizationId === s.organizationId
            ? { ...a, ...v, id: a.id, organizationId: a.organizationId }
            : a,
        ),
      }))
    },
    addAutomation: (v) => {
      if (canEdit())
        set((s) => ({
          ...s,
          automations: [...s.automations, { ...v, organizationId: s.organizationId }],
        }))
    },
    addOrganization: (v) => {
      if (canEdit()) set((s) => ({ ...s, organizations: [...s.organizations, v] }))
    },
    updateOrganization: (id, v) => {
      if (canEdit())
        set((s) => ({
          ...s,
          organizations: s.organizations.map((o) => (o.id === id ? { ...o, ...v, id: o.id } : o)),
        }))
    },
    markRead: (id) =>
      set((s) => ({
        ...s,
        notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      })),
    addActivity,
    reset: () => {
      const cleared = safeWrite('fc-drafts', [])
      set((s) => ({ ...initial(false), revision: s.revision + 1 }))
      if (cleared) toast.success('Dados demonstrativos restaurados.')
      else
        toast.error(
          'Sessão restaurada. O navegador bloqueou a remoção dos rascunhos persistidos; remova os dados do site nas configurações do navegador.',
        )
    },
  }
  return <Context.Provider value={{ ...state, ...actions }}>{children}</Context.Provider>
}
export function useApp() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('AppProvider ausente')
  return ctx
}
export function useOrgData() {
  const s = useApp()
  const filtered = useMemo(
    () => ({
      org: s.organizations.find((o) => o.id === s.organizationId) ?? s.organizations[0],
      contacts: s.contacts.filter((c) => c.organizationId === s.organizationId),
      conversations: s.conversations.filter((c) => c.organizationId === s.organizationId),
      campaigns: s.campaigns.filter((c) => c.organizationId === s.organizationId),
      automations: s.automations.filter((c) => c.organizationId === s.organizationId),
      activities: s.activities.filter((c) => c.organizationId === s.organizationId),
      domains: s.domains.filter((c) => c.organizationId === s.organizationId),
    }),
    [
      s.organizationId,
      s.organizations,
      s.contacts,
      s.conversations,
      s.campaigns,
      s.automations,
      s.activities,
      s.domains,
    ],
  )
  return { ...s, ...filtered }
}
