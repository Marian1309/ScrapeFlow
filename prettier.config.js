/** @type {import('prettier').Config} */

const prettierConfig = {
  printWidth: 90,
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  useTabs: false,
  quoteProps: 'as-needed',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',

    '<THIRD_PARTY_MODULES>',

    '^@/env',

    '^@/types',

    '^@/db',
    '^@/actions/(.*)$',

    '^@/data/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/schema/(.*)$',

    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^./ui/(.*)$',

    '^@/(.*)$',
    '^../(.*)$',

    '^./providers$',
    '^./(.*)$',
    '^./.*\\.scss$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
};

module.exports = prettierConfig;
