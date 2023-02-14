import type { GlobalThemeOverrides } from 'naive-ui'

const colors = {
  primary: '#3D53A4',
  white: '#ffffff',
}

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: colors.primary,
    // primaryColorHover: '',
    // primaryColorPressed: '',
    // primaryColorSuppl: '',
    fontSize: '15px',
    fontSizeMedium: '15px',
  },
  Form: {
    labelFontSizeTopMedium: '15px',
  },
  DataTable: {
    thColor: colors.primary,
    thTextColor: colors.white,
  },
}

export default themeOverrides
