import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, styled } from '@mui/material';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import Animation from '../../components/atoms/Animation';
import BaseTemplate from '../../components/templates/BaseTemplate';
import Checkbox from '../../components/atoms/Checkbox';
import Header from '../../components/molecules/Header';
import SideNavigationBar from '../../components/organisms/SideNav';
import Typography from '../../components/atoms/Typography';
import MailTemplate, {
  StyledMainTemplateBox,
} from '../../components/templates/MailTemplate';
import Modal from '../../components/molecules/Modal';
import PreAdverseActionModal from '../../components/organisms/PreAdverseActionMail';
import theme from '../../Theme/theme';
import TickMark from '../../../public/assets/gif/success-tick-mark.gif';
import {
  PREADVERSE_ACTION_MAIL_SUBJECT,
  PAGE_HEADINGS,
  PRE_ADVERSE_ACTION_CHARGES_CAPTION,
  ALL_CHARGES,
  MAIL_SENT_SUCCESS_MESSAGE,
  ROUTES,
} from '../../utils/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { raisePreAdverseAction } from '../../services/preAdverseActionService';

const StyledColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledBody = styled(StyledColumnBox)({
  gap: '8px',
});

const StyledCharge = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledSuccessMessage = styled(StyledColumnBox)({
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const PreAdverseActionPage = () => {
  const location = useLocation();
  const { candidateId,candidateName, candidateEmail } = location?.state ?? {
    candidateId:0,
    candidateName: '',
    candidateEmail: '',
  };
  const navigate: NavigateFunction = useNavigate();
  const [selectedCharges, setSelectedCharges] = useState<string[]>([]);
  const [isPreviewNoticeOpen, setIsPreviewNoticeOpen] =
    useState<boolean>(false);
  const [isSuccessfulModalOpen, setIsSuccessfulModalOpen] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { user } = useAuthContext();

  useEffect(() => {
    setIsButtonDisabled(selectedCharges.length === 0);
  }, [selectedCharges]);

  const handlePreviewNoticeClick = useCallback(() => {
    setIsPreviewNoticeOpen(!isPreviewNoticeOpen);
  }, [setIsPreviewNoticeOpen, isPreviewNoticeOpen]);

  const handleSubmitNoticeClick = useCallback(async () => {
    handlePreviewNoticeClick();
    console.log("submit notice");
    try {
      await raisePreAdverseAction(candidateId,selectedCharges.join(', '));
      setIsSuccessfulModalOpen(true);
      setTimeout(() => {
        setIsSuccessfulModalOpen(false);
        navigate(ROUTES.CANDIDATE_PAGE);
      }, 3000);
    } catch (error) {
      alert(`error while raising pre-adverse action: ${error}`);
    }
  }, [handlePreviewNoticeClick, navigate, setIsSuccessfulModalOpen]);

  const handleCheckBoxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target;

      setSelectedCharges((prevState) => {
        if (checked) {
          return [...prevState, name];
        } else {
          return prevState.filter((selectedCharge) => selectedCharge !== name);
        }
      });
    },
    [setSelectedCharges],
  );

  const renderMiddleContent = useMemo(() => {
    return (
      <StyledBody>
        <Typography
          variant={'caption3'}
          color={theme.palette.textEmphasis.dark}
        >
          {PRE_ADVERSE_ACTION_CHARGES_CAPTION}
        </Typography>
        <StyledColumnBox>
          {ALL_CHARGES.map((charge: string) => (
            <StyledCharge key={charge}>
              <Checkbox
                name={charge}
                onChange={(event) => handleCheckBoxClick(event)}
              />
              <Typography
                variant={'caption2'}
                color={theme.palette.textEmphasis.main}
              >
                {charge}
              </Typography>
            </StyledCharge>
          ))}
        </StyledColumnBox>
      </StyledBody>
    );
  }, [handleCheckBoxClick]);

  const renderSuccessMessage = (content: string) => {
    return (
      <StyledSuccessMessage>
        <Animation src={TickMark} alt={'success'} />
        <Typography variant={'h2'} color={theme.palette.textEmphasis.dark}>
          {content}
        </Typography>
      </StyledSuccessMessage>
    );
  };
  return (
    <>
      <BaseTemplate
        sideNav={<SideNavigationBar />}
        header={
          <Header
            type={'Plain'}
            heading={PAGE_HEADINGS.PRE_ADVERSE_ACTION}
            showBackButton={true}
            handleBackButtonClick={() => {
              navigate(-1);
            }}
          />
        }
        content={
          <StyledMainTemplateBox data-testid="notice">
            <MailTemplate
              candidateName={candidateName}
              topTextVariant={'caption2'}
              subjectContent={[
                user?.email,
                candidateEmail,
                PREADVERSE_ACTION_MAIL_SUBJECT,
              ]}
              middleContent={renderMiddleContent}
              isModalMail={false}
              handleSubmitOrPreviewButtonClick={handlePreviewNoticeClick}
              isDisable={isButtonDisabled}
            />
            <PreAdverseActionModal
              data-testid="pre-adverse-action-modal"
              isOpenPopUp={isPreviewNoticeOpen}
              subjectContent={[
                user?.email,
                candidateEmail,
                PREADVERSE_ACTION_MAIL_SUBJECT,
              ]}
              candidateName={candidateName}
              selectedAdverseActions={selectedCharges}
              handleClosePopup={handlePreviewNoticeClick}
              handleSubmitButtonClick={handleSubmitNoticeClick}
            />
          </StyledMainTemplateBox>
        }
      />
      <Modal
        isPopupOpen={isSuccessfulModalOpen}
        innerPopupContent={renderSuccessMessage(MAIL_SENT_SUCCESS_MESSAGE)}
        popupWidth={'40%'}
        popupHeight={'50%'}
      />
    </>
  );
};

export default React.memo(PreAdverseActionPage);
