import { Box, styled } from '@mui/material';
import React from 'react';
import theme from '../../../Theme/theme';

interface BaseTemplateCandidateDetails {
  isCandidateDetailsPage?: boolean;
}

interface BaseTemplateProps extends BaseTemplateCandidateDetails {
  sideNav: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
}

const StyledMainContainer = styled(Box)(
  ({ isCandidateDetailsPage }: BaseTemplateCandidateDetails) => ({
    display: 'flex',
    padding: '1.5rem',
    backgroundColor: theme.palette.primary100.main,
    gap: '1.5rem',
    height: isCandidateDetailsPage ? '100vh' : '100vh',
  }),
);

const StyledLeftContainer = styled(Box)({
  minWidth: 'fit-content',
  maxWidth: '17.2%',
});

const StyledRightContainer = styled(Box)(
  ({ isCandidateDetailsPage }: BaseTemplateCandidateDetails) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.15rem',
    width: '100%',
    height: isCandidateDetailsPage ? '100%' : '',
    overflowY: 'auto',
  }),
);

const BaseTemplate = ({
  sideNav,
  header,
  content,
  isCandidateDetailsPage,
}: BaseTemplateProps) => {
  return (
    <StyledMainContainer
      isCandidateDetailsPage={isCandidateDetailsPage}
      data-testid="base-template"
    >
      <StyledLeftContainer>{sideNav}</StyledLeftContainer>
      <StyledRightContainer isCandidateDetailsPage={isCandidateDetailsPage}>
        {header}
        {content}
      </StyledRightContainer>
    </StyledMainContainer>
  );
};

export default BaseTemplate;
