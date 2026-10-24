/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#ff6a28',
          600: '#ff5a1f',
          700: '#ea470c',
        },
        sidebar: {
          dark: '#0B1A33',
          darker: '#081326',
          gradientStart: '#0B1A33',
          gradientEnd: '#0F2347',
          hover: '#142749',
          active: '#F97316',
          text: '#94a3b8',
          muted: '#64748b',
          border: '#162847',
        },
        app: {
          bg: '#F4F7FB',
          card: '#FFFFFF',
          border: '#E6EBF2',
          heading: '#0F172A',
          body: '#475569',
          muted: '#94A3B8',
        },
        primary: {
          DEFAULT: '#1D5DF0',
          hover: '#154ecc',
          light: '#EEF4FF',
        },
        accent: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          light: '#FFF7ED',
        },
        status: {
          success: '#16A34A',
          successBg: '#DCFCE7',
          warning: '#F59E0B',
          warningBg: '#FEF3C7',
          danger: '#DC2626',
          dangerBg: '#FEE2E2',
          info: '#2563EB',
          infoBg: '#DBEAFE',
          purple: '#7C3AED',
          purpleBg: '#F3E8FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
