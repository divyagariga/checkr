/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthContext } from './contexts/AuthContext';
import SignInSignUpPage from './pages/SignInSignUpPage';
import CandidateDetailsPage from './pages/CandidateDetailsPage';
import { Route, Routes } from 'react-router-dom';
import CandidatePage from './pages/CandidatePage';
import './App.css';
import PreAdverseActionPage from './pages/PreAdverseActionPage';
import AdverseActionsPage from './pages/AdverseActionsPage';
import { useEffect } from 'react';

export const App = () => {
  const { isAuthenticated: auth0Authenticated } = useAuth0();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
console.log("Env",process.env.DOMAIN)
  useEffect(() => {
    if (auth0Authenticated) {
      setIsAuthenticated(auth0Authenticated);
    }
  }, [auth0Authenticated]);
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path={'/'} element={<CandidatePage />} />
        <Route
          path="/candidateDetails/:id"
          element={<CandidateDetailsPage />}
        />
        <Route
          path={'/pre-adverse-action'}
          element={<PreAdverseActionPage />}
        />
        <Route path={'/adverse-actions'} element={<AdverseActionsPage />} />
      </Routes>
    );
  }
  if (!isAuthenticated) {
    return <SignInSignUpPage />;
  }
};
export default App;
