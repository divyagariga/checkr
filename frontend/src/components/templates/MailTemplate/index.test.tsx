import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import MailTemplate from '.';
import theme from '../../../Theme/theme';
import { ASSAULT_DOMESTIC_VIOLENCE } from '../../../utils/constants';
import Typography from '../../atoms/Typography';

describe('Tests MailTemplate', () => {
  it('renders MailTemplate', () => {
    render(
      <ThemeProvider theme={theme}>
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
          subjectContent={[]}
          handleSubmitOrPreviewButtonClick={jest.fn()}
          isModalMail={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('mail-template')).toBeInTheDocument;
    expect(screen.getByText('Dear John Smith,')).toBeInTheDocument;
    expect(screen.getByText(ASSAULT_DOMESTIC_VIOLENCE)).toBeInTheDocument;
  });

  it('renders MailTemplate before preview', () => {
    render(
      <ThemeProvider theme={theme}>
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
          subjectContent={[]}
          handleSubmitOrPreviewButtonClick={jest.fn()}
          isModalMail={true}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('mail-template')).toBeInTheDocument;
    expect(screen.getByText('Dear John Smith,')).toBeInTheDocument;
    expect(screen.getByText(ASSAULT_DOMESTIC_VIOLENCE)).toBeInTheDocument;
  });
});
