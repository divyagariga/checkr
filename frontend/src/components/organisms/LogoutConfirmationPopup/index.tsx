import React from 'react';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Modal from '../../molecules/Modal';
import theme from '../../../Theme/theme';
import {
  CANCEL_BUTTON,
  CONFIRM_LOGOUT,
  LOGOUT_BUTTON,
  LOGOUT_WARNING,
} from '../../../utils/constants';
import { useAuth0 } from '@auth0/auth0-react';

interface ILogoutProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

const MainContainerStyled = styled(Box)({
  display: 'flex',
  boxShadow: `0px 4px 16px 0px ${theme.palette.logoutPopupShadowColor.main}`,
  borderRadius: '0.5rem',
  backgroundColor: theme.palette.white.main,
  padding: '1rem',
  flexDirection: 'column',
  gap: '2rem',
});

const ConfirmationContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const ButtonContainerStyled = styled(Box)({
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'flex-end',
});

const LogoutConfirmationPopup = ({
  isOpen,
  handleCloseModal,
}: ILogoutProps) => {
  const { logout } = useAuth0();

  const handleLogoutClick = () => {
    handleCloseModal();
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.clear();
  };
  return (
    <Modal
      data-testid="logout-popup"
      isPopupOpen={isOpen}
      handleClose={handleCloseModal}
      innerPopupContent={
        <MainContainerStyled>
          <ConfirmationContainerStyled>
            <Typography
              variant="subtitle1"
              color={theme.palette.textEmphasis.dark}
            >
              {CONFIRM_LOGOUT}
            </Typography>
            <Typography variant="body2" color={theme.palette.textEmphasis.main}>
              {LOGOUT_WARNING}
            </Typography>
          </ConfirmationContainerStyled>
          <ButtonContainerStyled>
            <Button
              variant="contained"
              label={CANCEL_BUTTON}
              labelColor={theme.palette.textEmphasis.main}
              color={'white'}
              labelVariant="body1"
              boxShadow="none"
              handleClick={handleCloseModal}
              border={`1px solid ${theme.palette.stroke.main}`}
            />
            <Button
              variant="contained"
              label={LOGOUT_BUTTON}
              labelColor={theme.palette.white.main}
              color="primary500"
              labelVariant={'body1'}
              handleClick={handleLogoutClick}
            />
          </ButtonContainerStyled>
        </MainContainerStyled>
      }
      popupWidth={'30%'}
    />
  );
};

export default LogoutConfirmationPopup;
