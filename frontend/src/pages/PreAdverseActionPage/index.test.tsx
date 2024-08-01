import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../Theme/theme';
import PreAdverseActionPage from '.';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import {
  ASSAULT_DOMESTIC_VIOLENCE,
  MAIL_SENT_SUCCESS_MESSAGE,
  PREVIEW_NOTICE,
  ROUTES,
} from '../../utils/constants';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <PreAdverseActionPage />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
};

const mockedUsedNavigate = jest.fn();
const mockTimer = jest.useFakeTimers();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    state: { candidateName: 'John', candidateEmail: 'John@gmail.com' },
  }),
}));

describe('Pre-Adverse-Action page', () => {
  it('should render Pre-Adverse-Action', async () => {
    const { getByTestId } = renderComponent();

    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
    const navbar = getByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    const checkboxes = screen.getAllByTestId('checkbox');
    expect(checkboxes).toHaveLength(3);
    const firstChecbox = checkboxes[0].querySelector('input[type="checkbox"]')!;
    expect(firstChecbox).toHaveProperty('checked', false);

    const notice = screen.getByTestId('notice');
    expect(notice).toBeInTheDocument;
    const previewNoticeButton = within(notice).findByRole('button');
    expect(previewNoticeButton).toBeDisabled;
    fireEvent.click(firstChecbox);
    expect(firstChecbox).toHaveProperty('checked', true);
    expect(previewNoticeButton).toBeEnabled;
    fireEvent.click(firstChecbox);
    fireEvent.click(firstChecbox);
    fireEvent.click(screen.getByText(PREVIEW_NOTICE));

    const preAdverseModal = screen.getByTestId('preadverse-mail');
    expect(preAdverseModal).toBeInTheDocument();
    expect(screen.getByText(ASSAULT_DOMESTIC_VIOLENCE)).toBeInTheDocument();
    const submitNoticeButton = screen.getByRole('button');
    fireEvent.click(submitNoticeButton);

    act(() => {
      mockTimer.advanceTimersByTime(4000);
    });

    expect(screen.getByText(MAIL_SENT_SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.CANDIDATE_PAGE);
  });

  it('should handle back button click', async () => {
    const { getByTestId } = renderComponent();

    const header = getByTestId('header');
    expect(header).toBeInTheDocument();

    const backButton = within(header).getByRole('img');
    fireEvent.click(backButton);

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
