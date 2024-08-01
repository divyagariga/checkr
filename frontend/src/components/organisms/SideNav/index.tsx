import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Icon from '../../atoms/Icon';
import Avatar from '../../atoms/Avatar';
import Typography from '../../atoms/Typography';
import NavBarItem from '../../molecules/NavBarItem';
import LogoImage from '../../../../public/assets/images/logo.svg';
// import ProfileImage from '../../../../public/assets//images/avatar.svg';
import Profile from '../../../../public/assets//images/avatar.png';
import LogoutIcon from '../../../../public/assets/icons/logout.svg';
import {
  LOGOUT,
  RECRUIT,
  ROUTES,
  SIDE_NAV_DATA,
} from '../../../utils/constants';
import theme from '../../../Theme/theme';
import LogoutConfirmationPopup from '../LogoutConfirmationPopup';
import { useAuthContext } from '../../../contexts/AuthContext';

const SideNavigationBarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
  width: 'fit-content',
  padding: '16px',
  boxShadow: `0px 4px 28px 0px ${theme.palette.boxShadowColor.main}`,
  height: '95vh',
  borderRadius: '8px',
  backgroundColor: theme.palette.white.main,
});

const NavBarItemsContainer = styled(Box)({
  paddingBottom: '11px',
});

const LogoContainer = styled(Box)({
  alignItems: 'center',
  padding: '12px 0px 20px 15px',
});

const ProfileBox = styled(Box)({
  borderTop: `1px solid ${theme.palette.stroke.main}`,
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3px',
});

const UserDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const LogoutContainer = styled(Box)({
  paddingLeft: '27px',
  marginTop: '.5rem',
});

const SideNavigationBar = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState<string>(
    location.pathname === ROUTES.ADVERSE_ACTION_PAGE
      ? SIDE_NAV_DATA[2].label
      : SIDE_NAV_DATA[1].label,
  );
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleNavItemClick = (label: string) => {
    if (label === SIDE_NAV_DATA[1].label || label === SIDE_NAV_DATA[2].label) {
      setActiveNavItem(label);
      handleTabNavigation(label);
    }
  };

  const handleTabNavigation = (label: string) => {
    if (label === SIDE_NAV_DATA[1].label) navigate(ROUTES.CANDIDATE_PAGE);
    if (label === SIDE_NAV_DATA[2].label) navigate(ROUTES.ADVERSE_ACTION_PAGE);
  };
  const logoutHandler = () => {
    setIsLogoutOpen(true);
  };
  const handleLogoutConfirmationPopupClose = () => {
    setIsLogoutOpen(false);
  };
  return (
    <>
      <SideNavigationBarContainer data-testid="navbar">
        <Box>
          <LogoContainer>
            <Icon src={LogoImage} alt={RECRUIT} />
          </LogoContainer>
          {SIDE_NAV_DATA?.map((item) => {
            return (
              <NavBarItemsContainer key={item.id}>
                <NavBarItem
                  iconSrc={item.iconSrc}
                  label={item.label}
                  isNavBarItemSelected={activeNavItem === item.label}
                  handleClick={() => handleNavItemClick(item.label)}
                />
              </NavBarItemsContainer>
            );
          })}
        </Box>
        <ProfileBox>
          <Avatar src={Profile} />
          <UserDetails>
            <Typography
              variant={'body1'}
              color={theme.palette.textEmphasis.dark}
            >
              {user?.name}
            </Typography>
            <Typography
              variant={'caption2'}
              color={theme.palette.textEmphasis.light}
            >
              {user?.email}
            </Typography>
          </UserDetails>
          <LogoutContainer>
            <Icon src={LogoutIcon} alt={LOGOUT} handleClick={logoutHandler} />
          </LogoutContainer>
        </ProfileBox>
      </SideNavigationBarContainer>
      <LogoutConfirmationPopup
        isOpen={isLogoutOpen}
        handleCloseModal={handleLogoutConfirmationPopupClose}
      />
    </>
  );
};

export default SideNavigationBar;
