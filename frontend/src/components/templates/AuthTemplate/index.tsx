import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import theme from '../../../Theme/theme';
import LoginImage from '../../../../public/assets/images/loginimage.svg';

interface AuthTemplateProps {
  authComponent: React.ReactNode;
}

const StyledMainContainer = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  padding: '3rem 9.0625rem 3rem 12.1875rem',
  backgroundColor: theme.palette.primary100.main,
  width: '100%',
});

const StyledInnerContainer = styled(Grid)({
  height: '87.5vh',
  background: theme.palette.white.main,
  borderRadius: '0.375rem',
  boxShadow: theme.shadows[2],
});

const AuthTemplate = ({ authComponent }: AuthTemplateProps) => {
  return (
    <StyledMainContainer container data-testid="auth-template">
      <Grid item sm={12} md={12} lg={6}>
        <img src={LoginImage} alt="login-image" />
      </Grid>
      <StyledInnerContainer item sm={12} md={12} lg={6}>
        {authComponent}
      </StyledInnerContainer>
    </StyledMainContainer>
  );
};

export default AuthTemplate;
