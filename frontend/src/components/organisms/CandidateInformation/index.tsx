import { Box, styled } from '@mui/material';
import React, { ReactNode, memo, useMemo } from 'react';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import theme from '../../../Theme/theme';
import FilterPopup from '../FilterPopup';
import Icon from '../../atoms/Icon';

import {
  CANDIDATE_ACCORDION_HEADING,
  CANDIDATE_TABLE_HEAD,
  RESULTS_FOUND,
  SEARCH_BAR_PLACEHOLDER,
} from '../../../utils/constants';

import SearchIcon from '../../../../public/assets/icons/search.svg';
import MoreIcon from '../../../../public/assets/icons/more.svg';

import {
  CandidateTableDataType,
  ChipLabelVariants,
  FilterPopupVariants,
} from '../../../utils/types';
import Table from '../../molecules/Table';
import Chip from '../../atoms/Chip';
import { formatDate } from '../../../utils/formatters';
import PaginationFooter from '../../molecules/PaginationFooter';
import { useCandidateInformation } from './hooks';
import { FilterTypes } from '../../../utils/enums';

interface CandidateInformationProps {
  filterPopupVariant: FilterPopupVariants;
}
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

export const MainCandidateInformationContainer = styled(Box)({
  backgroundColor: theme.palette.white.main,
  boxShadow: theme.shadows[2],
  borderRadius: '0.375rem',
  height: '91%',
});

const MoreIconContainer = styled(Box)({
  border: `1px solid ${theme.palette.stroke.main}`,
  borderRadius: `0.375rem`,
  backgroundColor: theme.palette.white.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  width: '6.81%',
});

const SearchAndFilterResultsFooter = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  borderRadius: '0rem 0rem 0.5rem 0.5rem',
  padding: '0.625rem 0.75rem',
  alignItems: 'center',
  height: '3.5rem',
});

// eslint-disable-next-line react/display-name
const CandidateInformation =
//  memo(
  ({ filterPopupVariant }: CandidateInformationProps) => {
    const {
      searchText,
      filterTableData,
      candidateDataCount,
      candidateStatusCheckboxes,
      candidateAdjudicationCheckboxes,
      selectedFilters,
      pageNumber,
      paginationRightIconClickHandler,
      paginationLeftIconClickHandler,
      pageNumberIconClickHandler,
      searchTextChangeHandler,
      handleCandidateFilterCheckboxClick,
      candidateNameClickHandler,
    } = useCandidateInformation();

    const getColorForCandidateTable = (index: number) =>
      index % 5 === 0
        ? theme.palette.primary500.main
        : theme.palette.textEmphasis.dark;

    const createChipComponent = (chipContent: ChipLabelVariants) => {
      return <Chip chipLabel={chipContent} />;
    };

    const createTypographyComponentForCandidate = (
      data: string,
      index: number,
      candidateId?: number,
    ): ReactNode => {
      return (
        <Typography
          key={data}
          variant="body2"
          color={getColorForCandidateTable(index)}
          onClick={() => candidateId && candidateNameClickHandler(candidateId)}
          customStyles={{ cursor: index % 5 == 0 ? 'pointer' : 'default' }}
        >
          {data}
        </Typography>
      );
    };

    const renderCandidateData = useMemo(() => {
      const allCandidateData: ReactNode[][] = [];
      filterTableData.forEach(
        (candidateData: CandidateTableDataType, index: number) => {
          if (index > 0) index += 5 - (index % 5);
          const candidateRowData: ReactNode[] = [];
          candidateRowData.push(
            createTypographyComponentForCandidate(
              candidateData.name,
              index++,
              candidateData.id,
            ),
            candidateData.adjudication !== ''
              ? createChipComponent(candidateData.adjudication)
              : '-',
            createChipComponent(candidateData.status),
            createTypographyComponentForCandidate(
              candidateData.location,
              index++,
            ),
            createTypographyComponentForCandidate(
              formatDate(candidateData.date),
              index++,
            ),
          );
          allCandidateData.push(candidateRowData);
        },
      );
      return allCandidateData;
    }, [filterTableData]);

    return (
      <MainCandidateInformationContainer data-testid="candidate-information">
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
              value={searchText}
              handleChange={searchTextChangeHandler}
            />
            <FilterPopup
              variant={filterPopupVariant}
              candidateStatusCheckedOptions={candidateStatusCheckboxes}
              candidateAdjudicationCheckedOptions={
                candidateAdjudicationCheckboxes
              }
              handleCandidateStatusCheckbox={(event) =>
                handleCandidateFilterCheckboxClick(event, FilterTypes.status)
              }
              handleCandidateAdjudicationCheckbox={(event) =>
                handleCandidateFilterCheckboxClick(
                  event,
                  FilterTypes.adjudication,
                )
              }
            />
            <MoreIconContainer>
              <Icon src={MoreIcon} alt="more-icon" />
            </MoreIconContainer>
          </HeaderRightContainer>
        </HeaderContainer>
        <Table
          tableHeadingData={CANDIDATE_TABLE_HEAD}
          tableData={renderCandidateData}
          tableColumnWidth={'100%'}
          tableType="candidate"
        />
        <Box>
          {searchText === '' &&
            selectedFilters.adjudication === '' &&
            selectedFilters.status === '' && (
              <PaginationFooter
                perPageRecordsCount={filterTableData.length}
                totalRecordsCount={candidateDataCount}
                handlePageNumberIconClick={pageNumberIconClickHandler}
                handleLeftArrowIconClick={
                  pageNumber > 0 ? paginationLeftIconClickHandler : undefined
                }
                handleRightArrowIconClick={
                  Math.ceil(candidateDataCount / 10) !== pageNumber
                    ? paginationRightIconClickHandler
                    : undefined
                }
              />
            )}
        </Box>
        {(searchText !== '' ||
          selectedFilters.adjudication !== '' ||
          selectedFilters.status !== '') && (
          <SearchAndFilterResultsFooter>
            <Typography
              variant="caption2"
              color={theme.palette.textEmphasis.dark}
            >
              {filterTableData.length}
            </Typography>
            <Typography
              variant="caption2"
              color={theme.palette.textEmphasis.main}
            >
              {RESULTS_FOUND}
            </Typography>
          </SearchAndFilterResultsFooter>
        )}
      </MainCandidateInformationContainer>
    );
  }
  // ,
// );

export default CandidateInformation;
