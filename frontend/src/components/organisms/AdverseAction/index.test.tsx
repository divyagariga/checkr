import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import AdverseAction from '.';
import theme from '../../../Theme/theme';

describe('Tests Adverse Action component', () => {
  it('should render Adverse Action', () => {
    render(
      <ThemeProvider theme={theme}>
        <AdverseAction />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('adverse-action')).toBeInTheDocument;
  });
});
