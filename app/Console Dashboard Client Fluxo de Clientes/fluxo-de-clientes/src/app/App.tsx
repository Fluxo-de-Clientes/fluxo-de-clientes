import { Component, lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, Link, useLocation } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, RotateCcw } from 'lucide-react'
import { Toaster } from 'sonner'
import { AppProvider, useApp } from './store'
import { Shell } from '../components/layout/Shell'
import { Skeleton, Empty } from '../components/ui/primitives'
import { Button } from '../components/ui/button'
const Overview = lazy(() => import('../features/Overview'))
const Contacts = lazy(() => import('../features/Contacts'))
const Inbox = lazy(() => import('../features/Inbox'))
const Pipeline = lazy(() => import('../features/Pipeline'))
const Campaigns = lazy(() => import('../features/Campaigns'))
const NewCampaign = lazy(() =>
  import('../features/Campaigns').then((m) => ({ default: m.NewCampaign })),
)
const Automations = lazy(() => import('../features/Automations'))
const Organizations = lazy(() => import('../features/Organizations'))
const Analytics = lazy(() => import('../features/Analytics'))
const Domains = lazy(() => import('../features/Domains'))
const Assistant = lazy(() => import('../features/Assistant'))
const Settings = lazy(() => import('../features/Settings'))
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    return this.state.error ? (
      <div className="error-page" role="alert">
        <AlertTriangle size={36} />
        <h1>Uma pausa inesperada no fluxo.</h1>
        <p>Seus rascunhos salvos continuam no navegador. Recarregue para tentar novamente.</p>
        <Button onClick={() => window.location.reload()}>
          <RotateCcw size={16} />
          Recarregar aplicação
        </Button>
      </div>
    ) : (
      this.props.children
    )
  }
}
function RouteBody({ children }: { children: ReactNode }) {
  const app = useApp(),
    location = useLocation()
  return (
    <ErrorBoundary key={app.organizationId + '-' + app.revision + '-' + location.pathname}>
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
const wrap = (children: ReactNode) => <RouteBody>{children}</RouteBody>
function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found-number">404</span>
      <Empty
        title="Este caminho saiu do fluxo."
        description="A página que você procura não está aqui. Vamos voltar a um caminho conhecido?"
        action={
          <Button variant="primary" asChild>
            <Link to="/visao-geral">
              <ArrowLeft size={16} />
              Voltar à visão geral
            </Link>
          </Button>
        }
      />
    </div>
  )
}
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route element={<Shell />}>
              <Route index element={<Navigate to="/visao-geral" replace />} />
              <Route path="visao-geral" element={wrap(<Overview />)} />
              <Route path="clientes" element={wrap(<Organizations />)} />
              <Route path="contatos" element={wrap(<Contacts />)} />
              <Route path="atendimento" element={wrap(<Inbox />)} />
              <Route path="funil" element={wrap(<Pipeline />)} />
              <Route path="campanhas" element={wrap(<Campaigns />)} />
              <Route path="campanhas/nova" element={wrap(<NewCampaign />)} />
              <Route path="automacoes" element={wrap(<Automations />)} />
              <Route path="analises" element={wrap(<Analytics />)} />
              <Route path="dominios" element={wrap(<Domains />)} />
              <Route path="assistente" element={wrap(<Assistant />)} />
              <Route path="configuracoes" element={wrap(<Settings />)} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{ className: 'fc-toast' }}
          />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
