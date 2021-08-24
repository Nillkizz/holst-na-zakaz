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
      screens: {
        xs: '380px'
      },
      colors: {
        color1: '#3C3E42',
        color2: '#423C3C',
        color3: '#DC5953',
        'color3-60': '#DC595399'
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 95.01%)',
        'gradient-1-to-transparent': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 30%, #FFF0 65%)'
      },
      fontFamily: {
        raleway: ['Raleway'],
        roboto: ['Roboto']
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '24': '24px',
        '28': '28px',
        '36': '36px',
        '44': '44px',
        '54': '54px',
        '70': '70px',
        '144': '144px',
        '350': '350px',
      },
      zIndex: {
        '-1': '-1',
      },
      borderWidth: {
        '20': '20px',
      },
      scale: {
        '25': '.25',
        '40': '.4',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
