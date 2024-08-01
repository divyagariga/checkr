import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCandidateResponseCount,
  getCandidateTableData,
} from '../../../services/candidateService';
import {
  DEFAULT_CANDIDATE_RECORDS_PER_PAGE,
  INITIAL_CANDIDATE_ADJUDICATION_CHECKBOXES,
  INITIAL_CANDIDATE_STATUS_CHECKBOXES,
} from '../../../utils/constants';
import {
  getAdjudcicationForCandidateAdjudicationFilter,
  getStatusForCandidateStatusFilter,
  searchCandidateByName,
} from '../../../utils/helperFunctions';
import { CandidateTableDataType, FilterObjectType } from '../../../utils/types';
import { FilterTypes } from '../../../utils/enums';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useCandidateInformation = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>('');

  const [candidateTableData, setCandidateTableData] = useState<
    CandidateTableDataType[]
  >([]);
  const [filterTableData, setFilterTableData] = useState<
    CandidateTableDataType[]
  >([]);

  const [selectedFilters, setSelectedFilters] = useState<FilterObjectType>({
    status: '',
    adjudication: '',
  });

  const [pageNumber, setPageNumber] = useState<number>(0);

  const [candidateDataCount, setCandidateDataCount] = useState<number>(0);
  const { user } = useAuthContext();

  const [candidateStatusCheckboxes, setCandidateStatusCheckboxes] = useState<
    boolean[]
  >(INITIAL_CANDIDATE_STATUS_CHECKBOXES);
  const [candidateAdjudicationCheckboxes, setCandidateAdjudicationCheckboxes] =
    useState<boolean[]>(INITIAL_CANDIDATE_ADJUDICATION_CHECKBOXES);

  useEffect(() => {
    const searchCandidateData: CandidateTableDataType[] = searchCandidateByName(
      searchText,
      selectedFilters.status,
      selectedFilters.adjudication,
      candidateTableData,
    );

    setFilterTableData(searchCandidateData);
  }, [candidateTableData, searchText, selectedFilters]);

  useEffect(() => {
    fetchCandidateInformationTableData();
  }, [user, pageNumber]);

  useEffect(() => {
    getCandidateDataCount();
  }, [user]);

  const searchTextChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  const getCandidateDataCount = async () => {
    try {
      const count: number = await getCandidateResponseCount(user?.id);
      setCandidateDataCount(count);
    } catch (error) {
      alert(`error while candidate data count: ${error}`);
    }
  };

  const fetchCandidateInformationTableData = async () => {
    try {
      const data = await getCandidateTableData(
        user?.id,
        pageNumber,
        DEFAULT_CANDIDATE_RECORDS_PER_PAGE,
      );
      setCandidateTableData(data);
      setFilterTableData(data);
    } catch (error) {
      alert(`error while candidate informaton table data: ${error}`);
    }
  };

  const handleCandidateFilterCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: FilterTypes.status | FilterTypes.adjudication,
  ) => {
    const { name } = e.target;
    const index = Number(name);
    if (filterType === FilterTypes.status) {
      const candidateStatusTempCheckboxes: boolean[] =
        candidateStatusCheckboxes.map((_, i: number) =>
          i === index ? !candidateStatusCheckboxes[index] : false,
        );
      setCandidateStatusCheckboxes(candidateStatusTempCheckboxes);
      setSelectedFilters((prevSelectedFilters) => ({
        ...prevSelectedFilters,
        prevStatusIndex: index,
        status: getStatusForCandidateStatusFilter(prevSelectedFilters, index),
      }));
    } else {
      const candidateAdjudicationTempCheckboxes: boolean[] =
        candidateAdjudicationCheckboxes.map((_, i: number) =>
          i === index ? !candidateAdjudicationCheckboxes[index] : false,
        );
      setCandidateAdjudicationCheckboxes(candidateAdjudicationTempCheckboxes);
      setSelectedFilters((prevSelectedFilters) => ({
        ...prevSelectedFilters,
        prevAdjudicationIndex: index,
        adjudication: getAdjudcicationForCandidateAdjudicationFilter(
          prevSelectedFilters,
          index,
        ),
      }));
    }
  };

  const paginationRightIconClickHandler = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const paginationLeftIconClickHandler = useCallback(() => {
    setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  const pageNumberIconClickHandler = useCallback(
    (clickedPageNumber: number) => {
      setPageNumber(clickedPageNumber + 1);
    },
    [],
  );

  const candidateNameClickHandler = (candidateId: number) => {
    navigate(`/candidateDetails/${candidateId}`);
  };

  return {
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
  };
};
