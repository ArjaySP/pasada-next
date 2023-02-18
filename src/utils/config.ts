import type { GlobalThemeOverrides } from 'naive-ui'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'

// const colors = {
//   primary: '#3D53A4',
//   white: '#ffffff',
// }

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // Hover, suppl, and pressed colors are derivatives of the primary color with increased saturation and decreased value
    primaryColor: '#3D53A4',
    primaryColorHover: '#27407F',
    primaryColorPressed: '#203672',
    primaryColorSuppl: '#27407F',

    errorColor: '#a34141',
    errorColorHover: '#8E2D2D',
    errorColorPressed: '#7F2121',
    errorColorSuppl: '#8E2D2D',

    fontSize: '15px',
    fontSizeMedium: '15px',
    tableHeaderColor: '#3D53A4',
  },
  Form: {
    labelFontSizeTopMedium: '15px',
  },
  DataTable: {
    thTextColor: '#FFFFFF',
    thColorHover: '#27407F',
  },
  Card: {},
  Modal: {

  },
  Image: {

  },
}

const validateMessages: FormValidateMessages = {
  required: 'This field is required',
  whitespace: 'This field cannot be empty',
  types: {
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    // regexp: 'Please enter a valid %s',
    // regexp: 'Please enter a valid ${label}',
  },
}

export { themeOverrides, validateMessages }
