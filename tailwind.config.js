/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0B5E42',
        primaryDark: '#074430',
        primaryLight: '#E8F5E9',
        primaryAccent: '#14805A',
        whatsapp: '#25D366',
        telegram: '#229ED9',
        secondary: '#F5A623',
        secondaryLight: '#FEF3C7',
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#111827',
        textLight: '#4B5563',
        textMuted: '#9CA3AF',
        border: '#E5E7EB',
        divider: '#E5E7EB',
        chipBg: '#F3F4F6',
        topBarIconBg: '#F3F4F6',
      },
    },
  },
  plugins: [],
};
