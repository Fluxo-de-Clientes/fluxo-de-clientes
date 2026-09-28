import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  MessagesSquare,
  UserCheck,
  TriangleAlert,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Check,
  Clock,
  Globe,
  Send,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { useOrgData } from '../app/store'
import { stages } from '../types'
import { money, number, relative } from '../lib/utils'
import { periodContacts, chartData } from '../lib/metrics'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SectionTitle,
  Metric,
  Avatar,
  Badge,
  Progress,
} from '../components/ui/primitives'
const ContactChart = lazy(() => import('../components/charts/ContactChart'))
export default function Overview() {
  const app = useOrgData()
  const current = periodContacts(app.contacts, app.period, app.customRange),
    previous = periodContacts(app.contacts, app.period, app.customRange, true)
  const change = (n: number, p: number) =>
    p ? Math.round(((n - p) / p) * 100) + '%' : n ? '+' + n : '0%'
  const active = current.filter((c) => c.stage === 'Em atendimento'),
    qualified = current.filter((c) => c.stage === 'Qualificação'),
    risk = app.contacts.filter((c) => c.risk)
  const actions = risk.slice(0, 3)
  const funnel = stages.slice(0, 6)
  const usage = [
    { label: 'Contatos na base', used: app.contacts.length, limit: app.org.limit },
    { label: 'Campanhas no mês', used: app.campaigns.length, limit: 20 },
    {
      label: 'Execuções de automação',
      used: app.automations.reduce((s, a) => s + a.runs, 0),
      limit: 1000,
    },
    { label: 'Créditos de IA', used: 84, limit: 500 },
  ]
  return (
    <>
      <PageHeading
        eyebrow="SEGUNDA-FEIRA, 28 DE SETEMBRO"
        title="Bom dia, Marina."
        description="Seu fluxo está em movimento. Vamos cuidar dos próximos passos?"
        action={
          <Button asChild variant="secondary">
            <Link to="/analises">
              <ChartLink />
              Ver análises
            </Link>
          </Button>
        }
      />
      <div className="metric-grid">
        <Metric
          label="Novos contatos"
          value={number(current.length)}
          change={change(current.length, previous.length)}
          icon={<Users size={18} />}
        />
        <Metric
          label="Em atendimento"
          value={number(active.length)}
          change={change(
            current.filter((c) => c.stage === 'Em atendimento').length,
            previous.filter((c) => c.stage === 'Em atendimento').length,
          )}
          icon={<MessagesSquare size={18} />}
        />
        <Metric
          label="Qualificados"
          value={number(qualified.length)}
          change={change(
            current.filter((c) => c.stage === 'Qualificação').length,
            previous.filter((c) => c.stage === 'Qualificação').length,
          )}
          icon={<UserCheck size={18} />}
        />
        <Metric
          label="Oportunidades em risco"
          value={number(risk.length)}
          change={risk.length + ' para revisar'}
          icon={<TriangleAlert size={18} />}
          warning
        />
      </div>
      <p className="metric-scope">
        Contatos: cadastrados no período. Risco e funil: situação atual da base.
      </p>
      <div className="overview-main-grid">
        <Card className="contact-chart-card">
          <SectionTitle
            title="Contatos ao longo do tempo"
            description="Novas conexões que aproximam seu negócio."
            action={<Badge icon={false}>Por período</Badge>}
          />
          <div className="chart-summary">
            <strong>{number(current.length)}</strong>
            <span>novos contatos no período</span>
            <span className="chart-change">↗ {change(current.length, previous.length)}</span>
          </div>
          <Suspense fallback={<div className="skeleton sk-chart" />}>
            <ContactChart data={chartData(app.contacts, app.period, app.customRange)} />
          </Suspense>
          <div className="chart-legend">
            <span>
              <i className="legend-orange" />
              Este período
            </span>
            <span>
              <i className="legend-neutral" />
              Período anterior
            </span>
          </div>
        </Card>
        <section className="insight-hero">
          <div className="insight-kicker">
            <Sparkles size={18} />
            <span>INSIGHTS PARA AGIR</span>
            <Badge icon={false}>IA</Badge>
          </div>
          <div className="insight-body">
            <span className="insight-number">{risk.length.toString().padStart(2, '0')}</span>
            <h2>
              Boas conversas
              <br />
              merecem um retorno.
            </h2>
            <p>
              Contatos aguardam sua equipe há mais de 48 horas. Um próximo passo pode fazer a
              diferença.
            </p>
          </div>
          <Button asChild>
            <Link to="/assistente">
              Revisar recomendações <ArrowUpRight size={17} />
            </Link>
          </Button>
          <div className="insight-foot">
            <Check size={13} />A decisão continua com a sua equipe.
          </div>
        </section>
      </div>
      <div className="overview-secondary-grid">
        <Card className="funnel-summary">
          <SectionTitle
            title="Cada etapa, uma oportunidade"
            description="Seu funil de clientes, em um olhar."
            action={
              <Link className="text-link" to="/funil">
                Ver funil <ArrowUpRight size={15} />
              </Link>
            }
          />
          <div className="funnel-bars">
            {funnel.map((s, i) => {
              const count = app.contacts.filter((c) => c.stage === s).length
              return (
                <Link to="/funil" key={s} className="funnel-row">
                  <span>{s}</span>
                  <div>
                    <i
                      style={{
                        width:
                          (count /
                            Math.max(
                              1,
                              ...funnel.map(
                                (stage) => app.contacts.filter((c) => c.stage === stage).length,
                              ),
                            )) *
                            100 +
                          '%',
                        background:
                          i === 0
                            ? '#F0440B'
                            : i === 1
                              ? '#f98761'
                              : i === 2
                                ? '#e4b399'
                                : i === 3
                                  ? '#c6b9a6'
                                  : i === 4
                                    ? '#aaa892'
                                    : '#7b826d',
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </Link>
              )
            })}
          </div>
          <div className="funnel-total">
            <span>Valor potencial em aberto</span>
            <strong>
              {money(
                app.contacts
                  .filter((c) => !['Cliente', 'Perdido'].includes(c.stage))
                  .reduce((s, c) => s + c.value, 0),
              )}
            </strong>
          </div>
        </Card>
        <Card className="next-actions">
          <SectionTitle
            title="Próximas ações"
            description="O que faz o seu fluxo avançar hoje."
            action={<Badge tone="orange">{risk.length} pendentes</Badge>}
          />
          <div>
            {actions.map((c, i) => (
              <Link to={'/contatos?contato=' + c.id} key={c.id} className="action-item">
                <span className="action-number">0{i + 1}</span>
                <div>
                  <strong>{c.nextStep}</strong>
                  <p>
                    {c.name} <span>·</span> {c.company}
                  </p>
                  <small>
                    <Clock size={12} />
                    Aguardando retorno
                  </small>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <Link className="card-bottom-link" to="/atendimento">
            Organizar meu atendimento <ArrowRight size={16} />
          </Link>
        </Card>
      </div>
      <div className="overview-bottom-grid">
        <Card>
          <SectionTitle
            title="Aconteceu no seu fluxo"
            action={<Clock size={17} className="text-muted" />}
          />
          <div className="activity-list">
            {app.activities.slice(0, 3).map((a) => (
              <div key={a.id}>
                <span className="activity-symbol">
                  <Users size={15} />
                </span>
                <div>
                  <strong>{a.text}</strong>
                  <small>{relative(a.date)}</small>
                </div>
              </div>
            ))}
            <div>
              <span className="activity-symbol">
                <Send size={15} />
              </span>
              <div>
                <strong>Reativação de setembro concluída</strong>
                <small>52 cliques na campanha</small>
              </div>
            </div>
            <div>
              <span className="activity-symbol">
                <Zap size={15} />
              </span>
              <div>
                <strong>Boas-vindas está em movimento</strong>
                <small>86 execuções demonstrativas</small>
              </div>
            </div>
          </div>
          <div className="team-footer">
            <div className="avatar-stack">
              {['Marina Costa', 'Rafael Lima', 'Clara Alves'].map((n) => (
                <Avatar name={n} small key={n} />
              ))}
            </div>
            <span>Uma equipe, no mesmo fluxo.</span>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Tudo pronto para acontecer?" description="Saúde da sua operação." />
          <div className="health-list">
            <Link to="/dominios">
              <span>
                <Globe size={16} />
                Domínio de envio
              </span>
              <Badge tone={app.org.health === 'Saudável' ? 'green' : 'orange'}>
                {app.org.health === 'Saudável' ? 'Verificado' : 'Atenção'}
              </Badge>
            </Link>
            <Link to="/campanhas">
              <span>
                <Send size={16} />
                Entregabilidade
              </span>
              <strong>98,1%</strong>
            </Link>
            <Link to="/automacoes">
              <span>
                <Zap size={16} />
                Automações ativas
              </span>
              <strong>
                {app.automations.filter((a) => a.active).length} de {app.automations.length}
              </strong>
            </Link>
          </div>
          <div className="health-note">
            <Check size={15} />
            <span>Cenário de saúde demonstrativo.</span>
          </div>
        </Card>
        <Card>
          <SectionTitle
            title="Espaço para crescer"
            action={<Badge icon={false}>{app.org.plan}</Badge>}
          />
          <div className="usage-list">
            {usage.map((u) => (
              <div key={u.label}>
                <div>
                  <span>{u.label}</span>
                  <span>
                    <strong>{number(u.used)}</strong> / {number(u.limit)}
                  </span>
                </div>
                <Progress value={(u.used / u.limit) * 100} label={u.label} />
              </div>
            ))}
          </div>
          <Link className="text-link usage-link" to="/configuracoes?secao=Uso e limites">
            Ver uso e limites <ChevronRight size={14} />
          </Link>
        </Card>
      </div>
    </>
  )
}
function ChartLink() {
  return <ArrowUpRight size={17} />
}
