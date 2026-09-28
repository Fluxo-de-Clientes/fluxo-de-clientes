import { demoNow } from '../lib/utils'
import { useState } from 'react'
import {
  Globe,
  Check,
  ShieldCheck,
  ChevronRight,
  Info,
  Plus,
  TriangleAlert,
  Copy,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'

import type { DomainStatus } from '../types'
import { dateLabel } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SectionTitle,
  Status,
  Modal,
  Input,
  DemoNotice,
  Empty,
  Badge,
} from '../components/ui/primitives'
export default function Domains() {
  const app = useOrgData()
  const domains = app.domains,
    setDomains = app.setDomains
  const [detail, setDetail] = useState<string | null>(null),
    [create, setCreate] = useState(false),
    [name, setName] = useState('')
  const data = domains.filter((d) => d.organizationId === app.organizationId),
    selected = data.find((d) => d.id === detail)
  return (
    <>
      <PageHeading
        eyebrow="CONFIANÇA EM CADA MENSAGEM"
        title="Domínios e entregabilidade"
        description="Acompanhe a preparação do seu envio com clareza."
        action={
          <Button variant="dark" disabled={app.readOnly} onClick={() => setCreate(true)}>
            <Plus size={16} />
            Adicionar domínio demo
          </Button>
        }
      />
      <div className="domain-overview">
        <div className="domain-health-icon">
          <ShieldCheck size={34} />
        </div>
        <div>
          <p className="eyebrow">SAÚDE DE ENVIO · CENÁRIO DEMONSTRATIVO</p>
          <h2>
            {data.some((d) => d.status === 'Verificado')
              ? 'Uma boa base para suas mensagens.'
              : 'Vamos preparar seu domínio.'}
          </h2>
          <p>
            {data.filter((d) => d.status === 'Verificado').length} domínio verificado ·{' '}
            {data.filter((d) => d.status !== 'Verificado').length} precisa de configuração
          </p>
        </div>
        <div className="domain-rate">
          <strong>
            98,1<span>%</span>
          </strong>
          <span>entrega ilustrativa</span>
        </div>
      </div>
      <Card>
        <SectionTitle
          title="Seus domínios"
          description="As verificações abaixo são dados fictícios. Nenhuma consulta DNS foi realizada."
        />
        <div className="table-scroll" tabIndex={0} aria-label="Tabela de domínios">
          <table>
            <thead>
              <tr>
                {[
                  'Domínio de envio',
                  'Status geral',
                  'SPF',
                  'DKIM',
                  'DMARC',
                  'Última verificação',
                  'Detalhes',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id}>
                  <td>
                    <span className="owner-cell">
                      <Globe size={18} />
                      <strong>{d.name}</strong>
                    </span>
                  </td>
                  <td>
                    <Status value={d.status} />
                  </td>
                  {[d.spf, d.dkim, d.dmarc].map((v, i) => (
                    <td key={i}>
                      <Badge tone={v ? 'green' : 'orange'}>{v ? 'Verificado' : 'Pendente'}</Badge>
                    </td>
                  ))}
                  <td>{dateLabel(d.checkedAt)}</td>
                  <td>
                    <Button size="sm" onClick={() => setDetail(d.id)}>
                      Ver configuração <ChevronRight size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!data.length && (
          <Empty
            title="Nenhum domínio cadastrado"
            description="Adicione um domínio .example para explorar a configuração."
          />
        )}
      </Card>
      <div className="two-column">
        <Card>
          <SectionTitle title="Um caminho simples para começar" />
          <ol className="onboarding-list">
            {[
              [
                'Escolha o domínio de envio',
                'Um endereço reconhecível ajuda sua equipe e seus contatos.',
              ],
              ['Autorize o envio com SPF', 'Indica quais serviços podem enviar pelo domínio.'],
              ['Assine as mensagens com DKIM', 'Ajuda a confirmar a origem das mensagens.'],
              [
                'Defina uma política DMARC',
                'Orienta o tratamento de mensagens que falham na autenticação.',
              ],
            ].map(([t, d], i) => (
              <li key={t}>
                <span>{i === 0 ? <Check size={15} /> : i + 1}</span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="recommendation-card">
          <span className="square-icon">
            <Info size={22} />
          </span>
          <h2>Consistência também é entregabilidade.</h2>
          <p>
            Use públicos que esperam sua mensagem, revise o conteúdo e respeite as preferências de
            recebimento.
          </p>
          <div className="note">
            <TriangleAlert size={18} />
            <p>
              Antes de um envio real, a equipe deverá validar o domínio e os registros no provedor
              escolhido.
            </p>
          </div>
        </Card>
      </div>
      <DemoNotice />
      <Modal
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setDetail(null)
        }}
        title={selected?.name || 'Domínio'}
        wide
      >
        {selected && (
          <div className="form-stack">
            <Status value={selected.status} />
            <p>
              Exemplos de registros para entender o processo. Estes valores não devem ser usados em
              DNS real.
            </p>
            {[
              ['SPF', 'TXT', 'v=spf1 -all'],
              ['DKIM', 'TXT', 'Valor público demonstrativo fornecido pelo futuro serviço'],
              ['DMARC', 'TXT', 'v=DMARC1; p=none;'],
            ].map(([t, type, value]) => (
              <div className="dns-record" key={t}>
                <strong>{t}</strong>
                <Badge icon={false}>{type}</Badge>
                <code>{value}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={'Copiar exemplo ' + t}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(value)
                      toast.success('Exemplo copiado. Não use em DNS real.')
                    } catch {
                      toast.error('A cópia não está disponível neste navegador.')
                    }
                  }}
                >
                  <Copy size={15} />
                </Button>
              </div>
            ))}
            <SelectScenario
              disabled={app.readOnly}
              domain={selected}
              onChange={(status) =>
                setDomains((all) =>
                  all.map((d) =>
                    d.id === selected.id
                      ? {
                          ...d,
                          status,
                          spf: status === 'Verificado',
                          dkim: status === 'Verificado',
                          dmarc: status === 'Verificado',
                        }
                      : d,
                  ),
                )
              }
            />
            <DemoNotice>A mudança de cenário apenas demonstra os estados da interface.</DemoNotice>
          </div>
        )}
      </Modal>
      <Modal open={create} onOpenChange={setCreate} title="Adicionar domínio demonstrativo">
        <form
          className="form-stack"
          onSubmit={(e) => {
            e.preventDefault()
            if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*\.example$/.test(name)) {
              toast.error('Use um domínio fictício terminado em .example.')
              return
            }
            if (data.some((d) => d.name === name)) {
              toast.error('Este domínio já está cadastrado.')
              return
            }
            setDomains((all) => [
              ...all,
              {
                id: crypto.randomUUID(),
                organizationId: app.organizationId,
                name,
                status: 'Pendente',
                spf: false,
                dkim: false,
                dmarc: false,
                checkedAt: demoNow().toISOString(),
              },
            ])
            setCreate(false)
            setName('')
            toast.success('Domínio demonstrativo adicionado.')
          }}
        >
          <Input
            label="Domínio fictício"
            value={name}
            placeholder="novidades.empresa.example"
            required
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
          <Button type="submit" variant="primary">
            Adicionar
          </Button>
        </form>
      </Modal>
    </>
  )
}
function SelectScenario({
  domain,
  onChange,
  disabled,
}: {
  disabled: boolean
  domain: DomainStatus
  onChange: (v: DomainStatus['status']) => void
}) {
  return (
    <label className="field">
      <span>Cenário demonstrativo</span>
      <select
        disabled={disabled}
        value={domain.status}
        onChange={(e) => onChange(e.target.value as DomainStatus['status'])}
      >
        {['Pendente', 'Verificado', 'Atenção', 'Falha'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </label>
  )
}
