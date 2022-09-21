module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['src/components/Home.vue','src/components/**/Home.vue'],
      rules: {
        'vue/multi-word-component-names':"off",
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    "vue/multi-word-component-names":"off"
  }
}
