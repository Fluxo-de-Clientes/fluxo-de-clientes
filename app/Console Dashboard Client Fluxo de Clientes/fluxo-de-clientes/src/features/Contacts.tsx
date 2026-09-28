import { NewContact, ContactDetail } from '../components/contacts/ContactForms'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { Plus, Upload, SlidersHorizontal, ArrowUpDown, Check, Download } from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../app/store'
import { owners } from '../data/mock'
import { parseCsv } from '../lib/csv'
import { relative } from '../lib/utils'
import { stages, type Contact } from '../types'
import { Button } from '../components/ui/button'
import {
  Card,
  PageHeading,
  SearchInput,
  Select,
  Avatar,
  Status,
  Badge,
  Modal,
  Empty,
  DemoNotice,
} from '../components/ui/primitives'
export default function Contacts() {
  const app = useOrgData()
  const csvRequest = useRef(0)
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(''),
    [origin, setOrigin] = useState('Todas'),
    [stage, setStage] = useState('Todas'),
    [owner, setOwner] = useState('Todos'),
    [tag, setTag] = useState('Todas'),
    [activity, setActivity] = useState('Todas'),
    [filters, setFilters] = useState(false),
    [newContact, setNewContact] = useState(false),
    [importOpen, setImport] = useState(false)
  const [selected, setSelected] = useState<Record<string, boolean>>({}),
    [sorting, setSorting] = useState<SortingState>([]),
    [page, setPage] = useState(0),
    [csv, setCsv] = useState<ReturnType<typeof parseCsv> | null>(null),
    [reading, setReading] = useState(false)
  const data = useMemo(
    () =>
      app.contacts.filter(
        (c) =>
          (c.name + ' ' + c.company + ' ' + c.email + ' ' + c.phone + ' ' + c.tags.join(' '))
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (origin === 'Todas' || c.origin === origin) &&
          (stage === 'Todas' || c.stage === stage) &&
          (owner === 'Todos' || c.owner === owner) &&
          (tag === 'Todas' || c.tags.includes(tag)) &&
          (activity === 'Todas' || (activity === 'Sem retorno' ? c.risk : !c.risk)),
      ),
    [app.contacts, query, origin, stage, owner, tag, activity],
  )
  useEffect(() => {
    setPage(0)
    setSelected({})
  }, [query, origin, stage, owner, tag, activity, app.organizationId])
  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            aria-label="Selecionar todos os contatos filtrados"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            aria-label={'Selecionar ' + row.original.name}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Contato',
        cell: ({ row }) => (
          <button className="person-cell" onClick={() => setParams({ contato: row.original.id })}>
            <Avatar name={row.original.name} />
            <span>
              <strong>{row.original.name}</strong>
              <small>{row.original.email}</small>
            </span>
          </button>
        ),
      },
      { accessorKey: 'company', header: 'Empresa' },
      {
        accessorKey: 'origin',
        header: 'Origem',
        cell: ({ getValue }) => <span className="origin-label">{getValue<string>()}</span>,
      },
      {
        accessorKey: 'stage',
        header: 'Etapa',
        cell: ({ getValue }) => <Status value={getValue<string>()} />,
      },
      {
        accessorKey: 'owner',
        header: 'Responsável',
        cell: ({ getValue }) => (
          <div className="owner-cell">
            <Avatar name={getValue<string>()} small />
            {getValue<string>().split(' ')[0]}
          </div>
        ),
      },
      {
        accessorKey: 'lastActivity',
        header: 'Última atividade',
        cell: ({ getValue }) => <span className="text-muted">{relative(getValue<string>())}</span>,
      },
      {
        accessorKey: 'score',
        header: 'Pontuação',
        cell: ({ getValue }) => (
          <span className="score">
            {getValue<number>()}
            <span>/100</span>
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <Status value={getValue<string>()} />,
      },
    ],
    [setParams],
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { rowSelection: selected, sorting },
    onRowSelectionChange: setSelected,
    onSortingChange: setSorting,
    getRowId: (r) => r.id,
    enableRowSelection: true,
  })
  const rows = table.getRowModel().rows.slice(page * 10, page * 10 + 10)
  const selection = Object.keys(selected).filter(
    (k) => selected[k] && app.contacts.some((c) => c.id === k),
  )
  const clear = () => {
    setQuery('')
    setOrigin('Todas')
    setStage('Todas')
    setOwner('Todos')
    setTag('Todas')
    setActivity('Todas')
  }
  const filterFields = (
    <div className="filter-grid">
      <Select label="Origem" value={origin} onChange={(e) => setOrigin(e.target.value)}>
        {['Todas', 'Site', 'Instagram', 'WhatsApp', 'Indicação', 'Importação CSV'].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Select label="Etapa" value={stage} onChange={(e) => setStage(e.target.value)}>
        {['Todas', ...stages].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Select label="Responsável" value={owner} onChange={(e) => setOwner(e.target.value)}>
        {['Todos', ...owners].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Select label="Tag" value={tag} onChange={(e) => setTag(e.target.value)}>
        {['Todas', 'Alta intenção', 'Reativação', 'Novo contato', 'Design'].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Select
        label="Última interação"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      >
        {['Todas', 'Sem retorno', 'Em dia'].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Button variant="ghost" onClick={clear}>
        Limpar filtros
      </Button>
    </div>
  )
  return (
    <>
      <PageHeading
        eyebrow="RELAÇÕES QUE CRESCEM"
        title="Contatos"
        description="Cada contato tem uma história. Acompanhe o próximo capítulo."
        action={
          <>
            <Button onClick={() => setImport(true)} disabled={app.readOnly}>
              <Upload size={16} />
              Importar CSV
            </Button>
            <Button variant="dark" onClick={() => setNewContact(true)} disabled={app.readOnly}>
              <Plus size={16} />
              Novo contato
            </Button>
          </>
        }
      />
      <div className="summary-strip">
        <span>
          <strong>{app.contacts.length}</strong> contatos
        </span>
        <span>
          <strong>{app.contacts.filter((c) => c.stage === 'Qualificação').length}</strong>{' '}
          qualificados
        </span>
        <span>
          <strong>{app.contacts.filter((c) => c.risk).length}</strong> precisam de atenção
        </span>
      </div>
      <Card>
        <div className="table-toolbar">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Buscar contatos"
            placeholder="Nome, empresa, e-mail ou tag..."
          />
          <Button onClick={() => setFilters(true)}>
            <SlidersHorizontal size={16} />
            Filtros{' '}
            <Badge icon={false}>
              {
                [
                  origin !== 'Todas',
                  stage !== 'Todas',
                  owner !== 'Todos',
                  tag !== 'Todas',
                  activity !== 'Todas',
                ].filter(Boolean).length
              }
            </Badge>
          </Button>
        </div>
        {selection.length > 0 && (
          <div className="selection-toolbar">
            <strong>{selection.length} selecionados</strong>
            <Select
              label="Atribuir selecionados"
              value=""
              disabled={app.readOnly}
              onChange={(e) => {
                selection.forEach((id) => app.updateContact(id, { owner: e.target.value }))
                toast.success('Responsável atualizado para a seleção.')
                setSelected({})
              }}
            >
              <option value="" disabled>
                Escolher responsável
              </option>
              {owners.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
            <Button size="sm" onClick={() => setSelected({})}>
              Limpar seleção
            </Button>
          </div>
        )}
        <div
          className="table-scroll"
          tabIndex={0}
          aria-label="Tabela de contatos, role para ver todas as colunas"
        >
          <table>
            <thead>
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((h) => (
                    <th key={h.id}>
                      {h.column.getCanSort() ? (
                        <button className="table-sort" onClick={h.column.getToggleSortingHandler()}>
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          <ArrowUpDown size={12} />
                        </button>
                      ) : (
                        flexRender(h.column.columnDef.header, h.getContext())
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={row.getIsSelected() ? 'selected-row' : ''}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && <Empty action={<Button onClick={clear}>Limpar filtros</Button>} />}
        <div className="table-footer">
          <span>
            {data.length ? Math.min(page * 10 + 1, data.length) : 0}–
            {Math.min((page + 1) * 10, data.length)} de {data.length} contatos
          </span>
          <div>
            <Button size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * 10 >= data.length}
            >
              Próxima
            </Button>
          </div>
        </div>
      </Card>
      <DemoNotice />
      <Modal open={filters} onOpenChange={setFilters} title="Refine seus contatos">
        {filterFields}
        <div className="modal-actions">
          <Button variant="primary" onClick={() => setFilters(false)}>
            Ver {data.length} contatos
          </Button>
        </div>
      </Modal>
      <NewContact open={newContact} onOpenChange={setNewContact} />
      <ContactDetail
        key={params.get('contato')}
        contactId={params.get('contato')}
        onClose={() => setParams({})}
      />
      <Modal
        open={importOpen}
        onOpenChange={setImport}
        title="Importar contatos"
        description="Prévia local de CSV. Use somente informações fictícias."
        wide
      >
        <div className="form-stack">
          <p>
            Colunas obrigatórias: <strong>nome, empresa, email, telefone</strong>. A coluna origem é
            opcional. Até 500 contatos e 1 MB por arquivo.
          </p>
          <a className="btn btn-secondary" href="/modelo-contatos.csv" download>
            <Download size={16} />
            Baixar modelo CSV
          </a>
          <label className="upload-zone">
            <Upload size={24} />
            <span>Escolher arquivo CSV</span>
            <input
              type="file"
              accept=".csv,text/csv"
              aria-label="Selecionar arquivo CSV"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                if (file.size > 1024 * 1024) {
                  setCsv({ rows: [], errors: ['O arquivo deve ter no máximo 1 MB.'] })
                  return
                }
                const request = ++csvRequest.current
                setCsv(null)
                setReading(true)
                try {
                  const parsed = parseCsv(await file.text())
                  if (request === csvRequest.current) setCsv(parsed)
                } catch {
                  if (request === csvRequest.current)
                    setCsv({
                      rows: [],
                      errors: ['Não foi possível ler o arquivo. Tente selecionar novamente.'],
                    })
                } finally {
                  if (request === csvRequest.current) setReading(false)
                }
              }}
            />
          </label>
          {reading && <div className="skeleton sk-card" role="status" aria-label="Lendo CSV" />}
          {csv && (
            <>
              <Badge tone={csv.errors.length ? 'orange' : 'green'}>
                {csv.rows.length} linhas válidas
              </Badge>
              {csv.errors.length > 0 && (
                <div className="error-box" role="alert">
                  {csv.errors.slice(0, 5).map((e) => (
                    <p key={e}>{e}</p>
                  ))}
                  <p>Corrija o arquivo para importar todas as linhas.</p>
                </div>
              )}
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Empresa</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csv.rows.slice(0, 5).map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.company}</td>
                        <td>{r.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="modal-actions">
            <Button onClick={() => setImport(false)}>Cancelar</Button>
            <Button
              variant="primary"
              disabled={reading || !csv?.rows.length || !!csv.errors.length || app.readOnly}
              onClick={() => {
                if (!csv) return
                const seen = new Set(app.contacts.map((c) => c.email.toLowerCase()))
                let count = 0
                csv.rows.forEach((r) => {
                  if (!seen.has(r.email.toLowerCase())) {
                    app.addContact(r)
                    seen.add(r.email.toLowerCase())
                    count++
                  }
                })
                toast.success(
                  count +
                    ' contatos importados. ' +
                    (csv.rows.length - count) +
                    ' duplicados ignorados.',
                )
                setImport(false)
                setCsv(null)
              }}
            >
              <Check size={16} />
              Importar contatos
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
