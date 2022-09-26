module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard-with-typescript',
    'eslint:recommended'
  ],
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '12',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules:  {
    // 'off' -> 0 关闭规则 'warn' -> 1 开启警告规则 'error' -> 2 开启错误规则
    //* 【==== 语法 ====】
    // 禁止出现重复的case标签
    'no-duplicate-case': 2,
    // 禁止在return、throw、continue、break语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止function定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止case语句落空
    'no-fallthrough': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止出现未使用的变量
    'no-unused-vars': [2, {'vars': 'local', 'args': 'none'}],
    // 禁止出现空函数
    'no-empty-function': 2,
    // 禁用不必要嵌套块
    'no-lone-blocks': 2,
    // 这条规则强制执行v-on指令样式，您应该使用速记。
    'vue/v-on-style': [2, 'shorthand'],
    //* 【==== 符号 ====】
    // 强制所有控制语句使用一致的括号风格
    'curly': [2, 'multi-line'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [2, '1tbs', {'allowSingleLine': true}],
    // 要求或禁止末尾逗号
    'comma-dangle': [2, 'never'],
    // 强烈使用一致的反勾号``、双引号''或单引号''
    'quotes': [2, 'single', {
      // 允许字符串使用单引号或者双引号，只要字符串中包含了一个其他引号，否则需要转义
      'avoidEscape': true,
      // 允许字符串使用反勾号
      'allowTemplateLiterals': true
    }],
    // 禁止不必要的括号
    'no-extra-parens': [2, 'functions'],
    // 要求使用 ===和 !==
    'eqeqeq': [1, 'allow-null'],
    //* 【==== 空格 ====】
    // 强制使用一致的缩进
    'indent': [2, 2, {'SwitchCase': 1}],
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 强制generator函数中*号周围使用一致的空格
    'generator-star-spacing': [2, {'before': true, 'after': true}],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': [2, {'before': false, 'after': true}],
    // 强制在逗号前后使用一致的空格
    'comma-style': [2, 'last'],
    // 禁止在函数标识符和其调用之间有空格
    'func-call-spacing': 2,
    // 强制在块之前使用一致的空格
    'space-before-blocks': [2, 'always'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // * 【==== 注释 ====】
    // 强制在注释// 或/*使用一致的空格
    'spaced-comment': [2, 'always', {'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']}],
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 强制行注释的位置
    'line-comment-position': [2, {'position': 'above'}],
    // 强制对多行注释使用特定风格
    'multiline-comment-style': [2, 'bare-block'],
    // * 【==== 命名 ====】
    // 要求使用 let 或 const 而不是 var
    'no-var': 2,
    // name 必填
    'vue/require-name-property': 2,
    // name名称强制kebab-case
    'vue/component-definition-name-casing': [2, 'kebab-case'],
    // prop名称强制camelCase
    'vue/prop-name-casing': [2, 'camelCase'],
    // 获取当前执行环境的上下文时，强制使用一致的命名（此处强制使用 '_this'）。
    'consistent-this': [2, '_this'],
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 2,
    // * 【==== 结构 ====】
    'vue/order-in-components': [2, {
      'order': [
        'el',
        'name',
        'key',
        'parent',
        'functional',
        'mixins',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        ['provide', 'inject'],
        'ROUTER_GUARDS',
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'emits',
        'setup',
        'asyncData',
        'data',
        'fetch',
        'head',
        'computed',
        'watch',
        'watchQuery',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],
    // * 【==== 关闭配置 ====】
    // 强制使用驼峰拼写法命名规定
    'camelcase': [0, {'properties': 'never'}],
    // 未声明的变量，除非它们在/*global */注释中被提到
    'no-undef': 0,
    // 在注释中使用特定的警告术语
    'no-warning-comments': 0,
    // prop校验
    'vue/no-unused-properties': 0,
    // 使用指定的 import 加载的模块
    'no-restricted-imports': 0,
    // components 校验
    'vue/no-unused-components': 0,
    // 对component中的组件命名样式实施特定的大小写
    'vue/component-name-in-template-casing': 0,
    // 允许HTML未闭合标签
    'vue/html-self-closing': 0,
    // 允许props修改
    'vue/no-mutating-props': 0,
    // 允许computed修改名称
    'vue/no-side-effects-in-computed-properties': 0,
    // $emit不校验kebab-case
    'vue/custom-event-name-casing': 0,
    // 允许v-for和v-if一起用
    'vue/no-use-v-if-with-v-for': 0,
    // 允许在 case 子句中使用词法声明
    'no-case-declarations': 0,
    // 允许RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 0,
    // 允许不必要的转义
    'no-useless-escape': 0
  }
}
