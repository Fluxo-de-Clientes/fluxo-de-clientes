import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Users,
  MessagesSquare,
  Filter,
  Send,
  Zap,
  ChartNoAxesCombined,
  Globe,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  Menu as MenuIcon,
  Check,
  CalendarDays,
  Plus,
  LifeBuoy,
} from 'lucide-react'
import { useApp, useOrgData } from '../../app/store'
import { Button } from '../ui/button'
import { Avatar, Badge, Modal, Select, Menu, Empty, SearchInput, Input } from '../ui/primitives'
const NewContact = lazy(() =>
  import('../contacts/ContactForms').then((m) => ({ default: m.NewContact })),
)
import type { Period } from '../../types'
const navigation = [
  { to: '/visao-geral', label: 'Visão geral', icon: LayoutDashboard },
  { to: '/clientes', label: 'Clientes', icon: Building2 },
  { to: '/contatos', label: 'Contatos', icon: Users },
  { to: '/atendimento', label: 'Atendimento', icon: MessagesSquare },
  { to: '/funil', label: 'Funil de clientes', icon: Filter },
  { to: '/campanhas', label: 'Campanhas', icon: Send },
  { to: '/automacoes', label: 'Automações', icon: Zap },
  { to: '/analises', label: 'Análises', icon: ChartNoAxesCombined },
  { to: '/dominios', label: 'Domínios', icon: Globe },
  { to: '/assistente', label: 'Assistente de análise', icon: Sparkles },
]
export function Shell() {
  const app = useApp()
  const data = useOrgData()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState(''),
    [notifications, setNotifications] = useState(false),
    [newContact, setNewContact] = useState(false),
    [help, setHelp] = useState(false),
    [range, setRange] = useState(false)
  const [dates, setDates] = useState(app.customRange)
  const mainRef = useRef<HTMLElement>(null)
  const priorRoute = useRef(location.pathname)
  const current =
    navigation.find((n) => location.pathname.startsWith(n.to))?.label ||
    (location.pathname === '/configuracoes' ? 'Configurações' : 'Página não encontrada')
  useEffect(() => {
    document.title = current + ' · Fluxo de Clientes'
    if (priorRoute.current !== location.pathname) {
      mainRef.current?.focus()
      priorRoute.current = location.pathname
    }
  }, [location.pathname, current])
  const go = (path: string) => {
    navigate(path)
    setMobile(false)
  }
  const sidebar = (
    <>
      <Link
        to="/visao-geral"
        className="brand"
        aria-label="Fluxo de Clientes, visão geral"
        onClick={() => setMobile(false)}
      >
        <img
          src={app.compact ? '/brand/simbolo-original.svg' : '/brand/logotipo-compacto-reverso.svg'}
          alt=""
          width={app.compact ? 38 : 180}
          height={app.compact ? 39 : 94}
        />
      </Link>
      <div className="sidebar-workspace">
        <span className="workspace-mark">A</span>
        <div>
          <strong>Seu espaço de trabalho</strong>
          <span>Plano {data.org.plan}</span>
        </div>
      </div>
      <div className="nav-label">ESPAÇO DE TRABALHO</div>
      <nav aria-label="Navegação principal">
        {navigation.map((n, i) => (
          <NavLink
            key={n.to}
            to={n.to}
            title={app.compact ? n.label : undefined}
            onClick={() => setMobile(false)}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <n.icon size={19} />
            <span>{n.label}</span>
            {i === 3 && (
              <small>{data.conversations.filter((c) => c.status !== 'Concluída').length}</small>
            )}
            {i === 9 && <span className="nav-ai">IA</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <Sparkles size={19} />
          <strong>Mais clareza. Próximos passos.</strong>
          <p>Transforme seus dados em boas conversas.</p>
          <Link to="/assistente" onClick={() => setMobile(false)}>
            Explorar insights <ArrowUpRight size={15} />
          </Link>
        </div>
        <NavLink
          to="/configuracoes"
          onClick={() => setMobile(false)}
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          <Settings size={19} />
          <span>Configurações</span>
        </NavLink>
        <button className="nav-item" onClick={() => setHelp(true)}>
          <LifeBuoy size={19} />
          <span>Ajuda e orientações</span>
        </button>
        <button className="collapse-sidebar nav-item" onClick={app.toggleCompact}>
          {app.compact ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          <span>Recolher menu</span>
        </button>
      </div>
    </>
  )
  return (
    <div className={'app-shell ' + (app.compact ? 'is-compact' : '')}>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <aside className="sidebar">{sidebar}</aside>
      <Modal open={mobile} onOpenChange={setMobile} title="Navegação" drawer>
        <div className="mobile-sidebar">{sidebar}</div>
      </Modal>
      <div className="app-main">
        <header className="topbar">
          <Button
            className="mobile-menu"
            variant="ghost"
            size="icon"
            aria-label="Abrir navegação"
            onClick={() => setMobile(true)}
          >
            <MenuIcon size={20} />
          </Button>
          <div className="topbar-title">
            {current}
            <span className="topbar-slash">/</span>
            <span className="topbar-subtitle">Seu espaço de trabalho</span>
          </div>
          <div className="topbar-actions">
            <button
              className="global-search"
              aria-label="Abrir busca global"
              onClick={() => setSearch(true)}
            >
              <Search size={18} />
              <span>Buscar no Fluxo</span>
              <kbd>⌕</kbd>
            </button>
            <div className="notification-wrap">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir notificações"
                onClick={() => setNotifications(true)}
              >
                <Bell size={19} />
              </Button>
              {app.notifications.some((n) => !n.read) && <i />}
            </div>
            <div className="topbar-divider" />
            <label className="org-select">
              <span className="sr-only">Organização atual</span>
              <Building2 size={17} />
              <select
                value={app.organizationId}
                onChange={(e) => app.setOrganization(e.target.value)}
              >
                {app.organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} />
            </label>
            <Menu
              label="Menu de perfil"
              trigger={<Avatar name="Marina Costa" small />}
              items={[
                { label: 'Marina Costa · Administradora', onSelect: () => go('/configuracoes') },
                { label: 'Minha organização', onSelect: () => go('/configuracoes') },
                {
                  label: 'Preferências e aparência',
                  onSelect: () => go('/configuracoes?secao=Aparência'),
                },
              ]}
            />
          </div>
        </header>
        <main ref={mainRef} id="main-content" tabIndex={-1}>
          <div className="page-toolbar">
            <div className="toolbar-context">
              <span className="status-dot" />
              Seu negócio, em movimento{' '}
              <Badge tone="neutral" icon={false}>
                Demonstração
              </Badge>
            </div>
            <div className="toolbar-actions">
              <CalendarDays size={16} />
              <Select
                label="Período"
                value={app.period}
                onChange={(e) => {
                  const value = e.target.value as Period
                  if (value === 'custom') {
                    setDates(app.customRange)
                    setRange(true)
                  } else app.setPeriod(value)
                }}
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="custom">Período personalizado</option>
              </Select>
              {app.period === 'custom' && (
                <Button size="sm" onClick={() => setRange(true)}>
                  Editar datas
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setNewContact(true)}
                disabled={app.readOnly}
              >
                <Plus size={16} />
                <span>Novo contato</span>
              </Button>
            </div>
          </div>
          {app.readOnly && (
            <div className="permission-banner">
              Perfil de leitura. Alterações estão desativadas; gerencie o perfil em Configurações.
            </div>
          )}
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>
            Fluxo de Clientes <span>·</span> Marketing, atendimento e dados conectados.
          </span>
          <span>
            <span className="status-dot" /> Ambiente demonstrativo
          </span>
        </footer>
      </div>
      {newContact && (
        <Suspense fallback={null}>
          <NewContact key={app.organizationId} open={newContact} onOpenChange={setNewContact} />
        </Suspense>
      )}
      <Modal
        open={search}
        onOpenChange={setSearch}
        title="Encontre seu próximo passo"
        description="Busque contatos e seções na organização atual."
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          label="Busca global"
          placeholder="Nome, empresa ou seção..."
        />
        <div className="search-results">
          {navigation
            .filter((n) => n.label.toLowerCase().includes(query.toLowerCase()))
            .map((n) => (
              <button
                key={n.to}
                onClick={() => {
                  go(n.to)
                  setSearch(false)
                }}
              >
                <n.icon size={18} />
                {n.label}
                <ArrowUpRight size={16} />
              </button>
            ))}
          {data.contacts
            .filter((c) =>
              (c.name + ' ' + c.company + ' ' + c.email)
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .slice(0, 5)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  go('/contatos?contato=' + c.id)
                  setSearch(false)
                }}
              >
                <Avatar name={c.name} small />
                <span>
                  {c.name}
                  <small>{c.company}</small>
                </span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          {query &&
            !navigation.some((n) => n.label.toLowerCase().includes(query.toLowerCase())) &&
            !data.contacts.some((c) =>
              (c.name + ' ' + c.company + ' ' + c.email)
                .toLowerCase()
                .includes(query.toLowerCase()),
            ) && <Empty />}
        </div>
      </Modal>
      <Modal
        open={notifications}
        onOpenChange={setNotifications}
        title="Notificações"
        drawer
        description="Acompanhe o que precisa da sua atenção."
      >
        <div className="notification-list">
          {app.notifications.map((n) => (
            <div className={n.read ? 'notification-item read' : 'notification-item'} key={n.id}>
              <Bell size={18} />
              <div>
                <strong>{n.title}</strong>
                <p>{n.description}</p>
                <div className="row-actions">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      app.markRead(n.id)
                      go(n.route)
                      setNotifications(false)
                    }}
                  >
                    Ver detalhes <ArrowUpRight size={14} />
                  </Button>
                  {!n.read && (
                    <Button size="sm" variant="ghost" onClick={() => app.markRead(n.id)}>
                      <Check size={14} />
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal open={range} onOpenChange={setRange} title="Escolha o período">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            app.setCustomRange(dates)
            app.setPeriod('custom')
            setRange(false)
          }}
          className="form-stack"
        >
          <Input
            label="Data inicial"
            type="date"
            required
            value={dates.from}
            max={dates.to}
            onChange={(e) => setDates({ ...dates, from: e.target.value })}
          />
          <Input
            label="Data final"
            type="date"
            required
            min={dates.from}
            value={dates.to}
            onChange={(e) => setDates({ ...dates, to: e.target.value })}
          />
          <Button type="submit" variant="primary">
            Aplicar período
          </Button>
        </form>
      </Modal>
      <Modal open={help} onOpenChange={setHelp} title="Seu guia no Fluxo">
        <div className="form-stack">
          <p>
            Comece criando um contato. Abra seu histórico, defina um responsável e mova a
            oportunidade no funil.
          </p>
          <p>
            No atendimento, respostas e tarefas ficam nesta sessão. Campanhas e automações são
            demonstrações: nenhuma mensagem é enviada.
          </p>
          <Button
            onClick={() => {
              go('/assistente')
              setHelp(false)
            }}
          >
            Explorar recomendações <ArrowUpRight size={16} />
          </Button>
        </div>
      </Modal>
    </div>
  )
}
