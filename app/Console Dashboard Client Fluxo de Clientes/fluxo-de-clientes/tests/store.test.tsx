import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'
import { AppProvider, useApp, useOrgData } from '../src/app/store'
const wrapper = AppProvider
beforeEach(() => {
  cleanup()
  localStorage.clear()
})
describe('Operações da sessão', () => {
  it('cria contato na organização atual e mantém as outras intactas', () => {
    const { result } = renderHook(() => useOrgData(), { wrapper })
    const before = result.current.contacts.length
    act(() => {
      result.current.addContact({
        name: 'Pessoa Exemplo',
        company: 'Empresa Teste',
        email: 'pessoa@teste.example',
        phone: '0000000000',
        origin: 'Site',
        owner: 'Marina Costa',
      })
    })
    expect(result.current.contacts).toHaveLength(before + 1)
    act(() => result.current.setOrganization('org-2'))
    expect(result.current.contacts.some((c) => c.email === 'pessoa@teste.example')).toBe(false)
  })
  it('movimenta estágio mantendo estado coerente', () => {
    const { result } = renderHook(() => useOrgData(), { wrapper })
    const id = result.current.contacts[0].id
    act(() => result.current.updateContact(id, { stage: 'Perdido' }))
    expect(result.current.contacts.find((c) => c.id === id)?.status).toBe('Inativo')
    act(() => result.current.updateContact(id, { stage: 'Cliente' }))
    expect(result.current.contacts.find((c) => c.id === id)).toMatchObject({
      stage: 'Cliente',
      status: 'Ativo',
      risk: false,
    })
  })
  it('sincroniza o responsável do contato com suas conversas', () => {
    const { result } = renderHook(() => useOrgData(), { wrapper })
    const conversation = result.current.conversations[0]
    act(() => result.current.updateContact(conversation.contactId, { owner: 'Rafael Mendes' }))
    expect(result.current.conversations.find((c) => c.id === conversation.id)?.owner).toBe(
      'Rafael Mendes',
    )
    expect(result.current.contacts.find((c) => c.id === conversation.contactId)?.owner).toBe(
      'Rafael Mendes',
    )
  })
  it('bloqueia alterações no perfil de leitura', () => {
    const { result } = renderHook(() => useOrgData(), { wrapper })
    const c = result.current.contacts[0]
    act(() => result.current.setReadOnly(true))
    act(() => result.current.updateContact(c.id, { name: 'Alterado' }))
    expect(result.current.contacts[0].name).toBe(c.name)
  })
  it('não permite editar contato de outra organização', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    const c = result.current.contacts.find((c) => c.organizationId === 'org-2')!
    act(() => result.current.updateContact(c.id, { name: 'Alterado' }))
    expect(result.current.contacts.find((x) => x.id === c.id)?.name).toBe(c.name)
  })
  it('restaura operações e mantém preferência visual', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => result.current.toggleCompact())
    act(() => result.current.updateAutomation('org-1-au0', { active: false }))
    act(() => result.current.reset())
    expect(result.current.automations[0].active).toBe(true)
    expect(result.current.compact).toBe(true)
    expect(result.current.revision).toBe(1)
  })
  it('descarta rascunhos inválidos armazenados', () => {
    localStorage.setItem(
      'fc-drafts',
      JSON.stringify([{ id: '1', name: 'Inválido', organizationId: 'org-1', status: 'Rascunho' }]),
    )
    const { result } = renderHook(() => useOrgData(), { wrapper })
    expect(result.current.campaigns.some((c) => c.id === '1')).toBe(false)
  })
  it('sincroniza saúde da organização com seu domínio', () => {
    const { result } = renderHook(() => useOrgData(), { wrapper })
    act(() => result.current.setOrganization('org-2'))
    act(() =>
      result.current.setDomains((ds) =>
        ds.map((d) =>
          d.id === 'org-2-d1'
            ? { ...d, status: 'Verificado', spf: true, dkim: true, dmarc: true }
            : d,
        ),
      ),
    )
    expect(result.current.org.health).toBe('Saudável')
  })
})
