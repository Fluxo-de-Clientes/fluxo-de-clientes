import { z } from 'zod'

export const demoRequestSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(120, 'O nome deve ter até 120 caracteres.'),
  company: z.string().trim().min(2, 'Informe o nome da empresa.').max(160, 'O nome da empresa deve ter até 160 caracteres.'),
  email: z.string().trim().pipe(z.email('Informe um e-mail válido.')).pipe(z.string().max(254, 'O e-mail deve ter até 254 caracteres.')),
  phone: z.string().trim().max(32, 'O telefone deve ter até 32 caracteres.').optional().default(''),
  interest: z.enum(['atendimento', 'funil', 'automacao', 'analise', 'ia', 'outro']).optional().default('outro'),
  details: z.string().trim().max(2000, 'Os detalhes devem ter até 2.000 caracteres.').optional().default(''),
  source: z.string().trim().max(120, 'A origem é inválida.').optional().default('site'),
  website: z.string().max(200).optional().default('')
})

export type DemoRequestInput = z.input<typeof demoRequestSchema>
