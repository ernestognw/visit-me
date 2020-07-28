import { lighten, darken, transparentize } from 'polished';

const brand = {
  primary: '#5B97F2',
  secondary: '#8265FC',
  info: '#30CEE7',
  default: '#1F262D',
  success: '#00E18D',
  warning: '#FFAB00',
  danger: '#FF4F64',
};

Object.keys(brand).forEach((color) => {
  brand[`${color}900`] = darken(0.28, brand[color]);
  brand[`${color}800`] = darken(0.21, brand[color]);
  brand[`${color}700`] = darken(0.14, brand[color]);
  brand[`${color}600`] = darken(0.07, brand[color]);
  brand[`${color}500`] = brand[color];
  brand[`${color}400`] = lighten(0.07, brand[color]);
  brand[`${color}300`] = lighten(0.14, brand[color]);
  brand[`${color}200`] = lighten(0.21, brand[color]);
  brand[`${color}100`] = lighten(0.28, brand[color]);

  // Default soft
  brand[`${color}Soft`] = transparentize(0.8, brand[color]);
  brand[`${color}Soft900`] = transparentize(0.1, brand[color]);
  brand[`${color}Soft800`] = transparentize(0.2, brand[color]);
  brand[`${color}Soft700`] = transparentize(0.3, brand[color]);
  brand[`${color}Soft600`] = transparentize(0.4, brand[color]);
  brand[`${color}Soft500`] = transparentize(0.5, brand[color]);
  brand[`${color}Soft400`] = transparentize(0.6, brand[color]);
  brand[`${color}Soft300`] = transparentize(0.7, brand[color]);
  brand[`${color}Soft200`] = transparentize(0.8, brand[color]);
  brand[`${color}Soft100`] = transparentize(0.9, brand[color]);
});

const grey = {
  darker: '#121217',
  dark: '#151A1F',
  semiDark: '#474B4F',
  lightDark: '#6F737A',
  lightGrey: '#AAAEB3',
  veryLightGrey: '#ECEDEF',
  light: '#F2F2F2',
  veryLight: '#F6F8FA',
  lighter: '#FFFFFF',
};

const colors = {
  ...brand,
  ...grey,
  gradient: `linear-gradient(135deg, ${brand.info}, ${brand.secondary});`,
};

const theme = {
  colors,
};

export default theme;
