import Typography from '../../atoms/Typography';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import Table from '.';
import theme from '../../../Theme/theme';
import {
  CANDIDATE_TABLE_DATA,
  CANDIDATE_TABLE_HEAD,
  COURT_SEARCH_DATA,
  COURT_SEARCH_HEAD,
} from '../../../utils/constants';
import {
  CandidateTableDataType,
  ChipLabelVariants,
  CourtSearchDataType,
} from '../../../utils/types';
import Chip from '../../atoms/Chip';
import { formatDate } from '../../../utils/formatters';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const createChipComponent = (chipContent: ChipLabelVariants) => {
  return <Chip chipLabel={chipContent} />;
};

const createTypographyComponentForCandidate = (
  data: string,
  index: number,
): ReactNode => {
  return (
    <Typography variant="body2" color={getColorForCandidateTable(index)}>
      {data}
    </Typography>
  );
};

const getColorForCandidateTable = (index: number) => {
  if (index % 5 == 0) {
    return theme.palette.primary500.main;
  } else {
    return theme.palette.textEmphasis.dark;
  }
};

const getCandidateData = () => {
  const allCandidateData: ReactNode[][] = [];
  CANDIDATE_TABLE_DATA.forEach(
    (candidateData: CandidateTableDataType, index: number) => {
      if (index > 0) index += 5 - (index % 5);
      const candidateRowData: ReactNode[] = [];
      candidateRowData.push(
        createTypographyComponentForCandidate(candidateData.name, index++),
        candidateData.adjudication != ''
          ? createChipComponent(candidateData.adjudication)
          : '-',
        createChipComponent(candidateData.status),
        createTypographyComponentForCandidate(candidateData.location, index++),
        createTypographyComponentForCandidate(
          formatDate(candidateData.date),
          index++,
        ),
      );
      allCandidateData.push(candidateRowData);
    },
  );
  return allCandidateData;
};

const CandidateTableData = getCandidateData();

export const CandidateTable: Story = {
  args: {
    tableData: CandidateTableData,
    tableHeadingData: CANDIDATE_TABLE_HEAD,
    tableColumnWidth: '180px',
  },
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

const getCourtSearchData = () => {
  const allCourtSearchData: ReactNode[][] = [];
  COURT_SEARCH_DATA.forEach(
    (courtSearchData: CourtSearchDataType, index: number) => {
      index += 3 - (index % 3);
      const eachCourtSearchData: ReactNode[] = [];
      eachCourtSearchData.push(
        createTypographyComponentForCourtSearch(
          courtSearchData.searchCategory,
          index++,
        ),
        createChipComponent(courtSearchData.status),
        createTypographyComponentForCourtSearch(
          formatDate(courtSearchData.date),
          index++,
        ),
      );
      allCourtSearchData.push(eachCourtSearchData);
    },
  );
  return allCourtSearchData;
};

const CourtSearchData = getCourtSearchData();

export const CourtSearchTable: Story = {
  args: {
    tableData: CourtSearchData,
    tableHeadingData: COURT_SEARCH_HEAD,
    tableColumnWidth: '220px',
  },
};
