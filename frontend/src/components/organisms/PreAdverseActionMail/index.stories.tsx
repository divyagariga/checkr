import type { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PreAdverseActionMail from '.';
import {
  ASSAULT_DOMESTIC_VIOLENCE,
  DRIVING_WHILE_LICENSE_SUSPENDED,
  PREADVERSE_ACTION_MAIL_SUBJECT,
  SAMPLE_CANDIDATE_NAME,
  SAMPLE_FROM_EMAIL,
  SAMPLE_TO_EMAIL,
  SUBMIT_CLICKED,
} from '../../../utils/constants';

const meta: Meta<typeof PreAdverseActionMail> = {
  title: 'Organisms/PreadverseActionMail',
  component: PreAdverseActionMail,
};

export default meta;

const handleAllClicks = action(SUBMIT_CLICKED);

export const PreadversePreviewMail = () => {
  return (
    <PreAdverseActionMail
      isOpenPopUp={true}
      subjectContent={[
        SAMPLE_FROM_EMAIL,
        SAMPLE_TO_EMAIL,
        PREADVERSE_ACTION_MAIL_SUBJECT,
      ]}
      candidateName={SAMPLE_CANDIDATE_NAME}
      selectedAdverseActions={[
        ASSAULT_DOMESTIC_VIOLENCE,
        DRIVING_WHILE_LICENSE_SUSPENDED,
      ]}
      handleClosePopup={handleAllClicks}
      handleSubmitButtonClick={handleAllClicks}
    />
  );
};
