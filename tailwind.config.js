module.exports = {
  mode: 'jit',
  separator: '_',
  purge: {
    content: [
      './src/**/*.pug',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    options: {
      safelist: [],
      blocklist: [/^debug-/],
      keyframes: false,
      fontFace: true,
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens:{
        xs: '380px'
      },
      colors: {
        color1: '#3C3E42',
        color2: '#423C3C',
        color3: '#DC5953'
      },
      backgroundImage:{
        'gradient-1': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 95.01%)',
        'gradient-1-to-white': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 30%, #FFF 65%)'
      },
      fontFamily: {
        raleway: ['Raleway'],
        roboto: ['Roboto']
      },
      fontSize:{
        '14': '14px',
        '18': '18px',
        '24': '24px',
        '28': '28px',
        '36': '36px'
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
