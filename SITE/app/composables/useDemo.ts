export function useDemo() {
  const isDemoOpen = useState<boolean>('demo-open', () => false)
  const config = useRuntimeConfig()

  async function openDemo() {
    const target = String(config.public.demoUrl || '')
    if (/^https?:\/\//i.test(target)) {
      await navigateTo(target, { external: true })
      return
    }
    isDemoOpen.value = true
  }

  return { isDemoOpen, openDemo }
}
