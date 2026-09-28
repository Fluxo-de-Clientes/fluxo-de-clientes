import { useState } from 'react'
import { Filter, Plus, MoreHorizontal, Clock, ArrowRight, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import { owners } from '../data/mock'
import { stages, type PipelineStage } from '../types'
import { money, relative } from '../lib/utils'
import { periodContacts } from '../lib/metrics'
import { Button } from '../components/ui/button'
import {
  PageHeading,
  SearchInput,
  Select,
  Avatar,
  Badge,
  Menu,
  Empty,
  DemoNotice,
} from '../components/ui/primitives'
import { ContactDetail, NewContact } from '../components/contacts/ContactForms'
export default function Pipeline() {
  const app = useOrgData()
  const [query, setQuery] = useState(''),
    [owner, setOwner] = useState('Todos'),
    [origin, setOrigin] = useState('Todas'),
    [team, setTeam] = useState('Todas'),
    [periodOnly, setPeriodOnly] = useState(false),
    [detail, setDetail] = useState<string | null>(null),
    [create, setCreate] = useState(false)
  const contacts = (
    periodOnly ? periodContacts(app.contacts, app.period, app.customRange) : app.contacts
  ).filter(
    (c) =>
      (c.name + ' ' + c.company).toLowerCase().includes(query.toLowerCase()) &&
      (owner === 'Todos' || c.owner === owner) &&
      (origin === 'Todas' || c.origin === origin) &&
      (team === 'Todas' || c.team === team),
  )
  const move = (id: string, stage: PipelineStage) => {
    app.updateContact(id, { stage })
    toast.success('Oportunidade movida para ' + stage + '.')
  }
  return (
    <>
      <PageHeading
        eyebrow="UM PRÓXIMO PASSO, SEMPRE"
        title="Funil de clientes"
        description="Enxergue cada oportunidade. Faça as conversas avançarem."
        action={
          <Button variant="dark" onClick={() => setCreate(true)} disabled={app.readOnly}>
            <Plus size={16} />
            Nova oportunidade
          </Button>
        }
      />
      <div className="pipeline-toolbar">
        <SearchInput
          label="Buscar oportunidades"
          value={query}
          onChange={setQuery}
          placeholder="Buscar uma oportunidade..."
        />
        <Select label="Responsável" value={owner} onChange={(e) => setOwner(e.target.value)}>
          {['Todos', ...owners].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Select label="Origem" value={origin} onChange={(e) => setOrigin(e.target.value)}>
          {['Todas', 'Site', 'Instagram', 'WhatsApp', 'Indicação'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Select label="Equipe" value={team} onChange={(e) => setTeam(e.target.value)}>
          {['Todas', 'Comercial', 'Relacionamento'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <label className="check-label">
          <input
            type="checkbox"
            checked={periodOnly}
            onChange={(e) => setPeriodOnly(e.target.checked)}
          />
          Aplicar período
        </label>
      </div>
      <div className="pipeline-summary">
        <span>
          <Filter size={16} />
          <strong>{contacts.length}</strong> oportunidades
        </span>
        <span>
          <strong>
            {money(
              contacts
                .filter((c) => !['Perdido', 'Cliente'].includes(c.stage))
                .reduce((n, c) => n + c.value, 0),
            )}
          </strong>{' '}
          em aberto
        </span>
        <span>Movimente pelo menu de cada cartão.</span>
      </div>
      <div
        className="kanban"
        tabIndex={0}
        aria-label="Funil de clientes. Role horizontalmente para ver as sete etapas."
      >
        {stages.map((stage, i) => {
          const items = contacts.filter((c) => c.stage === stage)
          return (
            <section className={'kanban-column column-' + i} key={stage}>
              <div className="kanban-title">
                <h2>
                  <span />
                  {stage}
                </h2>
                <Badge icon={false}>{items.length}</Badge>
              </div>
              <p className="kanban-value">{money(items.reduce((s, c) => s + c.value, 0))}</p>
              <div className="kanban-cards">
                {items.map((c) => (
                  <article className="opportunity" key={c.id}>
                    <div className="opportunity-header">
                      <button className="person-cell" onClick={() => setDetail(c.id)}>
                        <Avatar name={c.name} small />
                        <span>
                          <strong>{c.name}</strong>
                          <small>{c.company}</small>
                        </span>
                      </button>
                      <Menu
                        label={'Mover ' + c.name}
                        trigger={<MoreHorizontal size={18} />}
                        items={stages
                          .filter((s) => s !== c.stage)
                          .map((s) => ({
                            label: 'Mover para ' + s,
                            onSelect: () => move(c.id, s),
                            disabled: app.readOnly,
                          }))}
                      />
                    </div>
                    <div className="opportunity-value">
                      <strong>{money(c.value)}</strong>
                      <Badge icon={false}>{c.origin}</Badge>
                    </div>
                    <div className="opportunity-step">
                      <ArrowRight size={13} />
                      {c.nextStep}
                    </div>
                    <div className="opportunity-footer">
                      <span>
                        <Clock size={12} />
                        {relative(c.lastActivity)}
                      </span>
                      <Avatar name={c.owner} small />
                    </div>
                    {c.risk && (
                      <div className="opportunity-risk">
                        <TriangleAlert size={13} />
                        Precisa de retorno
                      </div>
                    )}
                  </article>
                ))}
                {!items.length && (
                  <Empty
                    title="Etapa livre"
                    description="Mova uma oportunidade para cá pelo menu do cartão."
                  />
                )}
              </div>
            </section>
          )
        })}
      </div>
      <DemoNotice>
        Mover uma oportunidade atualiza os contatos e as contagens nesta sessão. As sete etapas
        também são acessíveis por teclado.
      </DemoNotice>
      <ContactDetail key={detail} contactId={detail} onClose={() => setDetail(null)} />
      <NewContact open={create} onOpenChange={setCreate} />
    </>
  )
}
