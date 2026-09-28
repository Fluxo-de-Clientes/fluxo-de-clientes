import { describe, it, expect, beforeEach } from 'vitest'
import { contactSchema, parseCsv } from '../src/lib/csv'
import { periodContacts, chartData } from '../src/lib/metrics'
import { mockContacts, organizations, mockCampaigns, mockConversations } from '../src/data/mock'
import { safeRead, safeWrite } from '../src/lib/utils'
describe('Importação CSV local', () => {
  it('aceita delimitador vírgula e campos entre aspas', () => {
    const result = parseCsv(
      'nome,empresa,email,telefone\n"Ana, Exemplo",Empresa,ana@empresa.example,00000000',
    )
    expect(result.errors).toEqual([])
    expect(result.rows[0].name).toBe('Ana, Exemplo')
  })
  it('aceita BOM, ponto e vírgula e quebra de linha citada', () => {
    const result = parseCsv(
      '\uFEFFnome;empresa;email;telefone\nAna Exemplo;"Empresa\nModelo";ana@empresa.example;00000000',
    )
    expect(result.errors).toEqual([])
    expect(result.rows[0].company).toContain('\n')
  })
  it('rejeita cabeçalho incompleto e e-mail inválido', () => {
    expect(parseCsv('nome,email\nAna,nao-email').errors.length).toBe(1)
    expect(
      parseCsv('nome,empresa,email,telefone\nAna,Empresa,invalido,00000000').rows,
    ).toHaveLength(0)
  })
  it('recusa aspas não fechadas e arquivos vazios', () => {
    expect(parseCsv('nome,empresa,email,telefone\n"Ana').errors[0]).toContain('aspas')
    expect(parseCsv('nome,empresa,email,telefone').errors.length).toBe(1)
  })
  it('não permite nomes só com espaços', () => {
    expect(
      contactSchema.safeParse({
        name: '   ',
        company: 'Loja',
        email: 'contato@loja.example',
        phone: '00000000',
        origin: 'Site',
        owner: 'Marina Costa',
      }).success,
    ).toBe(false)
  })
})
describe('Coerência da demonstração', () => {
  it('todas as conversas referem-se a contatos da mesma organização', () => {
    expect(
      mockConversations.every((c) =>
        mockContacts.some((p) => p.id === c.contactId && p.organizationId === c.organizationId),
      ),
    ).toBe(true)
  })
  it('todos os dados têm organização conhecida', () => {
    expect(
      [...mockContacts, ...mockCampaigns].every((c) =>
        organizations.some((o) => o.id === c.organizationId),
      ),
    ).toBe(true)
  })
  it('gráfico totaliza exatamente o intervalo filtrado', () => {
    const contacts = mockContacts.filter((c) => c.organizationId === 'org-1')
    for (const p of ['7', '30', '90', 'custom'] as const) {
      const range = { from: '2026-09-03', to: '2026-09-25' }
      expect(chartData(contacts, p, range).reduce((sum, r) => sum + r.atual, 0)).toBe(
        periodContacts(contacts, p, range).length,
      )
    }
  })
  it('períodos atual e anterior não se sobrepõem', () => {
    const range = { from: '2026-09-01', to: '2026-09-28' }
    const current = new Set(periodContacts(mockContacts, '7', range).map((c) => c.id))
    expect(periodContacts(mockContacts, '7', range, true).every((c) => !current.has(c.id))).toBe(
      true,
    )
  })
})
describe('Preferências locais resilientes', () => {
  beforeEach(() => localStorage.clear())
  it('recupera preferência válida', () => {
    expect(safeWrite('teste', { value: 2 })).toBe(true)
    expect(safeRead('teste', {})).toEqual({ value: 2 })
  })
  it('ignora JSON corrompido', () => {
    localStorage.setItem('teste', '{corrompido')
    expect(safeRead('teste', 'padrão')).toBe('padrão')
  })
})
