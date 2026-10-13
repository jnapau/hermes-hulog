/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '14px' }],
      },
      colors: {
        // Hermes core palette (same tokens as hermes.exoasia.org)
        canvas: '#F1F0EE',
        brand: '#1B50D8',
        'brand-light': '#3861EF',
        ink: '#211F1C',
        'ink-muted': '#6E6963',
        hairline: '#E3E0DD',
        'surface-sunk': '#F7F6F5',
        // Hestia / Hulog palette (character sheet, October 2026)
        'hestia-honey': '#FFE6B0',
        'hestia-kiln': '#C9690F',
        cream: '#FFF8EC',
        'cream-deep': '#FCEFD6',
        flame: '#F5A524',
        'flame-deep': '#E8890C',
        ember: '#F26B3A',
        bamboo: '#7FA145',
        'bamboo-deep': '#5B7A2E',
        scam: '#E8665A',
        legit: '#2A9D8F',
        cocoa: '#4A2A12',
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        warm: '0 10px 30px -12px rgba(201, 105, 15, 0.35)',
        btn: '0 4px 0 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
