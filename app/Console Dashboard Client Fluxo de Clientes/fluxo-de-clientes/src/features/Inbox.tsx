import { demoNow } from '../lib/utils'
import { useState } from 'react'
import {
  CheckCheck,
  ArrowLeft,
  Send,
  MoreHorizontal,
  Plus,
  Clock,
  UserRound,
  Info,
  RotateCcw,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import { owners } from '../data/mock'
import { dateLabel } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  PageHeading,
  SearchInput,
  Avatar,
  Status,
  Select,
  Badge,
  Empty,
  Modal,
  Input,
} from '../components/ui/primitives'
import { ContactDetail } from '../components/contacts/ContactForms'
export default function Inbox() {
  const app = useOrgData()
  const [query, setQuery] = useState(''),
    [filter, setFilter] = useState('Todas'),
    [selected, setSelected] = useState<string | null>(null),
    [drafts, setDrafts] = useState<Record<string, string>>({}),
    [details, setDetails] = useState<string | null>(null),
    [task, setTask] = useState(false),
    [taskText, setTaskText] = useState('')
  const conversations = app.conversations.filter((c) => {
    const ct = app.contacts.find((t) => t.id === c.contactId)
    return (
      (ct?.name + ' ' + ct?.company).toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'Todas' ||
        (filter === 'Abertas' && c.status === 'Aberta') ||
        (filter === 'Aguardando' && c.status === 'Aguardando') ||
        (filter === 'Minhas' && c.owner === 'Marina Costa') ||
        (filter === 'Sem responsável' && c.owner === 'Sem responsável') ||
        (filter === 'Concluídas' && c.status === 'Concluída'))
    )
  })
  const conversation = conversations.find((c) => c.id === selected) ?? conversations[0],
    contact = app.contacts.find((c) => c.id === conversation?.contactId)
  const reply = conversation ? drafts[conversation.id] || '' : ''
  const setReply = (text: string) => {
    if (conversation) setDrafts((d) => ({ ...d, [conversation.id]: text }))
  }
  return (
    <>
      <PageHeading
        eyebrow="CONVERSAS QUE IMPORTAM"
        title="Atendimento"
        description="Contexto para responder melhor. Clareza para dar continuidade."
      />
      <div className="inbox-tabs" role="group" aria-label="Filtrar conversas">
        {['Todas', 'Abertas', 'Aguardando', 'Minhas', 'Sem responsável', 'Concluídas'].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={filter === f ? 'active' : ''}
            onClick={() => {
              setFilter(f)
              setSelected(null)
            }}
          >
            {f}
            {f === 'Todas' && <span>{app.conversations.length}</span>}
          </button>
        ))}
      </div>
      <div className={'inbox-layout ' + (selected ? 'has-selected' : '')}>
        <section className="conversation-list" aria-label="Conversas">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Buscar conversas"
            placeholder="Buscar conversa..."
          />
          {conversations.map((c) => {
            const ct = app.contacts.find((x) => x.id === c.contactId)
            return (
              ct && (
                <button
                  className={'conversation-item ' + (c.id === conversation?.id ? 'selected' : '')}
                  key={c.id}
                  onClick={() => {
                    setSelected(c.id)
                  }}
                >
                  <Avatar name={ct.name} />
                  <div>
                    <div>
                      <strong>{ct.name}</strong>
                      <small>09:38</small>
                    </div>
                    <span>{ct.company}</span>
                    <p>{c.messages.at(-1)?.text}</p>
                    <div>
                      <Badge
                        tone={
                          c.status === 'Concluída'
                            ? 'green'
                            : c.status === 'Aguardando'
                              ? 'orange'
                              : 'neutral'
                        }
                      >
                        {c.status}
                      </Badge>
                      {c.priority === 'Alta' && (
                        <small className="text-warning">Prioridade alta</small>
                      )}
                    </div>
                  </div>
                </button>
              )
            )
          })}
          {!conversations.length && (
            <Empty
              title="Nenhuma conversa por aqui"
              description="Escolha outro filtro para encontrar as conversas."
            />
          )}
        </section>
        {conversation && contact ? (
          <>
            <section className="conversation-thread">
              <header>
                <Button
                  className="inbox-back"
                  size="icon"
                  variant="ghost"
                  aria-label="Voltar às conversas"
                  onClick={() => setSelected(null)}
                >
                  <ArrowLeft size={18} />
                </Button>
                <Avatar name={contact.name} />
                <button className="thread-person" onClick={() => setDetails(contact.id)}>
                  <strong>{contact.name}</strong>
                  <span>
                    {contact.origin} · {contact.company}
                  </span>
                </button>
                <Button
                  size="sm"
                  disabled={app.readOnly}
                  onClick={() => {
                    app.updateConversation(conversation.id, {
                      status: conversation.status === 'Concluída' ? 'Aberta' : 'Concluída',
                    })
                    toast.success(
                      conversation.status === 'Concluída'
                        ? 'Conversa reaberta.'
                        : 'Conversa concluída.',
                    )
                  }}
                >
                  {conversation.status === 'Concluída' ? (
                    <RotateCcw size={16} />
                  ) : (
                    <CheckCheck size={16} />
                  )}
                  <span>{conversation.status === 'Concluída' ? 'Reabrir' : 'Concluir'}</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Contexto do contato"
                  onClick={() => setDetails(contact.id)}
                >
                  <MoreHorizontal size={18} />
                </Button>
              </header>
              {contact.risk && (
                <div className="stale-banner">
                  <Clock size={14} />
                  Esta conversa está sem retorno há mais de 48 horas.
                </div>
              )}
              <div className="messages">
                <div className="messages-date">28 de setembro de 2026</div>
                {conversation.messages.map((m) => (
                  <div className={'message message-' + m.direction} key={m.id}>
                    <p>{m.text}</p>
                    <span>
                      {m.time}
                      {m.direction === 'out' && <CheckCheck size={12} />}
                    </span>
                  </div>
                ))}
              </div>
              <form
                className="composer"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!reply.trim()) return
                  app.updateConversation(conversation.id, {
                    status: 'Aguardando',
                    messages: [
                      ...conversation.messages,
                      {
                        id: crypto.randomUUID(),
                        text: reply.trim(),
                        direction: 'out',
                        time: demoNow().toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                      },
                    ],
                  })
                  app.updateContact(contact.id, {
                    lastActivity: demoNow().toISOString(),
                    risk: false,
                  })
                  setReply('')
                  toast.success('Resposta adicionada à demonstração. Nenhuma mensagem enviada.')
                }}
              >
                <label>
                  <span className="sr-only">Escrever resposta</span>
                  <textarea
                    value={reply}
                    maxLength={4000}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={
                      conversation.status === 'Concluída'
                        ? 'Reabra a conversa para responder.'
                        : 'Escreva uma resposta...'
                    }
                    disabled={conversation.status === 'Concluída' || app.readOnly}
                  />
                </label>
                <div>
                  <span>
                    <Info size={13} />
                    Resposta apenas nesta demonstração
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!reply.trim() || conversation.status === 'Concluída' || app.readOnly}
                  >
                    <Send size={15} />
                    Responder
                  </Button>
                </div>
              </form>
            </section>
            <aside className="conversation-context">
              <div className="context-profile">
                <Avatar name={contact.name} />
                <h3>{contact.name}</h3>
                <p>{contact.company}</p>
                <Status value={conversation.status} />
              </div>
              <Select
                label="Responsável"
                value={conversation.owner}
                disabled={app.readOnly}
                onChange={(e) => {
                  app.updateConversation(conversation.id, { owner: e.target.value })
                  if (e.target.value !== 'Sem responsável')
                    app.updateContact(contact.id, { owner: e.target.value })
                  toast.success('Responsável atribuído.')
                }}
              >
                {['Sem responsável', ...owners].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
              <Select
                label="Prioridade"
                value={conversation.priority}
                disabled={app.readOnly}
                onChange={(e) =>
                  app.updateConversation(conversation.id, {
                    priority: e.target.value as 'Normal' | 'Alta',
                  })
                }
              >
                <option>Normal</option>
                <option>Alta</option>
              </Select>
              <div className="context-facts">
                <span>Etapa do funil</span>
                <strong>{contact.stage}</strong>
                <span>Última atividade</span>
                <strong>{dateLabel(contact.lastActivity)}</strong>
                <span>Próximo passo</span>
                <strong>{contact.nextStep}</strong>
              </div>
              <div className="tag-row">
                {contact.tags.map((t) => (
                  <Badge key={t} icon={false}>
                    {t}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={() => {
                  setTaskText(contact.nextStep)
                  setTask(true)
                }}
                disabled={app.readOnly}
              >
                <Plus size={15} />
                Criar tarefa
              </Button>
              <Button variant="ghost" onClick={() => setDetails(contact.id)}>
                <UserRound size={15} />
                Ver contato completo
              </Button>
            </aside>
          </>
        ) : (
          <div className="no-conversation">
            <Empty
              title="Uma pausa no fluxo"
              description="Nenhuma conversa corresponde à sua busca."
            />
          </div>
        )}
      </div>
      <ContactDetail key={details} contactId={details} onClose={() => setDetails(null)} />
      <Modal open={task} onOpenChange={setTask} title="Definir próximo passo">
        <form
          className="form-stack"
          onSubmit={(e) => {
            e.preventDefault()
            if (contact && taskText.trim()) {
              app.updateContact(contact.id, { nextStep: taskText.trim() })
              app.addActivity('Tarefa criada: ' + taskText.trim(), contact.id)
              toast.success('Tarefa criada para ' + contact.owner + '.')
              setTask(false)
            }
          }}
        >
          <Input
            label="O que precisa acontecer?"
            required
            minLength={3}
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button variant="primary" type="submit" disabled={app.readOnly}>
            Criar tarefa
          </Button>
        </form>
      </Modal>
    </>
  )
}
