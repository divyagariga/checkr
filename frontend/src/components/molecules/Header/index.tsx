import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';
import theme from '../../../Theme/theme';
import {
  BACK_BUTTON_ALT_TEXT,
  ENGAGE,
  EXPORT,
  MANUAL_ORDER,
  PREADVERSE_ACTION,
} from '../../../utils/constants';
import AddIcon from '../../../../public/assets/icons/add.svg';
import ExportIcon from '../../../../public/assets/icons/export.svg';
import Back from '../../../../public/assets/icons/back.svg';
import { HeaderVariants } from '../../../utils/types';

interface HeaderProps {
  type: HeaderVariants;
  heading: string;
  showBackButton: boolean;
  handleBackButtonClick?: () => void;
  handlePrimaryButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  handleSecondaryButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const HeaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary100.main,
  height: '6%',
  padding: '2px',
});

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});

const StyledTextButton = styled(Button)({
  border: `1px solid ${theme.palette.stroke.main}`,
  backgroundColor: theme.palette.white.main,
  '&:hover': {
    backgroundColor: theme.palette.white.main,
  },
});

const StyledContainedButton = styled(Button)({
  height: '36px',
});

const getButtonProps = (type: HeaderVariants) => {
  return type === 'Main'
    ? {
        primaryLabel: EXPORT,
        secondaryLabel: MANUAL_ORDER,
        primaryStartIcon: <img src={ExportIcon} />,
        secondaryStartIcon: <img src={AddIcon} />,
      }
    : {
        primaryLabel: PREADVERSE_ACTION,
        secondaryLabel: ENGAGE,
      };
};

const Header = ({
  type,
  heading,
  showBackButton,
  handleBackButtonClick,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
}: HeaderProps) => {
  const { primaryLabel, secondaryLabel, primaryStartIcon, secondaryStartIcon } =
    getButtonProps(type);

  return (
    <HeaderContainer data-testid="header">
      <ContentContainer>
        {showBackButton && (
          <Icon
            src={Back}
            alt={BACK_BUTTON_ALT_TEXT}
            handleClick={handleBackButtonClick}
          />
        )}
        <Typography variant={'h1'} color={theme.palette.textEmphasis.dark}>
          {heading}
        </Typography>
      </ContentContainer>
      {type !== 'Plain' && (
        <ButtonContainer>
          <StyledTextButton
            variant="text"
            labelColor={theme.palette.textEmphasis.main}
            labelVariant={'body1'}
            color="white"
            handleClick={handlePrimaryButtonClick}
            label={primaryLabel}
            startIcon={primaryStartIcon}
          />
          <StyledContainedButton
            variant="contained"
            labelColor={theme.palette.white.main}
            labelVariant={'body1'}
            color="primary500"
            handleClick={handleSecondaryButtonClick}
            label={secondaryLabel}
            startIcon={secondaryStartIcon}
          />
        </ButtonContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
