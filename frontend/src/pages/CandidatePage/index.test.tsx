import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CandidatePage from '.';
import { ThemeProvider } from '@mui/material';
import theme from '../../Theme/theme';
import {
  EXPORT,
  EXPORT_BUTTON,
  EXPORT_CONFIRMATION_TIMEOUT,
} from '../../utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

describe('CandidatePage Component', () => {
  it('should render candidate page correctly', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidatePage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const candidatePageElement = screen.getByTestId('candidate-page');
    await waitFor(() => {
      expect(candidatePageElement).toBeInTheDocument();
    });
  });

  it('should be able to export candidates and should test the exporting flow correctly', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidatePage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    const exportButton = screen.getByText(EXPORT);
    expect(exportButton).toBeInTheDocument();
    fireEvent.click(exportButton);
    await waitFor(() => {
      expect(screen.getByTestId('export-candidate')).toBeInTheDocument();
    });
    const exportReportButton = screen.getByText(EXPORT_BUTTON);
    expect(exportReportButton).toBeInTheDocument();
    fireEvent.click(exportReportButton);
    await waitFor(() => {
      expect(screen.getByAltText('success')).toBeInTheDocument();
    });
    await waitFor(
      () => {
        expect(screen.queryByAltText('success')).not.toBeInTheDocument();
      },
      { timeout: EXPORT_CONFIRMATION_TIMEOUT },
    );
  });
});
