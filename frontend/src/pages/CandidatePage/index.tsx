import React, { useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { useCandidatePage } from './hooks';
import BaseTemplate from '../../components/templates/BaseTemplate';
import SideNavigationBar from '../../components/organisms/SideNav';
import Header from '../../components/molecules/Header';
import CandidateInformation from '../../components/organisms/CandidateInformation';
import ExportCandidate from '../../components/organisms/ExportCandidate';
import Modal from '../../components/molecules/Modal';
import Animation from '../../components/atoms/Animation';
import Typography from '../../components/atoms/Typography';
import { CREATED_CANDIDATE_SUCCESS_MESSAGE, EXPORT_SUCCESS_MESSAGE, PAGE_HEADINGS } from '../../utils/constants';
import theme from '../../Theme/theme';
import TickMark from '../../../public/assets/gif/success-tick-mark.gif';
import CreateCandidateForm from '../../components/organisms/CandidateForm';
import Icon from '../../components/atoms/Icon';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from '../../contexts/AuthContext';

const StyledConfirmationContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const StyledCloseButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const renderConfirmationPopupChild = (message:string) => {
  return (
    <StyledConfirmationContainer>
      <Animation src={TickMark} alt={'success'} />
      <Typography variant={'h2'} color={theme.palette.textEmphasis.dark}>
        {message}
      </Typography>
    </StyledConfirmationContainer>
  );
};

const CandidatePage = () => {
  const {
    isExportPopupOpen,
    refreshKey,
    isSuccessPopupOpen,
    isCandidateSuccessPopupOpen,
    isCreateCandidatePopupOpen,
    handleExportReportClick,
    onExportCandidateModalClose,
    exportReportClickHandler,
    onSuccessModalClose,
    onCandidateSuccessModalClose,
    handleCreateCandidateClick,
    handleCreateCandidateSubmit
  } = useCandidatePage();

  // const MemoizedExportCandidate = ExportCandidate
  const { user } = useAuthContext();
console.log("user",user?.id);
  return (
    <Box data-testid="candidate-page">
      <BaseTemplate
        sideNav={<SideNavigationBar />}
        header={
          <Header
            type={'Main'}
            heading={PAGE_HEADINGS.CANDIDATE}
            showBackButton={false}
            handlePrimaryButtonClick={handleExportReportClick}
            handleSecondaryButtonClick={handleCreateCandidateClick}
          />
        }
        content={<CandidateInformation filterPopupVariant={'candidate'}
        key={refreshKey} // Conditional key to force re-render
        />}
      />
      {isExportPopupOpen && (
        <ExportCandidate
          isPopupOpen={isExportPopupOpen}
          handleExportButtonClick={exportReportClickHandler}
          handleCloseModal={onExportCandidateModalClose}
        />
      )}
      {isSuccessPopupOpen && (
        <Modal
          isPopupOpen={isSuccessPopupOpen}
          handleClose={onSuccessModalClose}
          innerPopupContent={renderConfirmationPopupChild(EXPORT_SUCCESS_MESSAGE)}
          popupWidth={'50.95%'}
          popupHeight={'50.2%'}
        />
      )}
{isCandidateSuccessPopupOpen && (
        <Modal
          isPopupOpen={isCandidateSuccessPopupOpen}
          handleClose={onCandidateSuccessModalClose}
          innerPopupContent={renderConfirmationPopupChild(CREATED_CANDIDATE_SUCCESS_MESSAGE)}
          popupWidth={'50.95%'}
          popupHeight={'50.2%'}
        />
      )}
      {isCreateCandidatePopupOpen && (
        <Modal
          isPopupOpen={isCreateCandidatePopupOpen}
          handleClose={handleCreateCandidateClick}
          innerPopupContent={
            <>
            <StyledCloseButtonContainer>
              <IconButton onClick={handleCreateCandidateClick}>
                <CloseIcon/>
                </IconButton>
                </StyledCloseButtonContainer>
              <CreateCandidateForm onSubmit={handleCreateCandidateSubmit} />
              </>
            }
          popupWidth={'50.95%'}
          popupHeight={'50.2%'}
        />
      )}
    </Box>
  );
};

export default CandidatePage;
