import antfu from '@antfu/eslint-config'

export default antfu({
  vue: false,
  markdown: false,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
  },
})
