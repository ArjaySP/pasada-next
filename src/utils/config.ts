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
    bodyColor: '#fafafa',
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
    thIconColorActive: 'white',
    borderRadius: '15px',
    tdColor: '',

  },
  // Card: {
  //   color: '',
  //   borderColor: '',
  // },
  Modal: {

  },
  Image: {

  },
  Menu: {
    itemColorActiveCollapsed: 'rgb(61,83,164)',
    itemColorActiveCollapsedInverted: 'white',

    itemColorActive: 'rgb(61,83,164)',
    itemTextColorActive: 'white',

    itemIconColorActiveHover: 'white',
    itemTextColorActiveHover: 'white',
    itemColorActiveHover: 'rgb(61,83,164)',

    itemIconColorActive: 'white',
    itemColorHover: 'rgb(61,83,164, 0.1)',
    itemTextColorHover: 'rgb(61,83,164)',
    itemIconColorHover: 'rgb(61,83,164)',

  },
  Button: {
    textColorError: '#a34141',
    colorError:"",
    colorHoverError: '#8E2D2D',
    colorPressedError: '#7F2121',
    colorFocusError: '#8E2D2D',
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
