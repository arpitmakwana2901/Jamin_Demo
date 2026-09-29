/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0B5E42',
        primaryDark: '#074430',
        primaryLight: '#E8F5E9',
        primaryAccent: '#14805A',
        brandBackground: '#F8FAFC',
        brandCard: '#FFFFFF',
        brandText: '#111827',
        brandTextLight: '#4B5563',
        brandTextMuted: '#9CA3AF',
        brandBorder: '#E5E7EB',
      },
    },
  },
  plugins: [],
};
