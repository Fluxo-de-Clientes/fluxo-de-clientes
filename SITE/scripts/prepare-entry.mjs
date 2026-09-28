import { cp, mkdir, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

// Copy the Nuxt-generated site for the Open Design host; never hand-maintain a second page.
const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, '.output/public')
const assets = [
  '_nuxt',
  'brand',
  'icons',
  'images',
  'licenses',
  'favicon.png',
  'robots.txt',
  'sitemap.xml',
  '_payload.json',
]
const entries = new Set((await readdir(output)).map(String))
await mkdir(root, { recursive: true })
for (const name of assets) {
  if (entries.has(name)) await cp(resolve(output, name), resolve(root, name), { recursive: true })
}
// The canonical HTML is copied last. No post-delivery inspection follows.
await cp(resolve(output, 'index.html'), resolve(root, 'index.html'))
process.stdout.write('Entrada entregue: index.html\n')
