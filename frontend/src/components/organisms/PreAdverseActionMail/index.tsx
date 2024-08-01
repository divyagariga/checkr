import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../Theme/theme';
import { PREADVERSE_ACTION_NOTICE } from '../../../utils/constants';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import Modal from '../../molecules/Modal';
import MailTemplate from '../../templates/MailTemplate';
import CloseIcon from '../../../../public/assets/icons/closeicon.svg';

interface IPreAdverseActionMailProps {
  isOpenPopUp: boolean;
  subjectContent: string[];
  candidateName: string;
  selectedAdverseActions: string[];
  handleClosePopup: () => void;
  handleSubmitButtonClick: () => void;
}

const StyledMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const StyledMailHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  marginBottom: '18px',
});

const StyledAdverseActionsList = styled('ul')({
  marginLeft: '20px',
  color: theme.palette.textEmphasis.main,
});

const PreAdverseActionMail = ({
  isOpenPopUp,
  handleClosePopup,
  handleSubmitButtonClick,
  candidateName,
  subjectContent,
  selectedAdverseActions,
}: IPreAdverseActionMailProps) => {
  const getSelectedAdverseActions = () => {
    return (
      <StyledAdverseActionsList>
        {selectedAdverseActions.map((adverseAction) => {
          return (
            <li key={adverseAction}>
              <Typography
                variant={'caption2'}
                color={theme.palette.textEmphasis.main}
              >
                {adverseAction}
              </Typography>
            </li>
          );
        })}
      </StyledAdverseActionsList>
    );
  };

  const getInnerPopupContent = () => {
    return (
      <StyledMainContainer data-testid="preadverse-mail">
        <StyledMailHeaderBox>
          <Typography
            variant={'subtitle1'}
            color={theme.palette.textEmphasis.dark}
          >
            {PREADVERSE_ACTION_NOTICE}
          </Typography>
          <Icon src={CloseIcon} alt={'close'} handleClick={handleClosePopup} />
        </StyledMailHeaderBox>
        <MailTemplate
          candidateName={candidateName}
          middleContent={getSelectedAdverseActions()}
          topTextVariant={'caption2'}
          subjectContent={subjectContent}
          handleSubmitOrPreviewButtonClick={handleSubmitButtonClick}
          isModalMail={true}
        />
      </StyledMainContainer>
    );
  };
  return (
    <Modal
      isPopupOpen={isOpenPopUp}
      handleClose={handleClosePopup}
      innerPopupContent={getInnerPopupContent()}
      popupWidth={'40%'}
      popupHeight={'85%'}
    />
  );
};

export default PreAdverseActionMail;
