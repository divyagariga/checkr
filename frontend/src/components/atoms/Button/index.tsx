import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';
import Typography from '../Typography';
import { ButtonVariants, TypographyVariantType } from '../../../utils/types';
import theme from '../../../Theme/theme';

interface IButtonProps {
  variant: ButtonVariants;
  color: 'primary500' | 'white';
  label?: string;
  labelColor?: string;
  labelVariant?: TypographyVariantType;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  styles?: React.CSSProperties;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface IButtonStyleProps extends IButtonProps {
  height?: string;
  width?: string;
  boxShadow?: string;
  border?: string;
}

const ButtonStyled = styled(MuiButton)<IButtonStyleProps>(
  ({ height, width, boxShadow, border }) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    gap: '0.25rem',
    '&:hover': {
      boxShadow: 'none',
    },
    height: height,
    width: width,
    border: border,
    boxShadow: boxShadow ?? '0px 4px 28px 0px #2D2D2F1A',
    '&.MuiButton-contained.Mui-disabled': {
      background: theme.palette.primary400.main,
      opacity: '56%',
    },
  }),
);

const Button = ({
  variant,
  color,
  label,
  labelVariant,
  labelColor,
  startIcon,
  disabled,
  styles,
  handleClick,
  ...props
}: IButtonStyleProps) => {
  return (
    <ButtonStyled
      data-testid="button"
      variant={variant}
      color={color}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
      disabled={disabled}
      startIcon={startIcon}
      sx={styles}
      onClick={handleClick}
      {...props}
    >
      <Typography variant={labelVariant} color={labelColor}>
        {label}
      </Typography>
    </ButtonStyled>
  );
};

export default Button;
