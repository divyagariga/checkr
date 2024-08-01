import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MailTemplate from '.';
import theme from '../../../Theme/theme';
import {
  ASSAULT_DOMESTIC_VIOLENCE,
  BUTTON_CLICKED,
} from '../../../utils/constants';
import Checkbox from '../../atoms/Checkbox';
import Typography from '../../atoms/Typography';

const meta: Meta<typeof MailTemplate> = {
  title: 'Templates/MailTemplate',
  component: MailTemplate,
};

export default meta;

const handleSubmitOrPreviewButtonClick = action(BUTTON_CLICKED);

export const MailWithSelectedOption = () => {
  return (
    <div style={{ width: '663px', height: '240px' }}>
      <MailTemplate
        candidateName={'John Smith'}
        middleContent={
          <Typography
            variant={'caption2'}
            color={theme.palette.textEmphasis.main}
          >
            {ASSAULT_DOMESTIC_VIOLENCE}
          </Typography>
        }
        topTextVariant={'caption2'}
        subjectContent={[
          'kyle@checkr.com',
          'john.smith@checkr.com',
          'Pre-adverse action notice - checkr-bpo',
        ]}
        isModalMail={true}
        handleSubmitOrPreviewButtonClick={handleSubmitOrPreviewButtonClick}
      />
    </div>
  );
};

export const MailWithCheckboxes = () => {
  return (
    <div style={{ width: '663px' }}>
      <MailTemplate
        candidateName={'John Smith'}
        middleContent={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Checkbox style={{ paddingLeft: '0px' }} />
            <Typography
              variant={'caption2'}
              color={theme.palette.textEmphasis.main}
            >
              {ASSAULT_DOMESTIC_VIOLENCE}
            </Typography>
          </Box>
        }
        topTextVariant={'caption2'}
        subjectContent={[
          'kyle@checkr.com',
          'john.smith@checkr.com',
          'Pre-adverse action notice - checkr-bpo',
        ]}
        isModalMail={false}
        handleSubmitOrPreviewButtonClick={handleSubmitOrPreviewButtonClick}
      />
    </div>
  );
};
