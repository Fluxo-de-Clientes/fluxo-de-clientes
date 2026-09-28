import { demoNow } from '../lib/utils'
import { useState } from 'react'
import {
  Plus,
  Zap,
  ArrowRight,
  Clock,
  MessageSquare,
  Check,
  GitBranch,
  ListTodo,
  UserRound,
  Filter,
  Trash2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import type { Automation, BlockType } from '../types'
import { dateLabel } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SearchInput,
  Select,
  Badge,
  Switch,
  Modal,
  Input,
  DemoNotice,
  Empty,
} from '../components/ui/primitives'
const blockTypes: BlockType[] = [
  'Gatilho',
  'Condição',
  'Espera',
  'Mensagem',
  'Criar tarefa',
  'Atualizar etapa',
  'Atribuir responsável',
]
const icons = {
  Gatilho: Zap,
  Condição: GitBranch,
  Espera: Clock,
  Mensagem: MessageSquare,
  'Criar tarefa': ListTodo,
  'Atualizar etapa': Filter,
  'Atribuir responsável': UserRound,
}
export default function Automations() {
  const app = useOrgData()
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState('Todas'),
    [editing, setEditing] = useState<Automation | null>(null)
  const automations = app.automations.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) &&
      (status === 'Todas' ||
        (status === 'Ativas' && a.active) ||
        (status === 'Pausadas' && !a.active)),
  )
  const create = () =>
    setEditing({
      id: crypto.randomUUID(),
      organizationId: app.organizationId,
      name: '',
      active: false,
      trigger: 'Novo contato',
      audience: 'Novos contatos',
      runs: 0,
      completion: 0,
      updatedAt: demoNow().toISOString(),
      blocks: [{ type: 'Gatilho', text: 'Novo contato cadastrado' }],
    })
  return (
    <>
      <PageHeading
        eyebrow="ROTINAS MAIS LEVES"
        title="Automações"
        description="Cuide das repetições. Abra espaço para boas conversas."
        action={
          <Button variant="dark" onClick={create} disabled={app.readOnly}>
            <Plus size={16} />
            Nova automação
          </Button>
        }
      />
      <div className="automation-banner">
        <div className="automation-banner-icon">
          <Zap size={27} />
        </div>
        <div>
          <h2>Seu fluxo continua. Sua equipe respira.</h2>
          <p>
            {app.automations.filter((a) => a.active).length} fluxos ativos no cenário demonstrativo
            · {app.automations.reduce((s, a) => s + a.runs, 0)} execuções ilustrativas
          </p>
        </div>
        <Badge icon={false}>Equipe no controle</Badge>
      </div>
      <div className="table-toolbar standalone">
        <SearchInput
          value={query}
          onChange={setQuery}
          label="Buscar automações"
          placeholder="Buscar automação..."
        />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          {['Todas', 'Ativas', 'Pausadas'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
      </div>
      <div className="automation-grid">
        {automations.map((a) => (
          <Card className="automation-card" key={a.id}>
            <div className="row-between">
              <span className="square-icon">
                <Zap size={20} />
              </span>
              <Badge tone={a.active ? 'green' : 'neutral'}>{a.active ? 'Ativa' : 'Pausada'}</Badge>
            </div>
            <h2>{a.name}</h2>
            <p>
              {a.trigger} <span>·</span> {a.audience}
            </p>
            <div className="mini-flow">
              {a.blocks.map((b, i) => {
                const Icon = icons[b.type]
                return (
                  <div key={i}>
                    <span title={b.text}>
                      <Icon size={18} />
                      <small>{b.type}</small>
                    </span>
                    {i < a.blocks.length - 1 && <ArrowRight size={15} />}
                  </div>
                )
              })}
            </div>
            <div className="automation-stats">
              <div>
                <strong>{a.runs}</strong>
                <span>execuções</span>
              </div>
              <div>
                <strong>{a.completion}%</strong>
                <span>conclusão</span>
              </div>
              <div>
                <strong>{dateLabel(a.updatedAt).split(',')[0]}</strong>
                <span>atualização</span>
              </div>
            </div>
            <footer>
              <Switch
                label={a.active ? 'Ativada' : 'Pausada'}
                checked={a.active}
                disabled={app.readOnly}
                onCheckedChange={(active) => {
                  app.updateAutomation(a.id, { active })
                  toast.success(
                    active ? 'Automação ativada na demonstração.' : 'Automação pausada.',
                  )
                }}
              />
              <Button size="sm" onClick={() => setEditing(structuredClone(a))}>
                Editar fluxo <ArrowRight size={14} />
              </Button>
            </footer>
          </Card>
        ))}
      </div>
      {!automations.length && <Empty />}
      <DemoNotice>
        Este construtor organiza regras locais. Ativar um fluxo não executa tarefas, envia mensagens
        ou acessa serviços.
      </DemoNotice>
      <Modal
        open={!!editing}
        onOpenChange={(v) => {
          if (!v) setEditing(null)
        }}
        title="Construtor de automação"
        description="Defina cada etapa com clareza. A execução é apenas demonstrativa."
        wide
      >
        {editing && (
          <form
            className="form-stack"
            onSubmit={(e) => {
              e.preventDefault()
              if (editing.name.trim().length < 3) {
                toast.error('Dê um nome com ao menos 3 caracteres.')
                return
              }
              if (editing.blocks.some((b) => !b.text.trim())) {
                toast.error('Descreva todos os blocos antes de salvar.')
                return
              }
              if (editing.blocks[0]?.type !== 'Gatilho') {
                toast.error('O primeiro bloco precisa ser um gatilho.')
                return
              }
              const saved = {
                ...editing,
                trigger: editing.blocks[0].text,
                updatedAt: demoNow().toISOString(),
              }
              if (app.automations.some((a) => a.id === editing.id))
                app.updateAutomation(editing.id, saved)
              else app.addAutomation(saved)
              toast.success('Fluxo salvo.')
              setEditing(null)
            }}
          >
            <div className="form-grid">
              <Input
                label="Nome da automação"
                required
                minLength={3}
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
              <Select
                label="Público"
                value={editing.audience}
                onChange={(e) => setEditing({ ...editing, audience: e.target.value })}
              >
                {[
                  'Novos contatos',
                  'Contatos ativos',
                  'Em proposta',
                  'Clientes',
                  'Alta intenção',
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </div>
            <div className="flow-builder">
              {editing.blocks.map((b, i) => {
                const Icon = icons[b.type]
                return (
                  <div key={i} className="flow-block">
                    <div className="flow-block-line" />
                    <span className="flow-step-number">{i + 1}</span>
                    <Icon size={19} />
                    <div className="flow-block-fields">
                      <Select
                        label={'Tipo do bloco ' + (i + 1)}
                        value={b.type}
                        disabled={i === 0}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            blocks: editing.blocks.map((x, j) =>
                              j === i ? { ...x, type: e.target.value as BlockType } : x,
                            ),
                          })
                        }
                      >
                        {blockTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </Select>
                      <Input
                        label={'Regra do bloco ' + (i + 1)}
                        required
                        value={b.text}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            blocks: editing.blocks.map((x, j) =>
                              j === i ? { ...x, text: e.target.value } : x,
                            ),
                          })
                        }
                      />
                    </div>
                    {i > 0 && (
                      <div className="block-actions">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={'Mover bloco ' + (i + 1) + ' para cima'}
                          disabled={i === 1}
                          onClick={() => {
                            const blocks = [...editing.blocks]
                            ;[blocks[i], blocks[i - 1]] = [blocks[i - 1], blocks[i]]
                            setEditing({ ...editing, blocks })
                          }}
                        >
                          <ArrowUp size={15} />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={'Mover bloco ' + (i + 1) + ' para baixo'}
                          disabled={i === editing.blocks.length - 1}
                          onClick={() => {
                            const blocks = [...editing.blocks]
                            ;[blocks[i], blocks[i + 1]] = [blocks[i + 1], blocks[i]]
                            setEditing({ ...editing, blocks })
                          }}
                        >
                          <ArrowDown size={15} />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={'Remover bloco ' + (i + 1)}
                          onClick={() =>
                            setEditing({
                              ...editing,
                              blocks: editing.blocks.filter((_, j) => j !== i),
                            })
                          }
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
              <Button
                type="button"
                onClick={() =>
                  setEditing({
                    ...editing,
                    blocks: [...editing.blocks, { type: 'Criar tarefa', text: '' }],
                  })
                }
              >
                <Plus size={16} />
                Adicionar bloco
              </Button>
            </div>
            <div className="modal-actions">
              <Button type="button" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={app.readOnly}>
                <Check size={16} />
                Salvar fluxo
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
