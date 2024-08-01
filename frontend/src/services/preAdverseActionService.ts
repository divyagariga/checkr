import api from '../api';

export const raisePreAdverseAction = async (candidateId: number,violation:string) => {
  try {
    await api.patch(`api/v1/candidates/${candidateId}/reports/?violation=${encodeURIComponent(violation)}`, {
      adjudication: 'ADVERSE ACTION',
      status:'CONSIDER',
      // params:{
      //   violation:violation
      // }
    },
  );
  } catch (error) {
    return Promise.reject(error);
  }
};


