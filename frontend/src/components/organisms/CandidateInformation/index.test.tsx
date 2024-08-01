import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CandidateInformation from '.';
import * as candidateService from '../../../services/candidateService';
import theme from '../../../Theme/theme';
import {
  ENGAGE,
  FILTER_BUTTON_TEXT,
  MOCK_CANDIDATE_DATA,
  SEARCH_BAR_PLACEHOLDER,
  TEST_CANDIDATE_NAME,
} from '../../../utils/constants';

import { CourtSearchStatusOptions } from '../../../utils/enums';
import { CandidateTableDataType } from '../../../utils/types';
import { AuthProvider, useAuthContext } from '../../../contexts/AuthContext';

describe('Tests CandidateInformation', () => {
  const mockCandidateTableData: CandidateTableDataType[] = MOCK_CANDIDATE_DATA;

  jest
    .spyOn(candidateService, 'getCandidateTableData')
    .mockResolvedValue(mockCandidateTableData);
  jest
    .spyOn(candidateService, 'getCandidateResponseCount')
    .mockResolvedValue(10);
  it('should renders Candidate information component', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      const component = screen.getByTestId('candidate-information');
      expect(component).toBeInTheDocument();
    });
  });

  it('should give result on search input', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(SEARCH_BAR_PLACEHOLDER);
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: TEST_CANDIDATE_NAME } });
    await waitFor(() => {
      expect(screen.getByText(TEST_CANDIDATE_NAME)).toBeInTheDocument();
    });
  });

  it('should filter the candidates when we apply filters', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const button = screen.getByText(FILTER_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const filterMenu = screen.getByTestId('filter-menu');
    expect(filterMenu).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(6);
    const clearCheckbox = checkboxes[1];
    expect(clearCheckbox).toHaveProperty('checked', false);
    fireEvent.click(clearCheckbox);
    fireEvent.click(checkboxes[4]);

    expect(clearCheckbox).toHaveProperty('checked', true);

    await waitFor(() => {
      expect(
        screen.getByText(CourtSearchStatusOptions.clear),
      ).toBeInTheDocument();
    });
    fireEvent.click(clearCheckbox);
    const engageCheckbox = checkboxes[4];
    fireEvent.click(engageCheckbox);
    const engageText = ENGAGE;
    await waitFor(() => {
      expect(screen.getByText(engageText.toUpperCase())).toBeInTheDocument();
    });
    fireEvent.click(engageCheckbox);
  });

  it('should apply pagination', async () => {
    jest
      .spyOn(candidateService, 'getCandidateTableData')
      .mockResolvedValue(mockCandidateTableData);
    jest
      .spyOn(candidateService, 'getCandidateResponseCount')
      .mockResolvedValue(10);
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const rightButton = screen.getByAltText('rightarrow');
    fireEvent.click(rightButton);
    await waitFor(() => {
      const candidate = screen.queryByText(TEST_CANDIDATE_NAME);
      expect(candidate).not.toBeInTheDocument();
    });
    const leftButton = screen.getByAltText('leftarrow');
    fireEvent.click(leftButton);
    await waitFor(() => {
      expect(screen.getByText(TEST_CANDIDATE_NAME)).toBeInTheDocument();
    });
    fireEvent.click(rightButton);
    const paginationButtons = screen.getAllByTestId('pagination-item');
    fireEvent.click(paginationButtons[0]);
    await waitFor(() => {
      expect(screen.getByText(TEST_CANDIDATE_NAME)).toBeInTheDocument();
    });
  });

  it('should navigate to CandidateDetails page when clicked on a candidate name', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      const candidateName = screen.getByText(TEST_CANDIDATE_NAME);
      fireEvent.click(candidateName);
    });
  });

  it('should tests error handling if we get error from getCandidateDetails', async () => {
    jest
      .spyOn(candidateService, 'getCandidateTableData')
      .mockRejectedValue(new Error('Error'));
    jest
      .spyOn(candidateService, 'getCandidateResponseCount')
      .mockRejectedValue(new Error('Error'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CandidateInformation filterPopupVariant="candidate" />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.queryByText(TEST_CANDIDATE_NAME)).not.toBeInTheDocument();
    });
  });
});
