import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, within, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from '../src/app/store'
import Contacts from '../src/features/Contacts'
beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})
describe('Fluxo de contatos', () => {
  it('abre detalhes e move a oportunidade sem perder a resposta da tabela', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AppProvider>
          <Contacts />
        </AppProvider>
      </MemoryRouter>,
    )
    await user.click(
      screen.getByRole('button', { name: /Camila Duarte.*contato0@empresa0\.example/ }),
    )
    const dialog = await screen.findByRole('dialog', { name: 'Detalhes do contato' })
    await user.selectOptions(
      within(dialog).getByRole('combobox', { name: 'Etapa do funil' }),
      'Proposta',
    )
    await user.type(
      within(dialog).getByRole('textbox', { name: 'Adicionar nota' }),
      'Nota de revisão fictícia.',
    )
    await user.click(within(dialog).getByRole('button', { name: 'Salvar nota' }))
    expect(within(dialog).getByText('Nota de revisão fictícia.')).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Fechar painel' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(
      within(screen.getByRole('row', { name: /Selecionar Camila Duarte/ })).getByText('Proposta'),
    ).toBeInTheDocument()
  }, 20000)
  it('mostra vazio quando a busca não encontra e recupera a tabela ao limpar', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AppProvider>
          <Contacts />
        </AppProvider>
      </MemoryRouter>,
    )
    await user.type(screen.getByRole('textbox', { name: 'Buscar contatos' }), 'zzzz')
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
    expect(
      screen.getByRole('button', { name: /Camila Duarte.*contato0@empresa0\.example/ }),
    ).toBeInTheDocument()
  }, 20000)
})
