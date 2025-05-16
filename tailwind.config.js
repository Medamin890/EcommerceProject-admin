/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#f5f6f2",
        secondarylihgt: "#43c2d1",
        primary: "#fdf3fb",
        secondary: "#ff813f",
        tertiary: "#222222",
        secondaryRed: "#f42c37",
        secondaryYellow: "#fdc62e",
        secondaryGreen: "#2dcc6f",
        secondaryBlue: "#1376f4",
        secondaryWhite: "#eeeeee",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
        banner: "url(/src/assets/banner.png)",
        emptyCart :"url(/src/assets/empty_cart.svg)",
      },
      keyframes: {
        slideInTop: {
          '0%': { transform: 'translateY(-100%)' }, // Starts off-screen from top
          '100%': { transform: 'translateY(0)' },    // Ends at normal position
        },
        slideOutTop: {
          '0%': { transform: 'translateY(0)' },      // Starts from normal position
          '100%': { transform: 'translateY(-100%)' },// Ends off-screen to the top
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideOutTop: "slideOutTop 0.5s ease-in ", // Custom animation for sliding out
        slideInTop: 'slideInTop 0.5s ease-out ',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        fadeIn: 'fadeIn 0.6s ease-in-out',  

      },
    },
  },
  plugins: [],
}

