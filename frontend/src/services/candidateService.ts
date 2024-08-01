const _ = require('lodash');
import api from '../api';
import { getCourtSearchStatus } from '../utils/helperFunctions';
import { CandidateDataType, CandidateTableDataType, CourtSearchDataType } from '../utils/types';
import { formatDate } from '../utils/formatters';
import { ENGAGE_CANDIDATE_STATUS_TEXT } from '../utils/constants';
import axios from 'axios';
import fileSaver from 'file-saver';


export const getCandidateTableData = async (
  userId?: number,
  pageNumber?: number,
  pageLimit?: number,
) => {
  try {
    if (userId !== undefined) {
      const candidateTableData: CandidateTableDataType[] = [];
      const candidateData = await api.get(
        `api/v1/candidates/users/${userId}/candidate-info`,
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageLimit,
          },
        },
      );
      for (const candidateInfo of candidateData.data.content) {
        const candidateTableObject: CandidateTableDataType = {
          id: candidateInfo.id,
          name: candidateInfo.name,
          status: 'CLEAR',
          adjudication: candidateInfo.report.adjudication,
          location: candidateInfo.location,
          date: new Date(),
        };

        const courtSearchStatus = getCourtSearchStatus(
          candidateInfo.courtSearches,
        );
        candidateTableObject.status = courtSearchStatus;

        const mostRecentCourtSearchDate = _.maxBy(
          candidateInfo.courtSearches,
          (search: CourtSearchDataType) => new Date(search.completedAt),
        );
        candidateTableObject.date = formatDate(
          mostRecentCourtSearchDate.completedAt,
        );

        candidateTableData.push(candidateTableObject);
      }
      return candidateTableData;
    } else {
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCandidateResponseCount = async (userId?: number) => {
  try {
    if (userId !== undefined) {
      const candidateResponse = await api.get(
        `api/v1/candidates/users/${userId}/candidate-count`,
      );
      return candidateResponse.data;
    }
    return 0;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getCandidateReport = async (
  reportFromDate: Date,
  reportToDate: Date,
  userId?: number
) => {
  try {
    if (userId !== undefined) {
      // Format dates as ISO strings
      // const formattedReportFromDate = reportFromDate();
      // const formattedReportToDate = reportToDate();

      // console.log("dates", formattedReportFromDate, formattedReportToDate);

      // Include query parameters in the URL
      const url = `api/v1/candidates/users/${userId}/download-excel/`;

      // Make the API call
      const candidateResponse = await api.get(url, {
        responseType: 'arraybuffer',
        params:{
          reportFromDate:reportFromDate,reportToDate:reportToDate
        }
      });
console.log("dates",reportFromDate,reportToDate);
      // Create a Blob and save it using file-saver
      const blob = new Blob([candidateResponse.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, 'candidate_report.xlsx');

      return candidateResponse.data;
    }

    return 0;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const getCandidateReport = async (reportFromDate:Date,reportToDate:Date,userId?: number) => {
//   try {
//     if (userId !== undefined) {
//       console.log("dates",reportFromDate,reportToDate);
//       const candidateResponse = await api.get(
//         `api/v1/candidates/users/${userId}/download-excel`,
//         { responseType: 'arraybuffer' }
//       );
//       var blob = new Blob([candidateResponse.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       fileSaver.saveAs(blob, 'candidate report.xlsx');
//       return candidateResponse.data;
//     }
//     return 0;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

export const getCandidateDetails = async (candidateId: number) => {
  try {
    const candidateDetailsResponse = await api.get(
      `api/v1/candidates/${candidateId}`,
    );
    return candidateDetailsResponse.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCandidateReportData = async (candidateId: number) => {
  try {
    const candidateReportResponse = await api.get(`reports/`, {
      params: { candidateId: candidateId },
    });
    console.log("report ",candidateReportResponse.data[0])
    return candidateReportResponse.data[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCandidateCourtSearches = async (candidateId: number) => {
  try {
    const candidateCourtSearchesResponse = await api.get(`court-searches`, {
      params: { candidateId: candidateId },
    });
    return candidateCourtSearchesResponse.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const engageCandidate = async (candidateId: number) => {
  try {
    await api.patch(`api/v1/candidates/${candidateId}/reports?violation=""`, {
      adjudication: ENGAGE_CANDIDATE_STATUS_TEXT,
      status:'CLEAR'
    });
  } catch (error) {
    return Promise.reject(error);
  }
};


export const postCandidateData = async (candidateData: CandidateDataType) => {
  try {
    const response = await api.post('api/v1/candidates/', candidateData,{
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};