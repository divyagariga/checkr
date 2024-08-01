import {
  CandidateDataType,
  CandidateTableDataType,
  ChipLabelVariants,
  CourtSearchDataType,
  FilterObjectType,
  InfoBoxLabelandIconSrcType,
  ReportDataType,
} from './types';
import { CourtSearchStatusOptions } from './enums';
import theme from '../Theme/theme';
import _ from 'lodash';
import {
  CANDIDATES_ADJUDICATION_FILTER_OPTION_VALUES,
  CANDIDATES_STATUS_FILTER_OPTION_VALUES,
  CANDIDATE_DETAILS_INFOBOX_LABELS_AND_ICONSRC,
  CANDIDATE_REPORT_INFOBOX_LABELS_AND_ICONSRC,
} from './constants';

import { formatDate, formatDateWithTime } from './formatters';

export const getChipStylesByLabel: Record<
  ChipLabelVariants,
  { backgroundColor: string; color: string }
> = {
  CLEAR: {
    backgroundColor: theme.palette.accentGreen.light,
    color: theme.palette.accentGreen.main,
  },
  ENGAGE: {
    backgroundColor: theme.palette.accentGreen.light,
    color: theme.palette.accentGreen.main,
  },
  'ADVERSE ACTION': {
    backgroundColor: theme.palette.accentYellow.light,
    color: theme.palette.accentYellow.main,
  },
  CONSIDER: {
    backgroundColor: theme.palette.accentYellow.light,
    color: theme.palette.accentYellow.main,
  },
  SCHEDULED: {
    backgroundColor: theme.palette.accentBlue.light,
    color: theme.palette.accentBlue.main,
  },
};

export const getNumberOfRecords = (totalRecordCount: number): string => {
  return `out of ${totalRecordCount} results`;
};

export const searchCandidateByName = (
  name: string,
  status: string,
  adjudication: string,
  data: CandidateTableDataType[],
) => {
  const lowercasedName = name.toLowerCase();

  return _.filter(data, (candidate) => {
    const lowercasedCandidateName = candidate.name.toLowerCase();
    const matchesName = lowercasedCandidateName.startsWith(lowercasedName);
    const matchesStatus =
      status === '' || candidate.status.toLowerCase() === status.toLowerCase();
    const matchesAdjudication =
      adjudication === '' ||
      candidate.adjudication.toLowerCase() === adjudication.toLowerCase();

    return matchesName && matchesStatus && matchesAdjudication;
  });
};

export const generateEmailGreeting = (name: string): string => {
  return `Dear ${name},`;
};

export const validateInput = (input: string, regex: RegExp) => {
  return input === '' || !!input.match(regex);
};

export const getCourtSearchStatus = (
  courtSearchData: CourtSearchDataType[],
) => {
  for (const element of courtSearchData) {
    if (
      element.status.toUpperCase() ===
      CourtSearchStatusOptions.consider.toUpperCase()
    ) {
      return CourtSearchStatusOptions.consider;
    }
  }
  return CourtSearchStatusOptions.clear;
};

export const getStatusForCandidateStatusFilter = (
  statusFilterPevState: FilterObjectType,
  currIndex: number,
) => {
  if (statusFilterPevState.prevStatusIndex === currIndex) {
    return statusFilterPevState.status === ''
      ? CANDIDATES_STATUS_FILTER_OPTION_VALUES[currIndex]
      : '';
  }
  return CANDIDATES_STATUS_FILTER_OPTION_VALUES[currIndex];
};

export const getAdjudcicationForCandidateAdjudicationFilter = (
  statusFilterPevState: FilterObjectType,
  currIndex: number,
) => {
  if (statusFilterPevState.prevAdjudicationIndex === currIndex) {
    return statusFilterPevState.adjudication === ''
      ? CANDIDATES_ADJUDICATION_FILTER_OPTION_VALUES[currIndex]
      : '';
  }
  return CANDIDATES_ADJUDICATION_FILTER_OPTION_VALUES[currIndex];
};
export const mapCandidateDataForCandidateInfobox = (
  candidateData: CandidateDataType,
) => {
  const candidateDetailedData =
    CANDIDATE_DETAILS_INFOBOX_LABELS_AND_ICONSRC.map(
      (data: InfoBoxLabelandIconSrcType, index: number) => {
        return {
          ...data,
          value: getCandidateDataValue(index, candidateData),
        };
      },
    );
  return candidateDetailedData;
};

const getCandidateDataValue = (
  index: number,
  candidateData: CandidateDataType,
) => {
  switch (index) {
    case 0:
      return candidateData.name;
    case 1:
      return candidateData.email;
    case 2:
      return formatDate(candidateData.dateOfBirth);
    case 3:
      return candidateData.phone;
    case 4:
      return candidateData.zipCode;
    case 5:
      return candidateData.socialSecurityNumber;
    case 6:
      return candidateData.driverLicense;
    case 7:
      return formatDateWithTime(candidateData.createdAt);
  }
};

export const mapReportDataForInfobox = (reportData: ReportDataType) => {
  console.log("called");
  const candidateReportMappedData =
    CANDIDATE_REPORT_INFOBOX_LABELS_AND_ICONSRC.map((data, index: number) => {
      return {
        ...data,
        value: getCandidateReportValue(reportData, index),
      };
    });
  return candidateReportMappedData;
};

const getCandidateReportValue = (reportData: ReportDataType, index: number) => {
  switch (index) {
    case 0:
      return reportData.status;
    case 1:
      return reportData.adjudication;
    case 2:
      return reportData.packageType;
    case 3:
      return formatDateWithTime(reportData.createdAt);
    case 4:
      return reportData.completedAt?formatDateWithTime(reportData.completedAt):"";
    case 5:
      console.log("hello am here");
      return reportData.turnAroundTime;
     
  }
};

// function calculateTurnAroundTime(startDate: string, endDate: string): string {
//   const startDateTime = new Date(startDate);
//   const endDateTime = new Date(endDate);

//   const timeDifference = Math.abs(
//     endDateTime.getTime() - startDateTime.getTime(),
//   );
//   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//   );
//   let result = '';
//   if (days > 0) {
//     result += `${days} Day${days > 1 ? 's' : ''} `;
//   }
//   if (hours > 0) {
//     result += `${hours} Hour${hours > 1 ? 's' : ''}`;
//   }
//   return result;
// }
function calculateTurnAroundTime(startDate: string, endDate: string): string {
  // Parse the date strings into Date objects
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  // Check if the dates are valid
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    return 'Invalid date';
  }

  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(endDateTime.getTime() - startDateTime.getTime());

  // Convert milliseconds to days and hours
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Build the result string
  let result = '';
  if (days > 0) {
    result += `${days} Day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
    result += `${hours} Hour${hours > 1 ? 's' : ''}`;
  }

  // Trim any trailing whitespace and return the result
  return result.trim() || '0 Hours'; // Return '0 Hours' if both days and hours are 0
}

// Example usage
// console.log(calculateTurnAroundTime("2024-07-26T12:00:00", "2024-07-28T15:00:00")); // Outputs: "2 Days 3 Hours"
// console.log(calculateTurnAroundTime("2024-07-26T12:00:00", "2024-07-26T12:00:00")); // Outputs: "0 Hours"
// console.log(calculateTurnAroundTime("invalid date", "2024-07-26T12:00:00")); // Outputs: "Invalid date"
