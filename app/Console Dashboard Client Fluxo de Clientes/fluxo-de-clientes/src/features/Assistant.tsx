import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Info,
  Check,
  Clock,
  MessageSquare,
  Target,
  MousePointer2,
} from 'lucide-react'
import { useOrgData } from '../app/store'
import { useSessionState } from '../hooks/useSessionState'
import { mockInsights } from '../data/mock'
import type { Insight } from '../types'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SectionTitle,
  Badge,
  Modal,
  Avatar,
  DemoNotice,
} from '../components/ui/primitives'
export default function Assistant() {
  const app = useOrgData()
  const [review, setReview] = useState<Insight | null>(null),
    [explanation, setExplanation] = useState<Insight | null>(null),
    [reviewed, setReviewed] = useSessionState<string[]>('reviewed-insights', [])
  const insights = mockInsights.filter((i) => i.organizationId === app.organizationId),
    risk = app.contacts.filter((c) => c.risk)
  return (
    <>
      <PageHeading
        eyebrow="CLAREZA PARA DECIDIR"
        title="Assistente de análise"
        description="Sinais do seu negócio, traduzidos em próximos passos."
        action={<Badge icon={false}>Sugestões demonstrativas</Badge>}
      />
      <section className="assistant-hero">
        <div className="assistant-symbol">
          <Sparkles size={32} />
        </div>
        <div>
          <p className="eyebrow">SEU RESUMO DA SEMANA</p>
          <h2>
            Há boas oportunidades
            <br />
            nas conversas que ficaram abertas.
          </h2>
          <p>
            {risk.length} contatos precisam de retorno. Comece pelas propostas e pelos contatos com
            maior intenção.
          </p>
        </div>
        <div className="assistant-hero-note">
          <ShieldCheck size={25} />
          <strong>Sua equipe decide.</strong>
          <p>Revise cada sugestão antes de agir.</p>
        </div>
      </section>
      <div className="insights-grid">
        {insights.map((insight, i) => {
          const Icon = [MessageSquare, MousePointer2, Target][i % 3]
          return (
            <Card className="insight-card" key={insight.id}>
              <div className="row-between">
                <span className="square-icon">
                  <Icon size={21} />
                </span>
                <Badge tone={i === 0 ? 'orange' : 'neutral'}>
                  {i === 0 ? 'Atenção' : insight.type}
                </Badge>
              </div>
              <h2>{insight.title}</h2>
              <p>{insight.description}</p>
              <button className="why-link" onClick={() => setExplanation(insight)}>
                <Info size={14} />
                Por que esta recomendação?
              </button>
              <div className="insight-card-footer">
                <Button onClick={() => setReview(insight)}>
                  Revisar sugestão <ArrowUpRight size={15} />
                </Button>
                {reviewed.includes(insight.id) && <Badge tone="green">Revisada</Badge>}
              </div>
            </Card>
          )
        })}
      </div>
      <div className="two-column">
        <Card>
          <SectionTitle
            title="Conversas para recuperar"
            description="Comece por quem já demonstrou interesse."
            action={
              <Link className="text-link" to="/funil">
                Ver funil <ArrowUpRight size={15} />
              </Link>
            }
          />
          {risk.slice(0, 4).map((c) => (
            <Link className="recover-contact" key={c.id} to={'/contatos?contato=' + c.id}>
              <Avatar name={c.name} />
              <div>
                <strong>{c.name}</strong>
                <small>
                  {c.company} · {c.stage}
                </small>
              </div>
              <span>{c.score} pontos</span>
              <ArrowUpRight size={16} />
            </Link>
          ))}
          {!risk.length && (
            <p className="card-padding">Nenhum contato sinalizado em risco nesta organização.</p>
          )}
        </Card>
        <Card>
          <SectionTitle
            title="Histórico de insights"
            description="O que já passou pela sua revisão."
          />
          <div className="activity-list">
            {reviewed
              .filter((id) => id.startsWith(app.organizationId))
              .map((id) => (
                <div key={id}>
                  <span className="activity-symbol">
                    <Check size={16} />
                  </span>
                  <div>
                    <strong>{insights.find((i) => i.id === id)?.title}</strong>
                    <small>Revisado nesta sessão</small>
                  </div>
                </div>
              ))}
            <div>
              <span className="activity-symbol">
                <Clock size={16} />
              </span>
              <div>
                <strong>Campanha de reativação analisada</strong>
                <small>24 de setembro · dado ilustrativo</small>
              </div>
            </div>
            <div>
              <span className="activity-symbol">
                <Clock size={16} />
              </span>
              <div>
                <strong>Tempo de resposta em atenção</strong>
                <small>21 de setembro · dado ilustrativo</small>
              </div>
            </div>
          </div>
          <div className="assistant-review-note">
            <ShieldCheck size={18} />
            <p>
              O assistente não envia campanhas, altera contatos ou executa automações por conta
              própria.
            </p>
          </div>
        </Card>
      </div>
      <DemoNotice>
        Recomendações baseadas em regras locais e cenários fictícios. Nenhum modelo de IA ou serviço
        externo é chamado.
      </DemoNotice>
      <Modal
        open={!!explanation}
        onOpenChange={(v) => {
          if (!v) setExplanation(null)
        }}
        title="Por que esta recomendação apareceu?"
      >
        {explanation && (
          <div className="form-stack">
            <Badge icon={false}>{explanation.type}</Badge>
            <h3>{explanation.title}</h3>
            <p>{explanation.reason}</p>
            <div className="note">
              <Info size={18} />
              <p>
                O sinal é um apoio à leitura da equipe. O contexto da conversa deve orientar a
                decisão.
              </p>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={!!review}
        onOpenChange={(v) => {
          if (!v) setReview(null)
        }}
        title="Revise o próximo passo"
      >
        {review && (
          <div className="form-stack">
            <h3>{review.title}</h3>
            <p>{review.description}</p>
            <div className="review-checklist">
              <p>
                <Check size={16} />
                Confira o contexto e a última conversa.
              </p>
              <p>
                <Check size={16} />
                Combine a abordagem com o responsável.
              </p>
              <p>
                <Check size={16} />
                Revise a ação antes de executá-la.
              </p>
            </div>
            <div className="modal-actions">
              <Button
                onClick={() => {
                  setReviewed((ids) => [...new Set([...ids, review.id])])
                  setReview(null)
                }}
              >
                Marcar como revisada
              </Button>
              <Button variant="primary" asChild>
                <Link to={review.route}>
                  Abrir {review.type.toLowerCase()} <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
