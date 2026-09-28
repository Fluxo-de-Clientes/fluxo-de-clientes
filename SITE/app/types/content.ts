export type IconName =
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-left'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'home'
  | 'messages'
  | 'users'
  | 'chart'
  | 'settings'
  | 'megaphone'
  | 'funnel'
  | 'sparkles'
  | 'check'
  | 'check-circle'
  | 'shield'
  | 'link'
  | 'list'
  | 'store'
  | 'search'
  | 'more'
  | 'tag'
  | 'user'
  | 'clock'
  | 'mail'
  | 'external'
  | 'alert'

export interface Feature {
  title: string
  description: string
  icon: IconName
}

export type Stage = 'Em atendimento' | 'Qualificados' | 'Propostas'

export interface DemoContact {
  id: string
  name: string
  initials: string
  stage: Stage
  source: string
  activity: string
  owner: string
  tone: 'orange' | 'neutral' | 'paper'
  history: string
}
