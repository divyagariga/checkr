import type { Meta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';

import Modal from '.';
import Animation from '../../atoms/Animation';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';

import theme from '../../../Theme/theme';

import {
  CANCEL_BUTTON,
  CLICKED_PAGINATION_ICONS,
  CONFIRM_LOGOUT_HEADER,
  EXPORT_BUTTON,
  EXPORT_CANDIDATE_POPUP_HEAD,
  EXPORT_SUCCESS_MESSAGE,
  LOGOUT_BUTTON,
  LOGOUT_CONFIRMATION_MESSAGE,
  MAIL_SENT_SUCCESS_MESSAGE,
  OTP_SUCCESS_MESSAGE,
  REPORTS_FROM,
  REPORTS_TO,
} from '../../../utils/constants';

import TickMark from '../../../../public/assets/gif/success-tick-mark.gif';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
};

const handleClickAction = action(CLICKED_PAGINATION_ICONS);

export default meta;

const getSuccessMessage = (content: string) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Animation src={TickMark} alt={'success'} />
      <Typography variant={'h2'} color={theme.palette.textEmphasis.dark}>
        {content}
      </Typography>
    </Box>
  );
};

export const OtpSuccessModal = () => {
  return (
    <Modal
      isPopupOpen={true}
      handleClose={handleClickAction}
      innerPopupContent={getSuccessMessage(OTP_SUCCESS_MESSAGE)}
      popupWidth={'60%'}
      popupHeight={'50%'}
    />
  );
};

export const MailSentSuccessModal = () => {
  return (
    <Modal
      isPopupOpen={true}
      handleClose={handleClickAction}
      innerPopupContent={getSuccessMessage(MAIL_SENT_SUCCESS_MESSAGE)}
      popupWidth={'60%'}
      popupHeight={'50%'}
    />
  );
};

export const ExportSuccessModal = () => {
  return (
    <Modal
      isPopupOpen={true}
      handleClose={handleClickAction}
      innerPopupContent={getSuccessMessage(EXPORT_SUCCESS_MESSAGE)}
      popupWidth={'60%'}
      popupHeight={'50%'}
    />
  );
};

const getExportCandidateContent = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'flex-start',
          paddingLeft: '16px',
          borderBottom: `1px solid ${theme.palette.stroke.main}`,
          alignItems: 'center',
          width: '100%',
          height: '56px',
        }}
      >
        <Typography
          variant={'subtitle1'}
          color={theme.palette.textEmphasis.dark}
        >
          {EXPORT_CANDIDATE_POPUP_HEAD}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: `1px solid ${theme.palette.stroke.main}`,
          height: '340px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '325px',
            height: '64px',
          }}
        >
          <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
            {REPORTS_FROM}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '325px',
            height: '64px',
          }}
        >
          <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
            {REPORTS_TO}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: '16px',
          height: '63px',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          label={EXPORT_BUTTON}
          styles={{
            padding: '0.5rem 1rem',
            boxShadow: '0px 4px 28px 0px #2D2D2F1A',
            borderRadius: '0.375rem',
            width: '126px',
            height: '36px',
          }}
          color="primary500"
          labelColor={theme.palette.white.main}
          labelVariant="body1"
        />
      </Box>
    </>
  );
};

export const ExportCandidatesModal = () => {
  return (
    <Modal
      isPopupOpen={true}
      handleClose={handleClickAction}
      innerPopupContent={getExportCandidateContent()}
      popupWidth={'60%'}
      popupHeight={'50%'}
    />
  );
};

const getLogoutContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '12px',
        justifyContent: 'start',
      }}
    >
      <Typography variant={'h1'} color={theme.palette.textEmphasis.dark}>
        {CONFIRM_LOGOUT_HEADER}
      </Typography>
      <Typography variant={'body2'} color={theme.palette.textEmphasis.main}>
        {LOGOUT_CONFIRMATION_MESSAGE}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'flex-end',
          marginTop: '40px',
        }}
      >
        <Button
          variant="contained"
          label={CANCEL_BUTTON}
          styles={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            width: '79px',
            height: '36px',
            border: `1px solid ${theme.palette.stroke.main}`,
          }}
          color="white"
          labelColor={theme.palette.textEmphasis.main}
          labelVariant="body1"
        />
        <Button
          variant="contained"
          label={LOGOUT_BUTTON}
          styles={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            width: '79px',
            height: '36px',
          }}
          color="primary500"
          labelColor={theme.palette.white.main}
          labelVariant="body1"
        />
      </Box>
    </Box>
  );
};

export const ConfirmLogoutModal = () => {
  return (
    <Modal
      isPopupOpen={true}
      handleClose={handleClickAction}
      innerPopupContent={getLogoutContent()}
      popupWidth={'35%'}
      popupHeight={'20%'}
    />
  );
};
