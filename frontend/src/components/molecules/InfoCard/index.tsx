import React from 'react';
import { Box, styled } from '@mui/material';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import theme from '../../../Theme/theme';

interface IInfoCardProps {
  infoIcon: string;
  label: string;
  value: string | number | undefined;
  width?: string;
}
const MainContainerStyled = styled(Box)({
  gap: '0.75rem',
  display: 'flex',
  borderRadius: '0.75rem',
  border: `1px solid ${theme.palette.stroke.main}`,
  background: theme.palette.primary50.main,
  padding: '0.75rem',
});

const InternalContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const IconBoxStyled = styled(Box)({
  backgroundColor: theme.palette.white.main,
  borderRadius: '0.75rem',
  border: `1px solid ${theme.palette.stroke.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2.75rem',
  width: '2.75rem',
});

const LabelAndValueContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

const InfoCard = ({ infoIcon, label, value, width }: IInfoCardProps) => {
  return (
    <MainContainerStyled width={width} data-testid="info-card">
      <InternalContainerStyled>
        <IconBoxStyled>
          <Icon src={infoIcon} alt="info-icon" />
        </IconBoxStyled>
      </InternalContainerStyled>
      <LabelAndValueContainerStyled>
        <Typography variant="body2" color={theme.palette.textEmphasis.main}>
          {label}
        </Typography>
        <Typography variant="body1" color={theme.palette.textEmphasis.dark}>
          {value !== '' ? value : '-'}
        </Typography>
      </LabelAndValueContainerStyled>
    </MainContainerStyled>
  );
};

export default InfoCard;
