import { expect, test } from '@nuxt/test-utils/playwright'

test.beforeEach(async ({ goto }) => {
  await goto('/', { waitUntil: 'hydration' })
})

test('exibe a página completa e a identidade oficial', async ({ page }) => {
  await expect(page).toHaveTitle(/Fluxo de Clientes/)
  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Marketing,\s*atendimento e dados\s*no mesmo lugar\./,
  )
  await expect(
    page.getByRole('button', { name: 'Solicitar demonstração', exact: true }).first(),
  ).toBeVisible()
  for (const id of [
    'plataforma',
    'recursos',
    'funil',
    'inteligencia',
    'como-funciona',
    'solucoes',
    'perguntas',
    'demonstracao',
  ])
    await expect(page.locator(`#${id}`)).toBeVisible()
  await expect(page.getByRole('banner').getByAltText('Fluxo de Clientes')).toHaveAttribute(
    'src',
    '/brand/assinatura-horizontal-original.svg',
  )
  expect(
    await page
      .locator('img')
      .evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)),
  ).toBe(true)
})

test('abre e fecha o FAQ com teclado', async ({ page }) => {
  const question = page.getByRole('button', { name: 'A IA pode apoiar a minha equipe?' })
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#faq-answer-1')).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#faq-answer-1')).toBeHidden()
})

test('mantém navegação funcional em cada tamanho', async ({ page, isMobile }) => {
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Abrir menu', exact: true })
    await menu.click()
    await expect(page.getByRole('button', { name: 'Fechar menu', exact: true })).toHaveAttribute('aria-expanded', 'true')
    await page
      .getByRole('navigation', { name: 'Navegação mobile', exact: true })
      .getByRole('link', { name: 'Como funciona' })
      .click()
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
  } else {
    await page
      .getByRole('navigation', { name: 'Navegação principal', exact: true })
      .getByRole('link', { name: 'Como funciona' })
      .click()
  }
  await expect(page).toHaveURL(/#como-funciona$/)
})

test('valida o formulário e não simula envio', async ({ page }) => {
  const trigger = page.locator('#plataforma').getByRole('button', { name: 'Solicitar demonstração' })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Conferir informações' }).click()
  await expect(dialog.locator('#demo-name')).toHaveAttribute('aria-invalid', 'true')
  await dialog.getByLabel('Nome (obrigatório)').fill('Pessoa de Teste')
  await dialog.getByLabel('E-mail (obrigatório)').fill('pessoa@example.com')
  await dialog.getByRole('button', { name: 'Conferir informações' }).click()
  await expect(dialog.getByRole('status')).toContainText('Nenhuma solicitação foi enviada')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('permite explorar e mover um contato ilustrativo', async ({ page }) => {
  await page.getByRole('button', { name: 'Ver contato demonstrativo: Mariana Souza', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: 'Mariana Souza' })).toBeVisible()
  await dialog.getByLabel('Etapa do funil').selectOption('Propostas')
  await expect(dialog.getByRole('status')).toContainText('Etapa alterada para Propostas')
  await dialog.getByRole('button', { name: 'Voltar ao funil' }).click()
  await expect(
    page
      .getByRole('region', { name: 'Propostas', exact: true })
      .getByRole('button', { name: 'Ver contato demonstrativo: Mariana Souza' }),
  ).toBeVisible()
})

test('revê sugestões e cria tarefa apenas no exemplo', async ({ page }) => {
  await page.getByRole('button', { name: 'Revisar sugestões' }).click()
  await page.getByRole('button', { name: 'Criar tarefa no exemplo' }).first().click()
  await expect(page.getByRole('button', { name: 'Tarefa criada no exemplo' })).toBeDisabled()
  await expect(page.locator('#ai-suggestions').getByRole('status')).toContainText('1 tarefa(s)')
})

test('não apresenta overflow horizontal nos breakpoints', async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test('atualiza os dados demonstrativos pelo período', async ({ page }) => {
  await page.getByLabel('Período do exemplo').selectOption('7')
  await expect(page.locator('.dashboard-stat-value').first()).toHaveText('34')
  await page.getByLabel('Período do exemplo').selectOption('30')
  await expect(page.locator('.dashboard-stat-value').first()).toHaveText('128')
})
