import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideNavigationBar from '.';
import {
  CANCEL_BUTTON,
  LOGOUT,
  LOGOUT_CONFIRMATION_MESSAGE,
  ROUTES,
  SIDE_NAV_DATA,
} from '../../../utils/constants';
import theme from '../../../Theme/theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}));

const mockNavigate = jest.fn();
const mockLocation = {
  pathname: ROUTES.CANDIDATE_PAGE,
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe('SideNavigationBar component unit test', () => {
  it('render for SideNavigationBar', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SideNavigationBar />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const SideNavigationBarElement = screen.getByTestId('navbar');
    expect(SideNavigationBarElement).toBeInTheDocument();
    SIDE_NAV_DATA.forEach((element) => {
      expect(SideNavigationBarElement).toHaveTextContent(element.label);
    });

    expect(screen.getByText('Candidates')).toHaveStyle(
      `color: ${theme.palette.primary500.main}`,
    );
    fireEvent.click(screen.getByText(SIDE_NAV_DATA[2].label));
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Candidates')).not.toHaveStyle(
      `color: ${theme.palette.primary500.main}`,
    );
    fireEvent.click(screen.getByText(SIDE_NAV_DATA[1].label));

    const logoutButton = screen.getByAltText(LOGOUT);
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });

  it('should check opening and closing of logout button ', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SideNavigationBar />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const logoutButton = screen.getByAltText(LOGOUT);
    fireEvent.click(logoutButton);
    expect(screen.getByText(LOGOUT_CONFIRMATION_MESSAGE)).toBeInTheDocument();
    const cancelButton = screen.getByText(CANCEL_BUTTON);
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(screen.queryByText(CANCEL_BUTTON)).not.toBeInTheDocument();
    });
  });
});
