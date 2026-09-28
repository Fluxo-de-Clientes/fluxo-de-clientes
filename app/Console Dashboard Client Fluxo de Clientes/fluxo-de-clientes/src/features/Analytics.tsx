import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, Clock, UserCheck, TrendingUp, MousePointer2 } from 'lucide-react'
import { useOrgData } from '../app/store'
import { owners } from '../data/mock'
import { periodContacts, chartData } from '../lib/metrics'
import { safeRead, safeWrite } from '../lib/utils'
import {
  Card,
  PageHeading,
  SectionTitle,
  Metric,
  Select,
  Avatar,
  Badge,
  Empty,
} from '../components/ui/primitives'
import ContactChart from '../components/charts/ContactChart'
export default function Analytics() {
  const app = useOrgData()
  const [origin, setOrigin] = useState(() => safeRead<string>('fc-analytics-origin', 'Todas'))
  const contacts = periodContacts(app.contacts, app.period, app.customRange).filter(
    (c) => origin === 'Todas' || c.origin === origin,
  )
  const origins = [
    ...new Set([
      'Site',
      'Instagram',
      'WhatsApp',
      'Indicação',
      ...app.contacts.map((c) => c.origin),
    ]),
  ]
  const sources = origins.map((o) => ({
    name: o,
    contatos: contacts.filter((c) => c.origin === o).length,
  }))
  const qualified = contacts.filter((c) =>
    ['Qualificação', 'Proposta', 'Negociação', 'Cliente'].includes(c.stage),
  )
  const conversion = contacts.length ? Math.round((qualified.length / contacts.length) * 100) : 0
  const sent = app.campaigns.reduce((s, c) => s + c.sent, 0),
    clicks = app.campaigns.reduce((s, c) => s + c.clicks, 0)
  return (
    <>
      <PageHeading
        eyebrow="DADOS QUE APONTAM CAMINHOS"
        title="Análises"
        description="Entenda o que funciona. Encontre o que pode avançar."
        action={
          <Select
            label="Origem dos contatos"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value)
              safeWrite('fc-analytics-origin', e.target.value)
            }}
          >
            {['Todas', ...origins].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Select>
        }
      />
      <div className="metric-grid">
        <Metric
          label="Conversão em qualificados"
          value={conversion + '%'}
          change="+4,2 p.p."
          icon={<TrendingUp size={18} />}
        />
        <Metric
          label="Até a primeira resposta"
          value="18 min"
          change="−6 min"
          icon={<Clock size={18} />}
        />
        <Metric
          label="Contatos qualificados"
          value={qualified.length}
          change="+12%"
          icon={<UserCheck size={18} />}
        />
        <Metric
          label="Taxa de clique"
          value={sent ? ((clicks / sent) * 100).toFixed(1) + '%' : '0%'}
          change="+3,1 p.p."
          icon={<MousePointer2 size={18} />}
        />
      </div>
      <div className="two-column">
        <Card>
          <SectionTitle
            title="Qualificados ao longo do tempo"
            description="Acompanhe a evolução no período selecionado."
          />
          <ContactChart
            data={chartData(
              app.contacts.filter(
                (c) =>
                  ['Qualificação', 'Proposta', 'Negociação', 'Cliente'].includes(c.stage) &&
                  (origin === 'Todas' || c.origin === origin),
              ),
              app.period,
              app.customRange,
            )}
          />
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
        <Card>
          <SectionTitle
            title="De onde vêm as conversas?"
            description="Origem dos contatos no período."
          />
          <div
            className="chart-container"
            role="img"
            aria-label={sources.map((s) => s.name + ': ' + s.contatos + ' contatos').join('; ')}
          >
            <ResponsiveContainer minWidth={0} width="100%" height="100%">
              <BarChart
                data={sources}
                margin={{ left: -25, right: 10, top: 25 }}
                accessibilityLayer
              >
                <CartesianGrid vertical={false} strokeDasharray="3 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: '#f8f4ec' }} />
                <Bar
                  isAnimationActive={false}
                  dataKey="contatos"
                  name="Contatos"
                  fill="#F0440B"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="two-column">
        <Card>
          <SectionTitle
            title="Da conversa ao cliente"
            description="Distribuição por etapa; conversão acumulada ilustrativa."
          />
          <div className="conversion-list">
            {['Entrada', 'Em atendimento', 'Qualificação', 'Proposta', 'Negociação', 'Cliente'].map(
              (s, i) => (
                <div key={s}>
                  <span>{s}</span>
                  <div>
                    <i style={{ width: 100 - i * 15 + '%' }} />
                  </div>
                  <strong>{contacts.filter((c) => c.stage === s).length}</strong>
                  <small>{[100, 85, 62, 44, 25, 14][i]}%*</small>
                </div>
              ),
            )}
          </div>
          <p className="chart-footnote">
            * Taxas de passagem ilustrativas, sem histórico real de movimentações.
          </p>
        </Card>
        <Card>
          <SectionTitle
            title="Pessoas que fazem acontecer"
            description="Distribuição e oportunidades por responsável."
          />
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Responsável</th>
                  <th>Contatos</th>
                  <th>Qualificados</th>
                  <th>Em risco</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((o) => (
                  <tr key={o}>
                    <td>
                      <span className="owner-cell">
                        <Avatar name={o} small />
                        {o}
                      </span>
                    </td>
                    <td>{contacts.filter((c) => c.owner === o).length}</td>
                    <td>{qualified.filter((c) => c.owner === o).length}</td>
                    <td>{contacts.filter((c) => c.owner === o && c.risk).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div className="two-column">
        <Card>
          <SectionTitle
            title="Campanhas que aproximaram"
            action={
              <Link className="text-link" to="/campanhas">
                Ver todas <ArrowUpRight size={14} />
              </Link>
            }
          />
          {app.campaigns
            .filter((c) => c.sent > 0)
            .sort((a, b) => b.clicks / Math.max(1, b.sent) - a.clicks / Math.max(1, a.sent))
            .map((c) => (
              <div className="rank-row" key={c.id}>
                <span className="square-icon">
                  <MousePointer2 size={16} />
                </span>
                <div>
                  <strong>{c.name}</strong>
                  <small>
                    {c.opened} aberturas · {c.clicks} cliques
                  </small>
                </div>
                <Badge tone="green">{((c.clicks / Math.max(1, c.sent)) * 100).toFixed(1)}%</Badge>
              </div>
            ))}
        </Card>
        <Card>
          <SectionTitle
            title="Aprender com as oportunidades perdidas"
            description={
              contacts.filter((c) => c.stage === 'Perdido').length +
              ' oportunidades perdidas no período.'
            }
          />
          {['Momento de compra', 'Orçamento disponível', 'Sem retorno'].map((r, i) => (
            <div className="rank-row" key={r}>
              <span className="rank-number">0{i + 1}</span>
              <div>
                <strong>{r}</strong>
                <small>Motivo demonstrativo</small>
              </div>
              <span>{[50, 33, 17][i]}%</span>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <SectionTitle
          title="O que os dados sugerem"
          description="Sinais para revisar com a equipe."
        />
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Sinal identificado</th>
                <th>Leitura</th>
                <th>Próximo passo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contatos sem retorno</td>
                <td>{contacts.filter((c) => c.risk).length} oportunidades precisam de atenção</td>
                <td>
                  <Link className="text-link" to="/atendimento">
                    Organizar retornos <ArrowUpRight size={14} />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Reativação com bom resultado</td>
                <td>Revisar o público antes de uma nova edição</td>
                <td>
                  <Link className="text-link" to="/campanhas">
                    Revisar campanha <ArrowUpRight size={14} />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {!contacts.length && (
          <Empty
            title="Sem contatos neste recorte"
            description="Altere o período ou a origem para explorar outros resultados."
          />
        )}
      </Card>
      <p className="chart-footnote">
        Tempos, comparações percentuais e motivos são cenários fictícios. Contagens de contatos
        refletem a organização, o período e a origem selecionados.
      </p>
    </>
  )
}
