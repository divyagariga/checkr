/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import LogoutConfirmationPopup from '.';
import {
  CONFIRM_LOGOUT,
  LOGOUT_BUTTON,
  LOGOUT_WARNING,
} from '../../../utils/constants';
import { ThemeProvider } from '@mui/material';
import theme from '../../../Theme/theme';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const mockHandleCloseModal = jest.fn();

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}));

const renderComponent = (isOpen: boolean) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LogoutConfirmationPopup
            isOpen={isOpen}
            handleCloseModal={mockHandleCloseModal}
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
};

describe('LogoutConfirmationPopup', () => {
  it('should render the component when isOpen is true', () => {
    renderComponent(true);

    expect(screen.getByTestId('pop-over')).toBeInTheDocument();

    expect(screen.getByText(CONFIRM_LOGOUT)).toBeInTheDocument();
    expect(screen.getByText(LOGOUT_WARNING)).toBeInTheDocument();

    const logoutButton = screen.getByText(LOGOUT_BUTTON);
    fireEvent.click(logoutButton);

    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it('should not render the component when isOpen is false', () => {
    renderComponent(false);
    expect(screen.queryByTestId('pop-over')).toBeNull();
  });
});
