import React from 'react';
import { Box, styled } from '@mui/material';
import Typography from '../Typography';
import { ChipLabelVariants } from '../../../utils/types';
import { getChipStylesByLabel } from '../../../utils/helperFunctions';

interface ChipProps {
  chipLabel: ChipLabelVariants;
}

const StyledBox = styled(Box)(
  ({
    backgroundColor,
  }: {
    backgroundColor: React.CSSProperties['backgroundColor'];
  }) => ({
    padding: '4px 12px',
    borderRadius: '4px',
    backgroundColor: backgroundColor,
    width: 'fit-content',
    cursor: 'default',
  }),
);

const Chip: React.FC<ChipProps> = ({ chipLabel }: ChipProps) => {
  const { backgroundColor, color } = getChipStylesByLabel[chipLabel];

  return (
    <StyledBox backgroundColor={backgroundColor} data-testid="chip">
      <Typography color={color} variant={'body2'}>
        {chipLabel}
      </Typography>
    </StyledBox>
  );
};

export default Chip;
