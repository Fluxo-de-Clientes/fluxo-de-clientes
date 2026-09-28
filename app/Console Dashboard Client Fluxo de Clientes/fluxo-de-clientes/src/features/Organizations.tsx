import { demoNow } from '../lib/utils'
import { useState } from 'react'
import { Plus, Building2, ArrowUpRight, Users, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { useApp } from '../app/store'
import type { Organization } from '../types'
import { dateLabel, number } from '../lib/utils'
import { owners } from '../data/mock'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  Avatar,
  Status,
  SearchInput,
  Select,
  Modal,
  Input,
  Progress,
  Empty,
  DemoNotice,
  Badge,
} from '../components/ui/primitives'
export default function Organizations() {
  const app = useApp()
  const [query, setQuery] = useState(''),
    [plan, setPlan] = useState('Todos'),
    [status, setStatus] = useState('Todas'),
    [usage, setUsage] = useState('Todos'),
    [detail, setDetail] = useState<Organization | null>(null),
    [create, setCreate] = useState(false),
    [form, setForm] = useState({ name: '', sector: '', plan: 'Essencial', owner: owners[0] })
  const count = (id: string) =>
    app.contacts.filter((c) => c.organizationId === id && c.status === 'Ativo').length
  const data = app.organizations.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) &&
      (plan === 'Todos' || o.plan === plan) &&
      (status === 'Todas' || o.health === status) &&
      (usage === 'Todos' ||
        (usage === 'Até 50%' && count(o.id) / o.limit <= 0.5) ||
        (usage === 'Acima de 50%' && count(o.id) / o.limit > 0.5)),
  )
  return (
    <>
      <PageHeading
        eyebrow="VÁRIOS NEGÓCIOS, UM FLUXO"
        title="Clientes e organizações"
        description="Acompanhe as empresas que confiam na sua operação."
        action={
          <Button variant="dark" onClick={() => setCreate(true)} disabled={app.readOnly}>
            <Plus size={16} />
            Criar cliente
          </Button>
        }
      />
      <div className="summary-strip">
        <span>
          <Building2 size={17} />
          <strong>{app.organizations.length}</strong> organizações
        </span>
        <span>
          <Users size={17} />
          <strong>{app.contacts.length}</strong> contatos no total
        </span>
        <span>
          <Globe size={17} />
          <strong>{app.organizations.filter((o) => o.health === 'Saudável').length}</strong> contas
          saudáveis
        </span>
      </div>
      <Card>
        <div className="table-toolbar wrap">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Buscar organizações"
            placeholder="Buscar empresa..."
          />
          <Select label="Plano" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {['Todos', 'Essencial', 'Crescimento'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Select>
          <Select label="Saúde" value={status} onChange={(e) => setStatus(e.target.value)}>
            {['Todas', 'Saudável', 'Atenção'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Select>
          <Select label="Uso" value={usage} onChange={(e) => setUsage(e.target.value)}>
            {['Todos', 'Até 50%', 'Acima de 50%'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Select>
        </div>
        <div className="table-scroll" tabIndex={0} aria-label="Tabela de organizações">
          <table>
            <thead>
              <tr>
                {[
                  'Organização',
                  'Plano',
                  'Contatos ativos',
                  'Uso mensal',
                  'Domínio',
                  'Saúde',
                  'Responsável',
                  'Última atividade',
                  'Detalhes',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((o) => (
                <tr key={o.id}>
                  <td>
                    <button className="person-cell" onClick={() => setDetail(o)}>
                      <Avatar name={o.name} />
                      <span>
                        <strong>{o.name}</strong>
                        <small>{o.sector}</small>
                      </span>
                    </button>
                  </td>
                  <td>
                    <Badge icon={false}>{o.plan}</Badge>
                  </td>
                  <td>{count(o.id)}</td>
                  <td className="usage-cell">
                    <span>
                      {number(count(o.id))} / {number(o.limit)}
                    </span>
                    <Progress label={'Uso de ' + o.name} value={(count(o.id) / o.limit) * 100} />
                  </td>
                  <td>
                    <Status value={o.health === 'Saudável' ? 'Verificado' : 'Atenção'} />
                  </td>
                  <td>
                    <Status value={o.health} />
                  </td>
                  <td>{o.owner}</td>
                  <td>{dateLabel(o.lastActivity)}</td>
                  <td>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={'Detalhes de ' + o.name}
                      onClick={() => setDetail(o)}
                    >
                      <ArrowUpRight size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!data.length && <Empty />}
        <div className="table-footer">
          {data.length} organizações
          <span>Selecione uma empresa na barra superior para mudar de contexto.</span>
        </div>
      </Card>
      <DemoNotice>
        A alternância organiza a demonstração por empresa. O isolamento seguro entre organizações
        dependerá de autenticação e autorização no backend futuro.
      </DemoNotice>
      <Modal
        open={!!detail}
        onOpenChange={(v) => {
          if (!v) setDetail(null)
        }}
        title={detail?.name || 'Organização'}
        drawer
      >
        {detail && (
          <div className="form-stack">
            <div className="contact-profile">
              <Avatar name={detail.name} />
              <div>
                <h2>{detail.name}</h2>
                <p>{detail.sector}</p>
              </div>
            </div>
            <Status value={detail.health} />
            <div className="detail-facts">
              <div>
                <span>Plano</span>
                <strong>{detail.plan}</strong>
              </div>
              <div>
                <span>Responsável</span>
                <strong>{detail.owner}</strong>
              </div>
              <div>
                <span>Contatos ativos</span>
                <strong>{count(detail.id)}</strong>
              </div>
              <div>
                <span>Domínio</span>
                <strong>{detail.domain}</strong>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                app.setOrganization(detail.id)
                setDetail(null)
                toast.success('Contexto alterado para ' + detail.name + '.')
              }}
            >
              Abrir organização <ArrowUpRight size={16} />
            </Button>
          </div>
        )}
      </Modal>
      <Modal
        open={create}
        onOpenChange={setCreate}
        title="Criar cliente"
        description="Adicione uma organização fictícia ao seu espaço."
      >
        <form
          className="form-stack"
          onSubmit={(e) => {
            e.preventDefault()
            if (form.name.trim().length < 3 || !form.sector.trim()) {
              toast.error('Preencha nome e segmento com informações válidas.')
              return
            }
            if (
              app.organizations.some((o) => o.name.toLowerCase() === form.name.trim().toLowerCase())
            ) {
              toast.error('Já existe uma organização com esse nome.')
              return
            }
            app.addOrganization({
              ...form,
              name: form.name.trim(),
              id: crypto.randomUUID(),
              domain: 'novo-cliente.example',
              limit: form.plan === 'Essencial' ? 500 : 1000,
              health: 'Atenção',
              lastActivity: demoNow().toISOString(),
            })
            toast.success('Cliente criado. Selecione-o na barra superior.')
            setCreate(false)
            setForm({ name: '', sector: '', plan: 'Essencial', owner: owners[0] })
          }}
        >
          <Input
            label="Nome da empresa"
            required
            minLength={3}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Segmento"
            required
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
          />
          <Select
            label="Plano"
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
          >
            <option>Essencial</option>
            <option>Crescimento</option>
          </Select>
          <Select
            label="Responsável"
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
          >
            {owners.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
          <Button type="submit" variant="primary" disabled={app.readOnly}>
            Criar cliente
          </Button>
        </form>
      </Modal>
    </>
  )
}
