/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a7d89',
        secondary: '#12101e',
        background: '#ffffff',
        surface: '#f0fbf9',
        'accent-warm': '#3bbba5',
        'accent-soft': '#d1f4ef',
        'accent-tech': '#3bbba5',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
      },
      backgroundSize: {
        'hero-pattern': '24px 24px',
      },
      boxShadow: {
        soft: '0 10px 28px -18px rgba(18, 16, 30, 0.35)',
        glow: '0 14px 34px -20px rgba(10, 125, 137, 0.55)',
      },
    },
  },
  plugins: [],
};
