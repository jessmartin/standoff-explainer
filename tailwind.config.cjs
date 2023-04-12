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
        'bg-red-50',
        'bg-yellow-50',
        'bg-green-50',
        'bg-blue-50',
        'bg-indigo-50',
        'bg-purple-50',
        'bg-pink-50',
      ]
    }
  }
}
