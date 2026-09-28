export const stages = [
  'Entrada',
  'Em atendimento',
  'Qualificação',
  'Proposta',
  'Negociação',
  'Cliente',
  'Perdido',
] as const
export type PipelineStage = (typeof stages)[number]
export interface User {
  id: string
  name: string
  role: 'Administrador' | 'Operador' | 'Leitura'
}
export interface Organization {
  id: string
  name: string
  sector: string
  plan: string
  owner: string
  limit: number
  domain: string
  health: 'Saudável' | 'Atenção'
  lastActivity: string
}
export interface Contact {
  id: string
  organizationId: string
  name: string
  company: string
  email: string
  phone: string
  origin: string
  stage: PipelineStage
  owner: string
  team: string
  lastActivity: string
  createdAt: string
  score: number
  status: string
  tags: string[]
  value: number
  nextStep: string
  risk: boolean
  notes: string[]
}
export interface Message {
  id: string
  text: string
  direction: 'in' | 'out'
  time: string
}
export interface Conversation {
  id: string
  organizationId: string
  contactId: string
  status: 'Aberta' | 'Aguardando' | 'Concluída'
  priority: 'Normal' | 'Alta'
  owner: string
  messages: Message[]
}
export interface Campaign {
  id: string
  organizationId: string
  name: string
  audience: string
  subject: string
  sender: string
  content: string
  status: 'Rascunho' | 'Agendada' | 'Enviando' | 'Concluída' | 'Pausada' | 'Com atenção'
  date: string
  sent: number
  delivered: number
  opened: number
  clicks: number
  unsubscribed: number
}
export type BlockType =
  | 'Gatilho'
  | 'Condição'
  | 'Espera'
  | 'Mensagem'
  | 'Criar tarefa'
  | 'Atualizar etapa'
  | 'Atribuir responsável'
export interface Automation {
  id: string
  organizationId: string
  name: string
  active: boolean
  trigger: string
  audience: string
  runs: number
  completion: number
  updatedAt: string
  blocks: { type: BlockType; text: string }[]
}
export interface DomainStatus {
  id: string
  organizationId: string
  name: string
  status: 'Verificado' | 'Pendente' | 'Atenção' | 'Falha'
  spf: boolean
  dkim: boolean
  dmarc: boolean
  checkedAt: string
}
export interface Insight {
  id: string
  organizationId: string
  title: string
  description: string
  reason: string
  type: string
  route: string
}
export interface Activity {
  id: string
  organizationId: string
  contactId?: string
  text: string
  date: string
}
export interface UsageMetric {
  label: string
  used: number
  limit: number
  unit: string
}
export type Period = '7' | '30' | '90' | 'custom'
export interface Notification {
  id: string
  title: string
  description: string
  read: boolean
  route: string
}
