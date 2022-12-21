/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  daisyui: {
    styled: true,
    // themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      {
        emprega: {
          primary: '#F18701',
          secondary: '#404145',
          accent: '#7A8987',
          neutral: '#0F4C81',
          'base-100': '#EEEFF1',
          info: '#8BE8FD',
          success: '#52FA7C',
          warning: '#F1FA89',
          error: '#FF5757',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
