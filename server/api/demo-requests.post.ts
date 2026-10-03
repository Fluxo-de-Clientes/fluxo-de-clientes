import { createError, readValidatedBody } from 'h3'
import { demoRequestSchema } from '#shared/schemas/demo-request'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, value => demoRequestSchema.parse(value))

  if (body.website) {
    throw createError({ statusCode: 400, statusMessage: 'Não foi possível validar o formulário.' })
  }

  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase
    .from('demo_requests')
    .insert({
      name: body.name,
      company_name: body.company,
      email: body.email.toLowerCase(),
      phone: body.phone || null,
      interest: body.interest,
      details: body.details || null,
      source: body.source || 'site'
    })
    .select('id')
    .single()

  if (error) {
    console.error('Failed to save demo request', { code: error.code })
    throw createError({ statusCode: 503, statusMessage: 'Não foi possível registrar sua solicitação. Tente novamente.' })
  }

  return { id: data.id }
})
