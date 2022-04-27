import { ThemeDefinition } from 'vuetify'

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#03A9F4',
    accent: '#0d6efd',
    secondary: '#8A8D93',
    success: '#56CA00',
    info: '#16B1FF',
    warning: '#FFB400',
    error: '#FF4C51',
    background: '#F4F5FA',
  },
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#039BE5',
    accent: '#0d6efd',
    secondary: '#8A8D93',
    success: '#56CA00',
    info: '#16B1FF',
    warning: '#FFB400',
    error: '#FF4C51',
    background: '#232323',
  },
}

export { light, dark }
