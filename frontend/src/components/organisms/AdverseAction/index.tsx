import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import theme from '../../../Theme/theme';
import {
  CANDIDATE_ACCORDION_HEADING,
  SEARCH_BAR_PLACEHOLDER,
  ADVERSE_ACTION_DATA,
  ADVERSE_ACTION_TABLE_HEAD,
  ADVERSE_ACTION_PER_PAGE_COUNT,
  ADVERSE_ACTION_RECORDS_COUNT,
} from '../../../utils/constants';
import { formatDate } from '../../../utils/formatters';
import { ChipLabelVariants, AdverseActionData } from '../../../utils/types';
import Chip from '../../atoms/Chip';
import Icon from '../../atoms/Icon';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import PaginationFooter from '../../molecules/PaginationFooter';
import FilterPopup from '../FilterPopup';
import SearchIcon from '../../../../public/assets/icons/search.svg';
import Table from '../../molecules/Table';
import { MainCandidateInformationContainer } from '../CandidateInformation';

const HeaderContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  padding: '0.75rem 1rem',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  justifyContent: 'space-between',
});

const HeaderRightContainer = styled(Box)({
  display: 'flex',
  gap: '1rem',
});

const AdverseAction = () => {
  const getTextColor = (index: number) =>
    index % 4 === 0
      ? theme.palette.primary500.main
      : theme.palette.textEmphasis.dark;

  const renderChip = (chipContent: ChipLabelVariants) => {
    return <Chip chipLabel={chipContent} />;
  };

  const renderTypography = (data: string, index: number): ReactNode => {
    return (
      <Typography key={data} variant="body2" color={getTextColor(index)}>
        {data}
      </Typography>
    );
  };

  const renderCandidateData = useMemo(() => {
    const allAdverseActionData: ReactNode[][] = [];
    ADVERSE_ACTION_DATA.forEach(
      (
        { name, status, preNoticeDate, postNoticeDate }: AdverseActionData,
        index: number,
      ) => {
        if (index > 0) index += 4 - (index % 4);
        const adverseActionRowData: ReactNode[] = [];
        adverseActionRowData.push(
          renderTypography(name, index++),
          renderChip(status),
          renderTypography(formatDate(preNoticeDate), index++),
          renderTypography(formatDate(postNoticeDate), index++),
        );
        allAdverseActionData.push(adverseActionRowData);
      },
    );
    return allAdverseActionData;
  }, []);

  return (
    <MainCandidateInformationContainer data-testid="adverse-action">
      <HeaderContainer>
        <Typography
          variant={'subtitle1'}
          color={theme.palette.textEmphasis.dark}
        >
          {CANDIDATE_ACCORDION_HEADING}
        </Typography>
        <HeaderRightContainer>
          <TextField
            placeholder={SEARCH_BAR_PLACEHOLDER}
            type="text"
            width={'21.5rem'}
            startIcon={<Icon src={SearchIcon} alt="search-icon" />}
            variant={'outlined'}
          />
          <FilterPopup
            variant={'preadverseActions'}
            candidateStatusCheckedOptions={[]}
            candidateAdjudicationCheckedOptions={[]}
          />
        </HeaderRightContainer>
      </HeaderContainer>
      <Table
        tableHeadingData={ADVERSE_ACTION_TABLE_HEAD}
        tableData={renderCandidateData}
        tableColumnWidth={'100%'}
        tableType="adverse-action"
      />
      <PaginationFooter
        perPageRecordsCount={ADVERSE_ACTION_PER_PAGE_COUNT}
        totalRecordsCount={ADVERSE_ACTION_RECORDS_COUNT}
      />
    </MainCandidateInformationContainer>
  );
};

export default AdverseAction;
