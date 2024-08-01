import React from 'react';
import {
  InputAdornment,
  TextField as MuiTextField,
  OutlinedTextFieldProps,
  styled,
} from '@mui/material';
import theme from '../../../Theme/theme';

interface ITextFieldProps extends OutlinedTextFieldProps {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: React.ReactNode | React.ReactPortal | null;
  endIcon?: React.ReactNode | React.ReactPortal | null;
  styles?: React.CSSProperties;
  placeholderColor?: string;
  handleValidation?: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  width?: string;
}

interface IStyledTextFeildProps {
  placeholderColor?: string;
  width?: string;
}

const StyledTextField = styled(MuiTextField)(
  ({ placeholderColor, width }: IStyledTextFeildProps) => ({
    width: width,
    '& .MuiInputBase-root input': {
      color: theme.palette.textEmphasis.dark,
      '&::placeholder': {
        color: placeholderColor ?? theme.palette.textEmphasis.light,
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '2.25rem',
      '& fieldset': {
        borderColor: `${theme.palette.stroke.main}`,
      },
      '&:hover fieldset': {
        borderColor: `${theme.palette.stroke.main}`,
      },
      '&.Mui-focused fieldset': {
        borderColor: `${theme.palette.stroke.main}`,
      },
    },
  }),
);

const TextField = ({
  placeholder,
  handleChange,
  handleValidation,
  startIcon,
  styles,
  placeholderColor,
  endIcon,
  ...props
}: ITextFieldProps) => {
  const customStyles = {
    '& .MuiOutlinedInput-root': {
      '&:hover &.fieldset': {
        borderColor: theme.palette.stroke.main,
      },
      '&.Mui-focused &.fieldset': {
        borderColor: theme.palette.stroke.main,
      },
    },
  };
  return (
    <StyledTextField
      data-testid="input-textfield"
      onBlur={handleValidation}
      placeholderColor={placeholderColor}
      placeholder={placeholder}
      onChange={handleChange}
      sx={styles}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
        style: customStyles,
      }}
      inputProps={{
        'data-testid': 'password-input',
      }}
      {...props}
    />
  );
};

export default TextField;
