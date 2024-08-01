import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CandidateDataType,
  CourtSearchDataType,
  InfoBoxDataType,
} from '../../utils/types';
import {
  engageCandidate,
  getCandidateDetails,
} from '../../services/candidateService';
import {
  mapCandidateDataForCandidateInfobox,
  mapReportDataForInfobox,
} from '../../utils/helperFunctions';
import { ROUTES } from '../../utils/constants';
import { raisePreAdverseAction } from '../../services/preAdverseActionService';

export const useCandidateDetailsPage = (id: number) => {
  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState<InfoBoxDataType[]>();
  const [candidateReportData, setCandidateReportData] =
    useState<InfoBoxDataType[]>();
  const [candidateCourtSearchData, setCandidateCourtSearchData] =
    useState<CourtSearchDataType[]>();
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const fetchCandidateData = async () => {
    try {
      const response: CandidateDataType = await getCandidateDetails(id);
      setCandidateName(response.name);
      setCandidateEmail(response.email);
      const candidateDetailedData: InfoBoxDataType[] =
        mapCandidateDataForCandidateInfobox(response);
      setCandidateData(candidateDetailedData);
      const candidateReportData = mapReportDataForInfobox(response.report);
      setCandidateReportData(candidateReportData);
      setCandidateCourtSearchData(response.courtSearches);
    } catch (error) {
      alert(`error occured while fetching candidate data: ${error}`);
    }
  };

  const candidateEngageHandler = async (candidateId: number) => {
    try {
      await engageCandidate(candidateId);
      navigate('/');
    } catch (error) {
      alert(`error while engaging candidate: ${error}`);
    }
  };

  const backButtonClickHandler = () => {
    navigate('/');
  };

  const candidatePreAdverseActionHandler = async (
    candidateId: number,
    candidateName: string,
    candidateEmail: string,
  ) => {
    // try {
      // await raisePreAdverseAction(candidateId);
      navigate(ROUTES.PRE_ADVERSE_ACTION_PAGE, {
        state: { candidateId: candidateId,candidateName: candidateName, candidateEmail: candidateEmail },
      });
    // } catch (error) {
    //   alert(`error while raising pre-adverse action: ${error}`);
    // }
  };

  return {
    candidateData,
    candidateName,
    candidateEmail,
    candidateReportData,
    candidateCourtSearchData,
    candidateEngageHandler,
    backButtonClickHandler,
    candidatePreAdverseActionHandler,
  };
};
