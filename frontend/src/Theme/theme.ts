import {
  PaletteColor,
  PaletteColorOptions,
  createTheme,
  Shadows,
} from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    white: PaletteColor;
    stroke: PaletteColor;
    icon1: PaletteColor;
    icon2: PaletteColor;
    textEmphasis: PaletteColor;
    accentBlue: PaletteColor;
    accentLightBlue: PaletteColor;
    accentGreen: PaletteColor;
    accentLightGreen: PaletteColor;
    accentYellow: PaletteColor;
    accentLightYellow: PaletteColor;
    accentRed: PaletteColor;
    primary100: PaletteColor;
    primary300: PaletteColor;
    primary400: PaletteColor;
    primary500: PaletteColor;
    primary700: PaletteColor;
    overlay: PaletteColor;
    primary50: PaletteColor;
    filterPopupShadow: PaletteColor;
    red: PaletteColor;
    boxShadowColor: PaletteColor;
    logoutPopupShadowColor: PaletteColor;
  }

  interface PaletteOptions {
    white: PaletteColorOptions;
    stroke: PaletteColorOptions;
    icon1: PaletteColorOptions;
    icon2: PaletteColorOptions;
    textEmphasis: PaletteColorOptions;
    accentBlue: PaletteColorOptions;
    accentGreen: PaletteColorOptions;
    accentYellow: PaletteColorOptions;
    accentRed: PaletteColorOptions;
    primary100: PaletteColorOptions;
    primary300: PaletteColorOptions;
    primary400: PaletteColorOptions;
    primary500: PaletteColorOptions;
    primary700: PaletteColorOptions;
    overlay: PaletteColorOptions;
    primary50: PaletteColorOptions;
    filterPopupShadow: PaletteColorOptions;
    red: PaletteColorOptions;
    boxShadowColor: PaletteColorOptions;
    logoutPopupShadowColor: PaletteColorOptions;
  }

  interface TypographyVariants {
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
    caption3?: React.CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary500: true;
    white: true;
    stroke: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption1: true;
    caption2: true;
    caption3: true;
  }
}

const theme = createTheme({
  palette: {
    white: {
      main: '#ffffff',
    },
    stroke: {
      main: '#E5E7ED',
    },
    icon1: {
      main: '#696A6E',
    },
    icon2: {
      main: '#3E414D',
    },
    primary100: {
      main: '#f7f7f9',
    },
    primary300: {
      main: '#EFF2FF',
    },
    primary400: {
      main: '#95AAFF',
    },
    primary500: {
      main: '#224DFF',
    },
    primary700: {
      main: '#1132B7',
    },
    primary50: {
      main: '#FAFAFC',
    },
    textEmphasis: {
      main: '#696A6E',
      light: '#818287',
      dark: '#2C2C2E',
    },
    accentBlue: {
      main: '#3E5FE2',
      light: '#F2F4FC',
    },
    accentGreen: {
      main: '#17A076',
      light: '#F2FCFB',
    },
    accentYellow: {
      main: '#A08817',
      light: '#FAF8EB',
    },
    accentRed: {
      main: '#994d5b',
      light: '#fce5ea',
    },
    overlay: {
      main: '#131415b8',
    },
    filterPopupShadow: {
      main: 'rgba(3, 3, 3, 0.04)',
    },
    red: {
      main: '#FF0000',
    },
    boxShadowColor: {
      main: 'rgba(45, 45, 47, 0.10)',
    },
    logoutPopupShadowColor: {
      main: 'rgba(0, 0, 0, 0.15)',
    },
  },

  shadows: [
    'none',
    '0px 4px 16px 0px rgba(3, 3, 3, 0.04)',
    '0px 4px 16px 0px rgba(3, 3, 3, 0.04);',
    '0px 4px 28px 0px rgba(45, 45, 47, 0.10)',
    ...Array(22).fill('none'),
  ] as Shadows,
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '1.875rem',
      textTransform: 'none',
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '1.75rem',
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '1.5rem',
      textTransform: 'none',
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '1.25rem',
      textTransform: 'none',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.125rem',
      textTransform: 'none',
    },
    caption1: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '18px',
      textTransform: 'capitalize',
    },
    caption2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.125rem',
    },
    caption3: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: '1.125rem',
      textTransform: 'capitalize',
    },
  },
});

export default theme;
