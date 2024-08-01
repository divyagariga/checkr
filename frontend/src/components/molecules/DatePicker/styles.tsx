import { IconButton, styled } from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import theme from '../../../Theme/theme';

export const StyledIconButton = styled(IconButton)({
  border: `1px solid ${theme.palette.stroke.main}`,
  borderRadius: 4,
  background: theme.palette.white.main,
  padding: 10,
});

export const StyledDatePicker = styled(DesktopDatePicker)({
  '.css-frragy-MuiInputBase-root-MuiOutlinedInput-root': {
    border: `1px solid ${theme.palette.stroke.main}`,
  },
  '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '8px 12px',
    color: theme.palette.textEmphasis.main,
  },
  '.css-dcw14o-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
    borderRadius: 0,
  },
  '.css-epd502': {
    maxWidth: 290,
  },
  '.css-12pp0ud-MuiPaper-root-MuiPickersPopper-paper .MuiPickersCalendarHeader-root:first-child':
    {
      padding: 0,
    },
});

export const PopperPropsStyles = {
  sx: {
    '.css-10mxwnt-MuiPopper-root-MuiPickersPopper-root': {
      paddingLeft: 29,
      marginTop: 8,
    },
    '.css-14frmcy-MuiFormControl-root-MuiTextField-root': {
      width: '336px',
    },
    '.MuiPickersCalendarHeader-root': {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      color: theme.palette.textEmphasis.main,
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '21px',
    },
    '.MuiPickersCalendarHeader-root:first-of-type': {
      order: 0,
      paddingRight: '20px',
      paddingLeft: '20px',
    },
    '.MuiPickersArrowSwitcher-root': {
      display: 'inline-flex',
      color: theme.palette.textEmphasis.main,
    },
    '.MuiPickersCalendarHeader-label': {
      color: theme.palette.textEmphasis.dark,
      fontSize: '15px',
      marginRight: 0,
    },
    '.MuiPickersArrowSwitcher-spacer': {
      width: '206px',
    },
    '.css-31ca4x-MuiPickersFadeTransitionGroup-root': {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    '.css-9reuh9-MuiPickersArrowSwitcher-root': {
      marginLeft: '-2px',
    },
    '.MuiPickersArrowSwitcher-button': {
      paddingRight: '7px',
    },
    '.MuiPickersDay-dayWithMargin': {
      borderRadius: '4px',
    },
    '.css-kjeqyd-PrivatePickersYear-button.Mui-selected ': {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary500.main,
    },
    '.css-1lweomd-MuiTypography-root-PrivatePickersMonth-root.Mui-selected': {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary500.main,
    },
    '.css-1vflo3j-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary500.main,
    },
    '.MuiPickersCalendarHeader-switchViewIcon': {
      display: 'none',
    },
    '.MuiPickersCalendarHeader-switchViewButton': {
      display: 'none',
    },
  },
};

export const PaperPropsStyles = {
  sx: {
    '&.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPickersPopper-paper':
      {
        boxShadow: '0px 4px 8px 0px rgba(5, 27, 68, 0.08)',
        marginTop: '8px',
        marginLeft: '29px',
      },
  },
};
