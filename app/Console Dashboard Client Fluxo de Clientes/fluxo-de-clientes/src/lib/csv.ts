import { z } from 'zod'
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe o nome completo.'),
  company: z.string().trim().min(2, 'Informe a empresa.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  phone: z.string().trim().min(8, 'Informe um telefone com ao menos 8 caracteres.'),
  origin: z.string().min(1),
  owner: z.string().min(1),
})
export type ContactFormValues = z.infer<typeof contactSchema>
export function parseCsv(text: string): { rows: ContactFormValues[]; errors: string[] } {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  const source = text.replace(/^\uFEFF/, '')
  const delimiter = source.split(/\r?\n/)[0]?.includes(';') ? ';' : ','
  for (let i = 0; i < source.length; i++) {
    const ch = source[i]
    if (ch === '"') {
      if (quoted && source[i + 1] === '"') {
        field += '"'
        i++
      } else quoted = !quoted
    } else if (ch === delimiter && !quoted) {
      row.push(field.trim())
      field = ''
    } else if (ch === '\n' && !quoted) {
      row.push(field.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []
      field = ''
    } else if (ch !== '\r') field += ch
  }
  row.push(field.trim())
  if (row.some(Boolean)) rows.push(row)
  if (quoted) return { rows: [], errors: ['Há aspas não fechadas no arquivo.'] }
  const headers = rows.shift()?.map((h) => h.toLowerCase()) ?? []
  const required = ['nome', 'empresa', 'email', 'telefone']
  if (required.some((h) => !headers.includes(h)))
    return { rows: [], errors: ['Use as colunas nome, empresa, email e telefone.'] }
  const valid: ContactFormValues[] = []
  const errors: string[] = []
  rows.slice(0, 500).forEach((r, i) => {
    const get = (h: string) => r[headers.indexOf(h)] ?? ''
    const parsed = contactSchema.safeParse({
      name: get('nome'),
      company: get('empresa'),
      email: get('email'),
      phone: get('telefone'),
      origin: get('origem') || 'Importação CSV',
      owner: 'Marina Costa',
    })
    if (parsed.success) valid.push(parsed.data)
    else
      errors.push('Linha ' + (i + 2) + ': ' + parsed.error.issues.map((e) => e.message).join(' '))
  })
  if (rows.length > 500) errors.push('Limite de 500 linhas por importação. Divida o arquivo.')
  if (!rows.length) errors.push('O arquivo não contém contatos.')
  return { rows: valid, errors }
}
