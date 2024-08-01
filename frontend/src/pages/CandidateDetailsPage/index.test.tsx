import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import CandidateDetailPage from '.';
import * as candidateService from '../../services/candidateService';
import * as preAdverseService from '../../services/preAdverseActionService';
import theme from '../../Theme/theme';
import {
  BACK_BUTTON_ALT_TEXT,
  ENGAGE,
  MOCK_CANDIDATE_COURT_SEARCHES,
  MOCK_CANDIDATE_DETAILS,
  MOCK_CANDIDATE_REPORT_DATA,
  PREADVERSE_ACTION,
  SAMPLE_CANDIDATE_NAME,
} from '../../utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CandidatePage Component', () => {
  const mockCandidateDetails = MOCK_CANDIDATE_DETAILS;
  const mockCandidateReportData = MOCK_CANDIDATE_REPORT_DATA;
  const mockCandidateCourtSearches = MOCK_CANDIDATE_COURT_SEARCHES;

  jest
    .spyOn(candidateService, 'getCandidateDetails')
    .mockResolvedValue(mockCandidateDetails);
  jest
    .spyOn(candidateService, 'getCandidateReportData')
    .mockResolvedValue(mockCandidateReportData);
  jest
    .spyOn(candidateService, 'getCandidateCourtSearches')
    .mockResolvedValue(mockCandidateCourtSearches);
  jest.spyOn(candidateService, 'engageCandidate').mockResolvedValue(true);

  it('should render candidate details page correctly', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    const candidateDetailPageElement = screen.getByTestId(
      'candidate-details-page',
    );
    await waitFor(() => {
      expect(candidateDetailPageElement).toBeInTheDocument();
    });
  });

  it('should engage the candidate and move to the candidates page', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const engageButton = screen.getByText(ENGAGE);
    fireEvent.click(engageButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should go back to candidate page once clicked on the back button', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const backButton = screen.getByAltText(BACK_BUTTON_ALT_TEXT);
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should move to preadverse action page on clicking preadverse button', async () => {
    jest
      .spyOn(preAdverseService, 'raisePreAdverseAction')
      .mockResolvedValue(true);
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const preAdverseButton = screen.getByText(PREADVERSE_ACTION);
    fireEvent.click(preAdverseButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('should throw error on clicking preadverse button', async () => {
    jest
      .spyOn(preAdverseService, 'raisePreAdverseAction')
      .mockRejectedValue(new Error('Error'));
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const preAdverseButton = screen.getByText(PREADVERSE_ACTION);
    fireEvent.click(preAdverseButton);
  });

  it('should tests error handling if we get error from getCandidateDetails, getReportData and getCandidateCourtSearches', async () => {
    jest
      .spyOn(candidateService, 'getCandidateDetails')
      .mockRejectedValue(new Error('Error'));
    jest
      .spyOn(candidateService, 'getCandidateReportData')
      .mockRejectedValue(new Error('Error'));
    jest
      .spyOn(candidateService, 'getCandidateCourtSearches')
      .mockRejectedValue(new Error('Error'));
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText(SAMPLE_CANDIDATE_NAME)).not.toBeInTheDocument();
    });
  });

  it('should tests error handling when user is engaged', async () => {
    jest
      .spyOn(candidateService, 'engageCandidate')
      .mockRejectedValue(new Error('Error'));
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateDetailPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const engageButton = screen.getByText(ENGAGE);
    fireEvent.click(engageButton);
  });
});
