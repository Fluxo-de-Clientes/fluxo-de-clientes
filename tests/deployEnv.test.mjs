import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const scriptPath = fileURLToPath(new URL('../scripts/check-deploy-env.mjs', import.meta.url))
const productionEnvironment = { NETLIFY: 'true', CONTEXT: 'production' }
const publicUrl = 'https://test-project.supabase.co'
const publicKey = 'test-public-key-do-not-log'

function runCheck(environment) {
  // Do not inherit developer/CI credentials into these configuration scenarios.
  const result = spawnSync(process.execPath, [scriptPath], {
    encoding: 'utf8',
    env: {
      ...(process.env.SystemRoot ? { SystemRoot: process.env.SystemRoot } : {}),
      ...environment
    }
  })
  assert.equal(result.error, undefined)
  return result
}

test('production deploy fails when both Supabase variables are missing', () => {
  const result = runCheck(productionEnvironment)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /NUXT_PUBLIC_SUPABASE_URL/)
  assert.match(result.stderr, /NUXT_PUBLIC_SUPABASE_KEY/)
})

test('production deploy rejects a blank key without logging configured values', () => {
  const result = runCheck({
    ...productionEnvironment,
    NUXT_PUBLIC_SUPABASE_URL: publicUrl,
    NUXT_PUBLIC_SUPABASE_KEY: '   '
  })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /NUXT_PUBLIC_SUPABASE_KEY/)
  assert.doesNotMatch(result.stderr, /NUXT_PUBLIC_SUPABASE_URL/)
  assert.equal(`${result.stdout}${result.stderr}`.includes(publicUrl), false)
})

test('production deploy rejects a missing URL without logging the key', () => {
  const result = runCheck({ ...productionEnvironment, NUXT_PUBLIC_SUPABASE_KEY: publicKey })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /NUXT_PUBLIC_SUPABASE_URL/)
  assert.doesNotMatch(result.stderr, /NUXT_PUBLIC_SUPABASE_KEY/)
  assert.equal(`${result.stdout}${result.stderr}`.includes(publicKey), false)
})

test('production deploy accepts configured Supabase variables without logging them', () => {
  const result = runCheck({
    ...productionEnvironment,
    NUXT_PUBLIC_SUPABASE_URL: publicUrl,
    NUXT_PUBLIC_SUPABASE_KEY: publicKey
  })
  assert.equal(result.status, 0)
  assert.equal(result.stdout, '')
  assert.equal(result.stderr, '')
})

test('Netlify preview builds remain available without production variables', () => {
  const result = runCheck({ NETLIFY: 'true', CONTEXT: 'deploy-preview' })
  assert.equal(result.status, 0)
  assert.equal(result.stderr, '')
})

test('local and CI builds remain available without production variables', () => {
  for (const environment of [{}, { CI: 'true' }, { CONTEXT: 'production' }]) {
    const result = runCheck(environment)
    assert.equal(result.status, 0)
    assert.equal(result.stderr, '')
  }
})
