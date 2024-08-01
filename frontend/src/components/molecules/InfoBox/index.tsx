import React from 'react';
import { InfoBoxDataType } from '../../../utils/types';
import { Grid, styled } from '@mui/material';
import theme from '../../../Theme/theme';
import InfoCard from '../InfoCard';

interface InfoBoxInterface {
  boxWidth?: string;
  infoBoxData?: InfoBoxDataType[];
}

const MainContainer = styled(Grid)({
  display: 'flex',
  backgroundColor: theme.palette.white.main,
  padding: '0.25rem 1rem 1.25rem 0rem',
  marginLeft: '0px',
  width: '100%',
  borderTop: `1px solid ${theme.palette.stroke.main}`,
  marginTop: '0px',
  borderRadius: '4px',
});

const InfoBox = ({ infoBoxData, boxWidth }: InfoBoxInterface) => {
  return (
    <MainContainer
      container
      spacing={2}
      width={boxWidth}
      data-testid="info-box"
    >
      {infoBoxData?.map((data: InfoBoxDataType) => (
        <Grid item key={data.label} sm={6} md={4} lg={4}>
          <InfoCard
            label={data.label}
            value={data.value}
            infoIcon={data.infoIconSrc}
            key={data.label}
          />
        </Grid>
      ))}
    </MainContainer>
  );
};

export default InfoBox;
