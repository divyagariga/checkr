import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import theme from '../../../Theme/theme';

interface IPopupContentProps {
  popupWidth: string;
  popupHeight?: string;
}

interface IPopupProps extends IPopupContentProps {
  isPopupOpen: boolean;
  handleClose?: () => void;
  innerPopupContent: React.ReactNode;
}

const CustomPopoverStyled = styled(Popover)(
  ({ popupWidth, popupHeight }: IPopupContentProps) => ({
    backgroundColor: theme.palette.overlay.main,
    '& .MuiPaper-root': {
      width: popupWidth,
      height: popupHeight,
      borderRadius: '.5rem',
    },
  }),
);

const Modal = ({
  isPopupOpen,
  handleClose,
  popupHeight,
  popupWidth,
  innerPopupContent,
}: IPopupProps) => {
  return (
    <CustomPopoverStyled
      data-testid="pop-over"
      open={isPopupOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      popupWidth={popupWidth}
      popupHeight={popupHeight}
    >
      {innerPopupContent}
    </CustomPopoverStyled>
  );
};

export default Modal;
