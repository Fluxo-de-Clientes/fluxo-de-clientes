export interface VisualMessage {
  id: string
  role: 'user' | 'assistant'
  parts: { type: 'text'; text: string }[]
}

export interface VisualChat {
  id: string
  title: string
  messages: VisualMessage[]
}
