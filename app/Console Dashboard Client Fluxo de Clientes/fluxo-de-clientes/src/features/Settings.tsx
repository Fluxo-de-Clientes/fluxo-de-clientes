import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Save,
  Plus,
  ShieldCheck,
  Plug,
  RotateCcw,
  UserRound,
  Trash2,
  AlertTriangle,
  Lock,
  Palette,
} from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import { useSessionState } from '../hooks/useSessionState'
import { owners } from '../data/mock'
import { safeRead, safeWrite, number } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SectionTitle,
  Input,
  Select,
  Switch,
  Avatar,
  Badge,
  Modal,
  Progress,
  DemoNotice,
  Empty,
  Skeleton,
} from '../components/ui/primitives'
const sections = [
  'Organização',
  'Equipe e permissões',
  'Notificações',
  'Campos personalizados',
  'Aparência',
  'Integrações',
  'Uso e limites',
  'Dados demonstrativos',
]
export default function Settings() {
  const app = useOrgData()
  const [params, setParams] = useSearchParams()
  const section = sections.includes(params.get('secao') || '')
    ? params.get('secao')!
    : 'Organização'
  const [orgForm, setOrgForm] = useState({ name: app.org.name, sector: app.org.sector }),
    [notices, setNotices] = useState(() =>
      safeRead<Record<string, boolean>>('fc-notices', {
        'Novas conversas': true,
        'Oportunidades em risco': true,
        'Resumo semanal': false,
        'Campanhas concluídas': true,
      }),
    ),
    [fields, setFields] = useSessionState<string[]>('fields-' + app.organizationId, [
      'Área de interesse',
      'Previsão de compra',
    ]),
    [newField, setNewField] = useState(''),
    [reset, setReset] = useState(false),
    [statePreview, setStatePreview] = useState('Normal'),
    [members, setMembers] = useSessionState(
      'members-' + app.organizationId,
      owners.map((name, i) => ({
        name,
        email: 'equipe' + i + '@aurora.example',
        role: i === 0 ? 'Administrador' : 'Operador',
      })),
    ),
    [invite, setInvite] = useState(false),
    [member, setMember] = useState({ name: '', email: '', role: 'Operador' })
  const choose = (s: string) => setParams({ secao: s })
  return (
    <>
      <PageHeading
        eyebrow="SEU ESPAÇO, DO SEU JEITO"
        title="Configurações"
        description="Ajuste sua organização e mantenha a equipe no mesmo fluxo."
      />
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Seções de configurações">
          {sections.map((s) => (
            <button key={s} className={section === s ? 'active' : ''} onClick={() => choose(s)}>
              {s}
            </button>
          ))}
        </nav>
        <div className="settings-content">
          {section === 'Organização' && (
            <Card>
              <SectionTitle
                title="Perfil da organização"
                description="Informações que identificam seu espaço de trabalho."
              />
              <form
                className="form-stack card-padding"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (orgForm.name.trim().length < 3 || !orgForm.sector.trim()) {
                    toast.error('Preencha nome e segmento com informações válidas.')
                    return
                  }
                  app.updateOrganization(app.organizationId, {
                    name: orgForm.name.trim(),
                    sector: orgForm.sector.trim(),
                  })
                  toast.success('Organização atualizada nesta sessão.')
                }}
              >
                <div className="org-profile">
                  <Avatar name={app.org.name} />
                  <div>
                    <h3>{app.org.name}</h3>
                    <p>Plano {app.org.plan}</p>
                  </div>
                </div>
                <Input
                  label="Nome da organização"
                  value={orgForm.name}
                  required
                  minLength={3}
                  onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                />
                <Input
                  label="Segmento"
                  value={orgForm.sector}
                  required
                  onChange={(e) => setOrgForm({ ...orgForm, sector: e.target.value })}
                />
                <Input label="Domínio demonstrativo" value={app.org.domain} readOnly />
                <Button type="submit" variant="primary" disabled={app.readOnly}>
                  <Save size={16} />
                  Salvar alterações
                </Button>
              </form>
            </Card>
          )}
          {section === 'Equipe e permissões' && (
            <>
              <Card>
                <SectionTitle
                  title="Pessoas no mesmo fluxo"
                  action={
                    <Button size="sm" onClick={() => setInvite(true)} disabled={app.readOnly}>
                      <Plus size={15} />
                      Adicionar membro demo
                    </Button>
                  }
                />
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Pessoa</th>
                        <th>Função visual</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m, i) => (
                        <tr key={m.email}>
                          <td>
                            <div className="person-cell">
                              <Avatar name={m.name} />
                              <span>
                                <strong>{m.name}</strong>
                                <small>{m.email}</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <Select
                              label={'Função de ' + m.name}
                              value={m.role}
                              disabled={app.readOnly}
                              onChange={(e) => {
                                setMembers((ms) =>
                                  ms.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)),
                                )
                                toast.success('Função visual atualizada.')
                              }}
                            >
                              {['Administrador', 'Operador', 'Leitura'].map((r) => (
                                <option key={r}>{r}</option>
                              ))}
                            </Select>
                          </td>
                          <td>
                            <Badge tone="green">Ativo</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card className="card-padding">
                <h3>Simular permissão de leitura</h3>
                <p>Explore a experiência de um perfil sem acesso a alterações.</p>
                <Switch
                  label="Modo somente leitura"
                  checked={app.readOnly}
                  onCheckedChange={app.setReadOnly}
                />
                <DemoNotice>
                  As funções são demonstrativas. Permissões reais deverão ser verificadas pelo
                  backend.
                </DemoNotice>
              </Card>
            </>
          )}
          {section === 'Notificações' && (
            <Card>
              <SectionTitle
                title="Saiba o que importa"
                description="Suas preferências ficam salvas neste navegador."
              />
              <div className="card-padding form-stack">
                {Object.entries(notices).map(([key, value]) => (
                  <Switch
                    key={key}
                    label={key}
                    checked={value}
                    onCheckedChange={(v) => {
                      const next = { ...notices, [key]: v }
                      setNotices(next)
                      safeWrite('fc-notices', next)
                      toast.success('Preferência salva.')
                    }}
                  />
                ))}
              </div>
            </Card>
          )}
          {section === 'Campos personalizados' && (
            <Card>
              <SectionTitle
                title="Contexto do seu negócio"
                description="Defina campos que poderão complementar seus contatos."
              />
              <div className="card-padding form-stack">
                {fields.map((f) => (
                  <div className="custom-field" key={f}>
                    <span>
                      <UserRound size={16} />
                      {f}
                    </span>
                    <Badge icon={false}>Texto</Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={'Remover campo ' + f}
                      disabled={app.readOnly}
                      onClick={() => {
                        setFields((fs) => fs.filter((v) => v !== f))
                        toast.success('Campo removido.')
                      }}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                ))}
                <form
                  className="row-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newField.trim().length < 2) {
                      toast.error('Informe ao menos 2 caracteres para o campo.')
                      return
                    }
                    if (fields.includes(newField.trim())) {
                      toast.error('Já existe um campo com este nome.')
                      return
                    }
                    setFields((f) => [...f, newField.trim()])
                    setNewField('')
                    toast.success('Campo adicionado à configuração.')
                  }}
                >
                  <Input
                    label="Nome do novo campo"
                    required
                    minLength={2}
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                  />
                  <Button type="submit" disabled={app.readOnly}>
                    <Plus size={16} />
                    Adicionar
                  </Button>
                </form>
                <p className="field-help">
                  Nesta versão, o catálogo de campos fica na sessão. O preenchimento em contatos
                  será parte da evolução do produto.
                </p>
              </div>
            </Card>
          )}
          {section === 'Aparência' && (
            <Card>
              <SectionTitle
                title="Uma experiência confortável"
                description="A identidade Fluxo de Clientes permanece consistente."
              />
              <div className="card-padding form-stack">
                <div className="appearance-sample">
                  <div />
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="row-between">
                  <span>
                    <Palette size={16} />
                    Tema claro e quente
                  </span>
                  <Badge tone="green">Selecionado</Badge>
                </div>
                <Switch
                  label="Navegação compacta no desktop"
                  checked={app.compact}
                  onCheckedChange={app.toggleCompact}
                />
                <p className="field-help">
                  A interface respeita a preferência de redução de movimento do seu dispositivo.
                </p>
              </div>
            </Card>
          )}
          {section === 'Integrações' && (
            <>
              <Card>
                <SectionTitle
                  title="Caminhos para o futuro"
                  description="A experiência está preparada para uma próxima etapa."
                />
                <div className="integration-list">
                  {[
                    ['Contatos e dados', 'Sincronização de clientes e informações.'],
                    ['Envio de e-mail', 'Campanhas e entregabilidade.'],
                    ['Atendimento', 'Conversas e canais da equipe.'],
                    ['Assistente de análise', 'Sugestões com contexto do negócio.'],
                  ].map(([title, desc]) => (
                    <div key={title}>
                      <span className="square-icon">
                        <Plug size={19} />
                      </span>
                      <div>
                        <strong>{title}</strong>
                        <p>{desc}</p>
                      </div>
                      <Badge icon={false}>Preparado para conectar</Badge>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="note">
                <ShieldCheck size={20} />
                <p>
                  A configuração segura será feita no ambiente de servidor. Este console não
                  solicita nem armazena chaves de serviços.
                </p>
              </div>
            </>
          )}
          {section === 'Uso e limites' && (
            <Card>
              <SectionTitle
                title="Espaço para o próximo passo"
                description={'Plano ' + app.org.plan + ' · limites demonstrativos'}
              />
              <div className="card-padding form-stack">
                {[
                  { label: 'Contatos', used: app.contacts.length, limit: app.org.limit },
                  { label: 'Campanhas', used: app.campaigns.length, limit: 20 },
                  {
                    label: 'Execuções de automação',
                    used: app.automations.reduce((s, a) => s + a.runs, 0),
                    limit: 1000,
                  },
                  { label: 'Créditos de IA', used: 84, limit: 500 },
                  { label: 'Domínios', used: app.domains.length, limit: 5 },
                ].map((u) => (
                  <div className="usage-detail" key={u.label}>
                    <div>
                      <strong>{u.label}</strong>
                      <span>
                        {number(u.used)} / {number(u.limit)}
                      </span>
                    </div>
                    <Progress value={(u.used / u.limit) * 100} label={u.label} />
                  </div>
                ))}
              </div>
            </Card>
          )}
          {section === 'Dados demonstrativos' && (
            <>
              <Card>
                <SectionTitle
                  title="Um ambiente para explorar"
                  description="Todos os contatos, empresas, mensagens e indicadores são fictícios."
                />
                <div className="card-padding form-stack">
                  <p>
                    Alterações operacionais ficam na memória da sessão. Apenas preferências visuais
                    e rascunhos de campanha são mantidos no navegador.
                  </p>
                  <Select
                    label="Prévia de estados da interface"
                    value={statePreview}
                    onChange={(e) => setStatePreview(e.target.value)}
                  >
                    {[
                      'Normal',
                      'Carregando',
                      'Vazio',
                      'Erro',
                      'Sem permissão',
                      'Sucesso',
                      'Atenção',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                  {statePreview === 'Carregando' ? (
                    <Skeleton />
                  ) : statePreview === 'Vazio' ? (
                    <Empty
                      title="Tudo pronto para o primeiro contato"
                      description="Cadastre um contato para dar início ao seu fluxo."
                    />
                  ) : statePreview === 'Erro' ? (
                    <div className="error-box" role="alert">
                      <AlertTriangle size={20} />
                      <h3>Não foi possível carregar esta seção.</h3>
                      <p>Nenhum dado foi alterado. Tente novamente.</p>
                      <Button onClick={() => setStatePreview('Normal')}>Tentar novamente</Button>
                    </div>
                  ) : statePreview === 'Sem permissão' ? (
                    <div className="permission-banner">
                      <Lock size={18} />
                      Seu perfil não pode alterar esta seção. Solicite acesso ao administrador.
                    </div>
                  ) : statePreview === 'Sucesso' ? (
                    <Badge tone="green">Alterações salvas com sucesso.</Badge>
                  ) : statePreview === 'Atenção' ? (
                    <div className="stale-banner">
                      <ClockIcon />
                      Há conversas aguardando retorno. Revise os próximos passos.
                    </div>
                  ) : (
                    <Badge tone="green">Demonstração pronta para explorar</Badge>
                  )}
                  <hr />
                  <h3>Restaurar os dados da demonstração</h3>
                  <p>
                    Remove alterações desta sessão e os rascunhos locais de campanha. Suas
                    preferências visuais são preservadas.
                  </p>
                  <Button variant="danger" disabled={app.readOnly} onClick={() => setReset(true)}>
                    <RotateCcw size={16} />
                    Restaurar demonstração
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
      <Modal
        open={reset}
        onOpenChange={setReset}
        title="Restaurar a demonstração?"
        description="Os rascunhos de campanha e as alterações da sessão serão removidos. Esta ação não pode ser desfeita."
      >
        <div className="modal-actions">
          <Button onClick={() => setReset(false)}>Manter meus dados</Button>
          <Button
            variant="danger"
            onClick={() => {
              app.reset()
              setReset(false)
              setFields(['Área de interesse', 'Previsão de compra'])
              setStatePreview('Normal')
            }}
          >
            Sim, restaurar dados
          </Button>
        </div>
      </Modal>
      <Modal
        open={invite}
        onOpenChange={setInvite}
        title="Adicionar membro demonstrativo"
        description="Nenhum convite ou e-mail será enviado."
      >
        <form
          className="form-stack"
          onSubmit={(e) => {
            e.preventDefault()
            if (member.name.trim().length < 3) {
              toast.error('Informe um nome válido.')
              return
            }
            if (members.some((m) => m.email.toLowerCase() === member.email.trim().toLowerCase())) {
              toast.error('Este membro já está na equipe.')
              return
            }
            if (!member.email.endsWith('.example')) {
              toast.error('Use um endereço fictício terminado em .example.')
              return
            }
            setMembers((ms) => [
              ...ms,
              { ...member, name: member.name.trim(), email: member.email.trim().toLowerCase() },
            ])
            setMember({ name: '', email: '', role: 'Operador' })
            setInvite(false)
            toast.success('Membro adicionado à demonstração.')
          }}
        >
          <Input
            label="Nome"
            value={member.name}
            required
            minLength={3}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
          />
          <Input
            label="E-mail fictício"
            type="email"
            value={member.email}
            required
            onChange={(e) => setMember({ ...member, email: e.target.value })}
          />
          <Select
            label="Função"
            value={member.role}
            onChange={(e) => setMember({ ...member, role: e.target.value })}
          >
            {['Administrador', 'Operador', 'Leitura'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Select>
          <Button type="submit" variant="primary" disabled={app.readOnly}>
            <Plus size={16} />
            Adicionar membro
          </Button>
        </form>
      </Modal>
    </>
  )
}
function ClockIcon() {
  return <AlertTriangle size={16} />
}
