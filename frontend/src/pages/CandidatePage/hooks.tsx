import { useCallback, useState } from 'react';
import { EXPORT_CONFIRMATION_TIMEOUT } from '../../utils/constants';
import { is } from 'date-fns/locale';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCandidateReport, postCandidateData } from '../../services/candidateService';
import { User } from '@auth0/auth0-react';
import { formatISO } from 'date-fns';

export const useCandidatePage = () => {
  const { user } = useAuthContext();

  const [isExportPopupOpen, setIsExportPopupOpen] = useState<boolean>(false);
  const [isCreateCandidatePopupOpen, setIsCreateCandidatePopupOpen] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [isCandidateSuccessPopupOpen, setIsCandidateSuccessPopupOpen] = useState<boolean>(false);
  const [refreshKey, 
    setRefreshKey] = useState<number>(0); // Key to force re-render

  const handleExportReportClick = useCallback(() => {
    setIsExportPopupOpen(!isExportPopupOpen);
  }, [isExportPopupOpen]);

  const handleCreateCandidateClick = useCallback(() => {
    console.log("Create candidate");
    setIsCreateCandidatePopupOpen(!isCreateCandidatePopupOpen);
  }, [isCreateCandidatePopupOpen]);

  const exportReportClickHandler = async (reportFromDate:Date,reportToDate:Date) => {  
  await getCandidateReport(reportFromDate,reportToDate,user?.id);
    onExportCandidateModalClose();
    setIsSuccessPopupOpen(true);
    setTimeout(() => {
      onSuccessModalClose();
    }, EXPORT_CONFIRMATION_TIMEOUT);
  };
  
  

  const onExportCandidateModalClose = useCallback(() => {
    setIsExportPopupOpen(false);
  }, []);

  const onSuccessModalClose = useCallback(() => {
    setIsSuccessPopupOpen(false);
  }, []);
  const onCandidateSuccessModalClose = useCallback(() => {
    setIsCandidateSuccessPopupOpen(false);
  }, []);
  const handleCreateCandidateSubmit = (data: any) => {
    // Add logic to handle candidate creation
    const userId=user?.id;
    const candidateData = { userId,...data};
    console.log("Candidate Data Submitted: ", data);
    postCandidateData(candidateData)
    setIsCreateCandidatePopupOpen(false);
    setIsCandidateSuccessPopupOpen(true);
    setRefreshKey(prevKey => prevKey + 1);
    setTimeout(() => {
      onCandidateSuccessModalClose();
    }, EXPORT_CONFIRMATION_TIMEOUT);
  };
  return {
    isExportPopupOpen,
    refreshKey,
    isSuccessPopupOpen,
    isCandidateSuccessPopupOpen,
    isCreateCandidatePopupOpen,
    handleExportReportClick,
    onExportCandidateModalClose,
    exportReportClickHandler,
    onSuccessModalClose,
    onCandidateSuccessModalClose,
    handleCreateCandidateClick,
    handleCreateCandidateSubmit
  };
};
