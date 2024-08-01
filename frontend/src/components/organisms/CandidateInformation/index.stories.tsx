import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import CandidateInformation from '.';

const meta: Meta<typeof CandidateInformation> = {
  title: 'Organisms/CandidateInformation',
  component: CandidateInformation,
};

export default meta;

export const CandidateInformationComponent = () => {
  return (
    <BrowserRouter>
      <CandidateInformation filterPopupVariant="candidate" />
    </BrowserRouter>
  );
};
