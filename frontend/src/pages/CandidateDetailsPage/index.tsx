import React, { ReactNode, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BaseTemplate from '../../components/templates/BaseTemplate';
import SideNavigationBar from '../../components/organisms/SideNav';
import Header from '../../components/molecules/Header';
import { Box, styled } from '@mui/material';
import Accordion from '../../components/molecules/Accordion';
import {
  CANDIDATE_ACCORDION_HEADING,
  COURT_SEARCH_HEAD,
  COURT_SEARCH_TABLE_HEADING,
  REPORT_ACCORDION_HEADING,
} from '../../utils/constants';
import InfoBox from '../../components/molecules/InfoBox';
import { useCandidateDetailsPage } from './hooks';
import { ChipLabelVariants, CourtSearchDataType } from '../../utils/types';
import Typography from '../../components/atoms/Typography';
import theme from '../../Theme/theme';
import Chip from '../../components/atoms/Chip';
import { formatDate } from '../../utils/formatters';
import Table from '../../components/molecules/Table';

const StyledContentMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  height: '100%',
});

const StyledCourtSearchTableHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '0.5rem',
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  backgroundColor: theme.palette.white.main,
});

const StyledCourtSearchBox = styled(Box)({
  height: '40%',
});

const CandidateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    candidateData,
    candidateName,
    candidateEmail,
    candidateReportData,
    candidateCourtSearchData,
    candidateEngageHandler,
    backButtonClickHandler,
    candidatePreAdverseActionHandler,
  } = useCandidateDetailsPage(Number(id));

  const createChipComponent = (chipContent: ChipLabelVariants) => {
    return <Chip chipLabel={chipContent} />;
  };

  const createTypographyComponentForCourtSearch = (
    data: string,
    index: number,
  ): ReactNode => {
    return (
      <Typography variant="body2" color={getColorForCourtSearchTable(index)}>
        {data}
      </Typography>
    );
  };

  const getColorForCourtSearchTable = (index: number) => {
    if (index % 3 == 0) {
      return theme.palette.primary500.main;
    } else {
      return theme.palette.textEmphasis.dark;
    }
  };

  const renderCourtSearchDataTable = useMemo(() => {
    const allCourtSearchData: ReactNode[][] = [];
    candidateCourtSearchData?.forEach(
      (courtSearchData: CourtSearchDataType, index: number) => {
        index += 3 - (index % 3);
        const eachCourtSearchData: ReactNode[] = [];
        eachCourtSearchData.push(
          createTypographyComponentForCourtSearch(
            courtSearchData.violation,
            index++,
          ),
          createChipComponent(courtSearchData.status),
          createTypographyComponentForCourtSearch(
            formatDate(courtSearchData.completedAt),
            index++,
          ),
        );
        allCourtSearchData.push(eachCourtSearchData);
      },
    );
    return allCourtSearchData;
  }, [candidateCourtSearchData]);

  const renderContent = () => {
    return (
      <StyledContentMainContainer>
        <Accordion heading={CANDIDATE_ACCORDION_HEADING}>
          <InfoBox infoBoxData={candidateData} />
        </Accordion>
        <Accordion heading={REPORT_ACCORDION_HEADING}>
          <InfoBox infoBoxData={candidateReportData} />
        </Accordion>
        <StyledCourtSearchBox>
          <StyledCourtSearchTableHeader>
            <Typography
              variant="subtitle1"
              color={theme.palette.textEmphasis.dark}
            >
              {COURT_SEARCH_TABLE_HEADING}
            </Typography>
          </StyledCourtSearchTableHeader>
          <Table
            tableHeadingData={COURT_SEARCH_HEAD}
            tableData={renderCourtSearchDataTable}
            tableColumnWidth={'20%'}
            tableType="court-search"
          />
        </StyledCourtSearchBox>
      </StyledContentMainContainer>
    );
  };

  return (
    <Box data-testid="candidate-details-page">
      <BaseTemplate
        sideNav={<SideNavigationBar />}
        header={
          <Header
            type={'Detailed'}
            heading={candidateName}
            showBackButton={true}
            handlePrimaryButtonClick={() =>
              candidatePreAdverseActionHandler(
                Number(id),
                candidateName,
                candidateEmail,
              )
            }
            handleSecondaryButtonClick={() =>
              candidateEngageHandler(Number(id))
            }
            handleBackButtonClick={backButtonClickHandler}
          />
        }
        content={renderContent()}
        isCandidateDetailsPage={true}
      />
    </Box>
  );
};

export default CandidateDetailsPage;
