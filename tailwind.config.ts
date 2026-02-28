import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['DM Sans', 'sans-serif'],
				poppins: ['Syne', 'sans-serif'],
				syne: ['Syne', 'sans-serif'],
				dmsans: ['DM Sans', 'sans-serif'],
			},
			colors: {
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				background: {
					DEFAULT: 'var(--background)',
					secondary: 'var(--background-secondary)',
					card: 'var(--background-card)',
				},
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
					glow: 'var(--primary-glow)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
					glow: 'var(--accent-glow)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				'electric-blue': 'var(--primary)',
				'neon-green': 'var(--accent)',
				glass: {
					bg: 'var(--glass-bg)',
					border: 'var(--glass-border)'
				},
				sidebar: {
					DEFAULT: 'var(--sidebar-background)',
					foreground: 'var(--sidebar-foreground)',
					primary: 'var(--sidebar-primary)',
					'primary-foreground': 'var(--sidebar-primary-foreground)',
					accent: 'var(--sidebar-accent)',
					'accent-foreground': 'var(--sidebar-accent-foreground)',
					border: 'var(--sidebar-border)',
					ring: 'var(--sidebar-ring)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backdropBlur: {
				xs: '2px',
				'4xl': '72px',
			},
			boxShadow: {
				'glow-blue': '0 0 15px var(--primary)',
				'glow-green': '0 0 15px var(--accent)',
				'glow-red': 'var(--shadow-glow)', // Keep for backward compat just in case
				'glow-gold': 'var(--shadow-accent-glow)', // Keep for backward compat
				'elegant': 'var(--shadow-elegant)',
				'glass': '0 8px 32px rgba(0, 200, 255, 0.1)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				typing: {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'blink-caret': {
					'from, to': { borderColor: 'transparent' },
					'50%': { borderColor: 'var(--primary)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-left': {
					from: { opacity: '0', transform: 'translateX(-50px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(192, 57, 43, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(231, 76, 60, 0.6)' }
				},
				'gradient-x': {
					'0%, 100%': { transform: 'translateX(0%)' },
					'50%': { transform: 'translateX(100%)' }
				},
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				typing: 'typing 3.5s steps(40, end)',
				'blink-caret': 'blink-caret 0.75s step-end infinite',
				float: 'float 6s ease-in-out infinite',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'slide-left': 'slide-left 0.8s ease-out forwards',
				'scale-in': 'scale-in 0.6s ease-out forwards',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'spin-slow': 'spin-slow 8s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
