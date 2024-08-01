import { Box, styled } from '@mui/material';
import theme from '../../../Theme/theme';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';

interface NavBarItemProps {
  iconSrc: string;
  label: string;
  isNavBarItemSelected: boolean;
  handleClick: () => void;
}

const NavItemContainer = styled(Box)(
  ({ isNavBarItemSelected }: { isNavBarItemSelected: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 51px 10px 12px',
    backgroundColor: isNavBarItemSelected
      ? theme.palette.primary300.main
      : theme.palette.white.dark,
    borderRadius: '6px',
    cursor: 'pointer',
  }),
);

const NavBarItem = ({
  iconSrc,
  label,
  isNavBarItemSelected,
  handleClick,
}: NavBarItemProps) => {
  const labelColor = isNavBarItemSelected
    ? theme.palette.primary500.main
    : theme.palette.textEmphasis.dark;
  return (
    <NavItemContainer
      isNavBarItemSelected={isNavBarItemSelected}
      onClick={handleClick}
      data-testid="navbar-item"
    >
      <Icon src={iconSrc} alt={label} />
      <Typography variant={'body1'} color={labelColor}>
        {label}
      </Typography>
    </NavItemContainer>
  );
};

export default NavBarItem;
