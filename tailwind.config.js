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
      colors: {
        'color1': '#3C3E42',
        'color2': '#423C3C',
        'color3': '#DC5953'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
