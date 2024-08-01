/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { AUTH_CONTEXT_ERROR } from '../utils/constants';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (user: UserType) => void;
  signup: (user: UserType) => void;
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated: auth0IsAuthenticated, logout: auth0Logout } =
    useAuth0();
  const [userState, setUserState] = useState<UserType | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] =
    useState<boolean>(false);

  const login = (userData: UserType) => {
    setUserState(userData);
    setIsAuthenticated(true);
  };

  const signup = (userData: UserType) => {
    setUserState(userData);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    if (auth0IsAuthenticated) {
      auth0Logout({ returnTo: window.location.origin } as LogoutOptions);
    }
    setUserState(null);
    navigate('/');
    window.location.reload();
  };

  const setIsAuthenticated = (newIsAuthenticated: boolean) => {
    setIsAuthenticatedState(newIsAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          user: userState,
          isAuthenticated: isAuthenticatedState,
          login,
          signup,
          logout,
          setIsAuthenticated,
        }),
        [userState, isAuthenticatedState],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(AUTH_CONTEXT_ERROR);
  }
  return context;
};
