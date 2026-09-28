import { demoNow } from '../lib/utils'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Plus,
  Send,
  MousePointer2,
  Mail,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  FileText,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import type { Campaign } from '../types'
import { dateLabel, number } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  Metric,
  Status,
  SearchInput,
  Select,
  Empty,
  Menu,
  Modal,
  Input,
  DemoNotice,
} from '../components/ui/primitives'
export default function Campaigns() {
  const app = useOrgData()
  const navigate = useNavigate()
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState('Todas'),
    [detail, setDetail] = useState<Campaign | null>(null)
  const campaigns = app.campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) &&
      (status === 'Todas' || c.status === status),
  )
  const totals = app.campaigns.reduce(
    (a, c) => ({
      sent: a.sent + c.sent,
      delivered: a.delivered + c.delivered,
      opened: a.opened + c.opened,
      clicks: a.clicks + c.clicks,
    }),
    { sent: 0, delivered: 0, opened: 0, clicks: 0 },
  )
  return (
    <>
      <PageHeading
        eyebrow="MENSAGENS COM PROPÓSITO"
        title="Campanhas"
        description="A mensagem certa mantém boas relações em movimento."
        action={
          <Button asChild variant="dark">
            <Link to="/campanhas/nova">
              <Plus size={16} />
              Nova campanha
            </Link>
          </Button>
        }
      />
      <div className="metric-grid">
        <Metric
          label="E-mails enviados"
          value={number(totals.sent)}
          change="+12%"
          icon={<Send size={18} />}
        />
        <Metric
          label="Taxa de entrega"
          value={((totals.delivered / Math.max(1, totals.sent)) * 100).toFixed(1) + '%'}
          change="+1,2%"
          icon={<Mail size={18} />}
        />
        <Metric
          label="Taxa de abertura"
          value={((totals.opened / Math.max(1, totals.sent)) * 100).toFixed(1) + '%'}
          change="+6,4%"
          icon={<Eye size={18} />}
        />
        <Metric
          label="Cliques"
          value={totals.clicks}
          change="+18%"
          icon={<MousePointer2 size={18} />}
        />
      </div>
      <Card>
        <div className="table-toolbar">
          <SearchInput
            label="Buscar campanhas"
            value={query}
            onChange={setQuery}
            placeholder="Buscar campanha..."
          />
          <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              'Todas',
              'Rascunho',
              'Agendada',
              'Enviando',
              'Concluída',
              'Pausada',
              'Com atenção',
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="table-scroll" tabIndex={0} aria-label="Tabela de campanhas">
          <table>
            <thead>
              <tr>
                {[
                  'Campanha',
                  'Status',
                  'Público',
                  'Data',
                  'Enviados',
                  'Entregues',
                  'Abertos',
                  'Cliques',
                  'Descadastros',
                  'Ações',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td>
                    <button className="campaign-name" onClick={() => setDetail(c)}>
                      <span className="square-icon">
                        <Mail size={18} />
                      </span>
                      <span>
                        <strong>{c.name}</strong>
                        <small>{c.subject}</small>
                      </span>
                    </button>
                  </td>
                  <td>
                    <Status value={c.status} />
                  </td>
                  <td>{c.audience}</td>
                  <td>{dateLabel(c.date)}</td>
                  {[c.sent, c.delivered, c.opened, c.clicks, c.unsubscribed].map((n, i) => (
                    <td key={i}>{number(n)}</td>
                  ))}
                  <td>
                    <Menu
                      label={'Ações de ' + c.name}
                      trigger={<MoreHorizontal size={18} />}
                      items={[
                        {
                          label: 'Continuar rascunho',
                          disabled: app.readOnly || c.status !== 'Rascunho',
                          onSelect: () => navigate('/campanhas/nova?rascunho=' + c.id),
                        },
                        { label: 'Ver desempenho e conteúdo', onSelect: () => setDetail(c) },
                        {
                          label: 'Duplicar como rascunho',
                          disabled: app.readOnly,
                          onSelect: () => {
                            app.saveCampaign({
                              ...c,
                              id: crypto.randomUUID(),
                              name: c.name + ' (cópia)',
                              status: 'Rascunho',
                              sent: 0,
                              delivered: 0,
                              opened: 0,
                              clicks: 0,
                              unsubscribed: 0,
                            })
                            toast.success('Rascunho duplicado.')
                          },
                        },
                        {
                          label:
                            c.status === 'Pausada' ? 'Retomar como rascunho' : 'Pausar campanha',
                          disabled: app.readOnly || c.status === 'Concluída',
                          onSelect: () => {
                            app.saveCampaign({
                              ...c,
                              status: c.status === 'Pausada' ? 'Rascunho' : 'Pausada',
                            })
                            toast.success('Status da campanha atualizado.')
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!campaigns.length && (
          <Empty
            title="Nenhuma campanha neste filtro"
            description="Ajuste a busca ou comece uma nova conversa com seu público."
            action={
              <Button asChild>
                <Link to="/campanhas/nova">Criar campanha</Link>
              </Button>
            }
          />
        )}
        <div className="table-footer">
          {campaigns.length} campanhas <span>Indicadores fictícios · sem disparos reais</span>
        </div>
      </Card>
      <div className="campaign-tip">
        <span className="square-icon">
          <MousePointer2 size={20} />
        </span>
        <div>
          <h3>Uma boa conversa pode começar de novo.</h3>
          <p>
            A reativação de setembro teve 16,3% de cliques. Revise o público antes de preparar a
            próxima edição.
          </p>
        </div>
        <Button asChild>
          <Link to="/assistente">
            Ver recomendação <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
      <DemoNotice />
      <Modal
        open={!!detail}
        onOpenChange={(v) => {
          if (!v) setDetail(null)
        }}
        title={detail?.name || 'Campanha'}
        wide
      >
        {detail && (
          <div className="form-stack">
            <div className="row-between">
              <Status value={detail.status} />
              <span>{detail.audience}</span>
            </div>
            <div className="summary-strip">
              <span>
                <strong>{detail.sent}</strong> enviados
              </span>
              <span>
                <strong>{detail.opened}</strong> abertos
              </span>
              <span>
                <strong>{detail.clicks}</strong> cliques
              </span>
            </div>
            <EmailPreview
              subject={detail.subject}
              sender={detail.sender}
              content={detail.content}
            />
          </div>
        )}
      </Modal>
    </>
  )
}
const schema = z.object({
  name: z.string().trim().min(3, 'Dê um nome com ao menos 3 caracteres.'),
  objective: z.string().min(1, 'Escolha o objetivo.'),
  audience: z.string().min(1, 'Selecione um público.'),
  subject: z.string().trim().min(3, 'Escreva um assunto.').max(120, 'Use até 120 caracteres.'),
  sender: z.string().trim().min(2, 'Informe o nome do remetente.'),
  content: z.string().trim().min(20, 'Escreva ao menos 20 caracteres para a mensagem.'),
  date: z.string(),
})
type CampaignForm = z.infer<typeof schema>
const steps = ['Objetivo', 'Público', 'Assunto e remetente', 'Conteúdo', 'Revisão', 'Agendamento']
export function NewCampaign() {
  const app = useOrgData(),
    navigate = useNavigate()
  const [params] = useSearchParams()
  const existingDraft = app.campaigns.find(
    (c) => c.id === params.get('rascunho') && c.status === 'Rascunho',
  )
  const [step, setStep] = useState(0),
    [mode, setMode] = useState('draft')
  const {
    register,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CampaignForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: existingDraft?.name || '',
      objective: existingDraft ? 'Reativar conversas' : '',
      audience: existingDraft?.audience === 'A definir' ? '' : existingDraft?.audience || '',
      subject: existingDraft?.subject || '',
      sender: existingDraft?.sender || app.org.name,
      content: existingDraft?.content || '',
      date: '',
    },
  })
  const v = watch()
  const fields: (keyof CampaignForm)[][] = [
    ['name', 'objective'],
    ['audience'],
    ['subject', 'sender'],
    ['content'],
    [],
    [],
  ]
  const next = async () => {
    if (await trigger(fields[step])) setStep((s) => Math.min(5, s + 1))
  }
  const save = async (draft: boolean) => {
    if (app.readOnly) return
    if (
      !(await trigger([
        'name',
        ...(draft
          ? []
          : (['objective', 'audience', 'subject', 'sender', 'content'] as (keyof CampaignForm)[])),
      ]))
    )
      return
    const values = getValues()
    if (!draft && (!values.date || new Date(values.date) <= new Date())) {
      toast.error('Escolha uma data e hora futuras para o agendamento.')
      return
    }
    const persisted = app.saveCampaign({
      id: existingDraft?.id || crypto.randomUUID(),
      organizationId: app.organizationId,
      name: values.name,
      audience: values.audience || 'A definir',
      subject: values.subject,
      sender: values.sender,
      content: values.content,
      status: draft ? 'Rascunho' : 'Agendada',
      date: draft ? demoNow().toISOString() : new Date(values.date).toISOString(),
      sent: 0,
      delivered: 0,
      opened: 0,
      clicks: 0,
      unsubscribed: 0,
    })
    toast.success(
      draft
        ? persisted
          ? 'Rascunho salvo neste navegador.'
          : 'Rascunho salvo apenas nesta sessão.'
        : 'Agendamento demonstrativo criado. Não haverá envio.',
    )
    navigate('/campanhas')
  }
  return (
    <>
      <Link className="breadcrumb" to="/campanhas">
        <ArrowLeft size={15} />
        Campanhas / Nova campanha
      </Link>
      <PageHeading
        title="Uma mensagem, um próximo passo."
        description="Prepare sua campanha com atenção a cada detalhe."
      />
      <ol className="wizard-steps">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? 'active' : i < step ? 'done' : ''}>
            <span>{i < step ? <Check size={16} /> : String(i + 1).padStart(2, '0')}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="wizard-layout">
        <Card className="wizard-form">
          <p className="eyebrow">ETAPA {step + 1} DE 6</p>
          <h2>{steps[step]}</h2>
          {step === 0 && (
            <div className="form-stack">
              <p>O que você quer fazer acontecer com esta campanha?</p>
              <Input label="Nome da campanha" {...register('name')} error={errors.name?.message} />
              <Select label="Objetivo da campanha" {...register('objective')}>
                <option value="">Escolha um objetivo</option>
                {[
                  'Reativar conversas',
                  'Apresentar novidades',
                  'Dar boas-vindas',
                  'Convidar para um evento',
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
              {errors.objective && (
                <p role="alert" className="field-error">
                  {errors.objective.message}
                </p>
              )}
            </div>
          )}
          {step === 1 && (
            <div className="form-stack">
              <p>Escolha quem deve receber essa conversa.</p>
              <Select label="Público" {...register('audience')}>
                <option value="">Selecione um segmento</option>
                {[
                  'Todos os contatos',
                  'Novos contatos',
                  'Reativação',
                  'Alta intenção',
                  'Clientes',
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
              {errors.audience && (
                <p className="field-error" role="alert">
                  {errors.audience.message}
                </p>
              )}
              <div className="audience-preview">
                <UsersIcon />
                <strong>
                  {v.audience === 'Todos os contatos'
                    ? app.contacts.length
                    : v.audience === 'Clientes'
                      ? app.contacts.filter((c) => c.stage === 'Cliente').length
                      : app.contacts.filter((c) =>
                          c.tags.includes(
                            v.audience === 'Novos contatos' ? 'Novo contato' : v.audience,
                          ),
                        ).length}
                </strong>
                <span>contatos neste segmento demonstrativo</span>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-stack">
              <Input
                label="Assunto do e-mail"
                {...register('subject')}
                error={errors.subject?.message}
              />
              <Input
                label="Nome do remetente"
                {...register('sender')}
                error={errors.sender?.message}
              />
              <p className="field-help">
                Endereço demonstrativo: equipe@{app.org.domain}. Nenhum serviço de envio conectado.
              </p>
            </div>
          )}
          {step === 3 && (
            <div className="form-stack">
              <div className="block-label">
                <FileText size={16} />
                Bloco de texto
              </div>
              <label className="field">
                <span>Mensagem principal</span>
                <textarea
                  rows={9}
                  {...register('content')}
                  placeholder="Escreva uma mensagem clara e próxima..."
                />
              </label>
              {errors.content && (
                <p className="field-error" role="alert">
                  {errors.content.message}
                </p>
              )}
              <Button
                onClick={() => {
                  const el = document.querySelector<HTMLTextAreaElement>('textarea')
                  el?.focus()
                }}
              >
                <Plus size={15} />
                Continuar editando o bloco
              </Button>
              <p className="field-help">
                Quebras de linha são preservadas na prévia. Conteúdo tratado como texto seguro.
              </p>
            </div>
          )}
          {step === 4 && (
            <div className="form-stack">
              <h3>Revise antes de seguir</h3>
              {[
                ['Nome', v.name],
                ['Objetivo', v.objective],
                ['Público', v.audience],
                ['Assunto', v.subject],
                ['Remetente', v.sender],
              ].map(([l, t]) => (
                <div className="review-line" key={l}>
                  <span>{l}</span>
                  <strong>{t}</strong>
                </div>
              ))}
              <DemoNotice>
                A revisão humana faz parte do fluxo. Esta campanha é uma demonstração.
              </DemoNotice>
            </div>
          )}
          {step === 5 && (
            <div className="form-stack">
              <label className="radio-card">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'draft'}
                  onChange={() => setMode('draft')}
                />
                <span>
                  <strong>Salvar como rascunho</strong>
                  <small>Continue quando fizer sentido.</small>
                </span>
              </label>
              <label className="radio-card">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'schedule'}
                  onChange={() => setMode('schedule')}
                />
                <span>
                  <strong>Simular agendamento</strong>
                  <small>Registra a programação nesta sessão. Não envia.</small>
                </span>
              </label>
              {mode === 'schedule' && (
                <Input
                  label="Data e hora do agendamento"
                  type="datetime-local"
                  {...register('date')}
                />
              )}
              <DemoNotice />
            </div>
          )}
          <div className="wizard-actions">
            <Button onClick={() => (step ? setStep((s) => s - 1) : navigate('/campanhas'))}>
              <ArrowLeft size={15} />
              {step ? 'Voltar' : 'Cancelar'}
            </Button>
            {step < 5 ? (
              <Button variant="primary" onClick={next}>
                Continuar
                <ArrowRight size={15} />
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={app.readOnly}
                onClick={() => save(mode === 'draft')}
              >
                {mode === 'draft' ? <FileText size={15} /> : <CalendarDays size={15} />}{' '}
                {mode === 'draft' ? 'Salvar rascunho' : 'Confirmar simulação'}
              </Button>
            )}
          </div>
          {step < 5 && (
            <Button variant="ghost" size="sm" disabled={app.readOnly} onClick={() => save(true)}>
              Salvar rascunho e sair
            </Button>
          )}
        </Card>
        <div className="wizard-preview">
          <div className="preview-label">
            <Eye size={15} />
            PRÉVIA DO E-MAIL
          </div>
          <EmailPreview
            subject={v.subject || 'O assunto da sua próxima conversa'}
            sender={v.sender || app.org.name}
            content={
              v.content ||
              'Sua mensagem aparece aqui enquanto você escreve. Uma boa conversa começa com um texto simples, próximo e relevante.'
            }
          />
          <p>Prévia ilustrativa · sem envio real</p>
        </div>
      </div>
    </>
  )
}
function UsersIcon() {
  return <Mail size={24} />
}
export function EmailPreview({
  subject,
  sender,
  content,
}: {
  subject: string
  sender: string
  content: string
}) {
  return (
    <article className="email-preview">
      <div className="email-envelope">
        <span>
          <strong>De:</strong> {sender}
        </span>
        <span>
          <strong>Assunto:</strong> {subject}
        </span>
      </div>
      <div className="email-paper">
        <img
          src="/brand/assinatura-horizontal-original.svg"
          alt="Fluxo de Clientes"
          width="240"
          height="88"
        />
        <h2>{subject}</h2>
        <p className="email-body">{content}</p>
        <div className="email-signature">
          Até a próxima conversa,
          <br />
          <strong>{sender}</strong>
        </div>
        <footer>
          Mensagem demonstrativa. Preferências de recebimento serão disponibilizadas na integração
          futura.
        </footer>
      </div>
    </article>
  )
}
