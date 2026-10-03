const isNetlifyProduction = process.env.NETLIFY === 'true'
  && process.env.CONTEXT === 'production'

if (isNetlifyProduction) {
  const requiredVariables = [
    'NUXT_PUBLIC_SUPABASE_URL',
    'NUXT_PUBLIC_SUPABASE_KEY'
  ]
  const missingVariables = requiredVariables.filter(name => !process.env[name]?.trim())

  if (missingVariables.length > 0) {
    console.error(`[deploy-env] Variáveis obrigatórias ausentes no build de produção: ${missingVariables.join(', ')}. Configure-as no Netlify antes de publicar.`)
    process.exitCode = 1
  }
}
