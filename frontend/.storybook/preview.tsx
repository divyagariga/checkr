import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import theme from '../src/Theme/theme';
import '../src/App.css';

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
