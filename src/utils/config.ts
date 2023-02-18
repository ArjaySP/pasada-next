import type { GlobalThemeOverrides } from 'naive-ui'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'

// const colors = {
//   primary: '#3D53A4',
//   white: '#ffffff',
// }

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3D53A4',
    primaryColorHover: '#27407F',
    primaryColorPressed: '#203672',
    primaryColorSuppl: '#27407F',
    fontSize: '15px',
    fontSizeMedium: '15px',
  },
  Form: {
    labelFontSizeTopMedium: '15px',
  },
  DataTable: {
    thColor: '#3D53A4',
    thTextColor: '#FFFFFF',
    thColorHover: '#27407F',
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
