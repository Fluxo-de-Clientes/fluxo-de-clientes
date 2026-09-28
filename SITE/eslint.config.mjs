import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['.output/**', '.nuxt/**', 'node_modules/**', '.od-frames/**', '.od-skills/**', '_nuxt/**', 'brand/**', 'icons/**', 'images/**', 'test-results/**', 'playwright-report/**', '**/%SystemDrive%/**'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/first-attribute-linebreak': 'off',
  },
})
