/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    options: {
      safelist: [
        'border-red-200',
        'border-yellow-200',
        'border-green-200',
        'border-blue-200',
        'border-indigo-200',
        'border-purple-200',
        'border-pink-200',
        'dark:border-red-700',
        'dark:border-yellow-700',
        'dark:border-green-700',
        'dark:border-blue-700',
        'dark:border-indigo-700',
        'dark:border-purple-700',
        'dark:border-pink-700',
        'bg-red-50',
        'bg-yellow-50',
        'bg-green-50',
        'bg-blue-50',
        'bg-indigo-50',
        'bg-purple-50',
        'bg-pink-50',
        'dark:bg-red-600',
        'dark:bg-yellow-600',
        'dark:bg-green-600',
        'dark:bg-blue-600',
        'dark:bg-indigo-600',
        'dark:bg-purple-600',
        'dark:bg-pink-600',
      ]
    }
  }
}
