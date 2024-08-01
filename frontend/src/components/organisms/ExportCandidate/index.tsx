/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import theme from '../../../Theme/theme';
import {
  DATEPICKER_ERROR_MESSAGE,
  EXPORT_BUTTON,
  EXPORT_CANDIDATE_POPUP_HEAD,
  REPORTS_FROM,
  REPORTS_TO,
} from '../../../utils/constants';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import DatePicker from '../../molecules/DatePicker';
import Modal from '../../molecules/Modal';
import { formatISO } from 'date-fns';

interface IExportCandidateProps {
  isPopupOpen: boolean;
  handleCloseModal: () => void;
  handleExportButtonClick: (reportFromDate:Date,reportToDate:Date) => void;
}

const StyledHeadContainer = styled(Box)({
  display: 'flex',
  paddingLeft: '16px',
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  width: '100%',
  height: '16.6%',
  alignItems: 'center',
});

const StyledMiddleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  height: '66.8%',
  width: '100%',
});

const StyledFooterContainer = styled(StyledHeadContainer)({
  justifyContent: 'flex-end',
  paddingRight: '16px',
});

const StyledExportButton = styled(Button)({
  padding: '0.5rem 1rem',
  boxShadow: `0px 4px 28px 0px ${theme.palette.boxShadowColor.main}`,
  borderRadius: '0.375rem',
  width: '126px',
  height: '36px',
});

const ExportCandidate = ({
  isPopupOpen,
  handleCloseModal,
  handleExportButtonClick,
}: IExportCandidateProps) => {
  const [reportFromDate, setReportFromDate] = useState<Date>(new Date());
  const [reportToDate, setReportToDate] = useState<Date>(new Date());
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    validateDate();
  }, [reportFromDate, reportToDate]);

  const validateDate = () => {
    if ((reportToDate as Date) < (reportFromDate as Date)) {
      setErrorMessage(DATEPICKER_ERROR_MESSAGE);
    } else {
      setErrorMessage('');
    }
  };

  const handleReportFromChange = useCallback(
    (date: Date) => {
      
      // const startDate = new Date(date);
      //   setReportFromDate(startDate);
      const startDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);
      setReportFromDate(startDate);
    },
    [reportFromDate],
  );

  const handleReportToChange = useCallback(
    (date: Date) => {
      const endDate = new Date(date);
      setReportToDate(endDate);    },
    [reportToDate],
  );

  const renderExportCandidateContent = () => {
    return (
      <>
        <StyledHeadContainer data-testid="export-candidate">
          <Typography
            variant={'subtitle1'}
            color={theme.palette.textEmphasis.dark}
          >
            {EXPORT_CANDIDATE_POPUP_HEAD}
          </Typography>
        </StyledHeadContainer>
        <StyledMiddleContainer>
          <DatePicker label={REPORTS_FROM} onChange={handleReportFromChange} />
          <DatePicker
            label={REPORTS_TO}
            onChange={handleReportToChange}
            datePickerHelperText={errorMessage}
          />
        </StyledMiddleContainer>
        <StyledFooterContainer>
          <StyledExportButton
            variant="contained"
            label={EXPORT_BUTTON}
            color="primary500"
            labelColor={theme.palette.white.main}
            labelVariant="body1"
            handleClick={()=>handleExportButtonClick(reportFromDate as Date,reportToDate as Date)}
            disabled={errorMessage !== ''}
          />
        </StyledFooterContainer>
      </>
    
    );
  };

  return (
    <Modal
      isPopupOpen={isPopupOpen}
      handleClose={handleCloseModal}
      innerPopupContent={renderExportCandidateContent()}
      popupWidth={'55%'}
      popupHeight={'50%'}
    />
  );
};

export default ExportCandidate;
