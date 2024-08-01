import React from 'react';
import {
  Box,
  Typography as MuiTypography,
  SxProps,
  Theme,
} from '@mui/material';
import { TypographyVariantType } from '../../../utils/types';

interface TypographyProps {
  variant: TypographyVariantType;
  color?: string;
  customStyles?: SxProps<Theme>;
  children: React.ReactNode;
  onClick?: () => void;
}

const Typography = ({
  variant,
  color,
  customStyles,
  children,
  onClick,
}: TypographyProps) => {
  return (
    <Box onClick={onClick}>
      <MuiTypography variant={variant} color={color} sx={customStyles}>
        {children}
      </MuiTypography>
    </Box>
  );
};

export default Typography;
