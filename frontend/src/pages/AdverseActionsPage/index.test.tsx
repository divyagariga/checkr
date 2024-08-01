import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdverseActionsPage from '.';
import { AuthProvider } from '../../contexts/AuthContext';
import theme from '../../Theme/theme';

describe('Tests Adverse actions page', () => {
  it('should render adverse actions page', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <AdverseActionsPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('adverse-action-page')).toBeInTheDocument;
  });
});
