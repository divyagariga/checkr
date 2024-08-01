import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import PreAdverseActionMail from '.';
import theme from '../../../Theme/theme';
import {
  ASSAULT_DOMESTIC_VIOLENCE,
  DRIVING_WHILE_LICENSE_SUSPENDED,
  PREADVERSE_ACTION_MAIL_SUBJECT,
  SAMPLE_CANDIDATE_NAME,
  SAMPLE_FROM_EMAIL,
  SAMPLE_TO_EMAIL,
} from '../../../utils/constants';

describe('Tests Preadverse mail', () => {
  it('renders preadverse mail', () => {
    render(
      <ThemeProvider theme={theme}>
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
          handleClosePopup={jest.fn()}
          handleSubmitButtonClick={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('preadverse-mail')).toBeInTheDocument;
    expect(screen.getByText(ASSAULT_DOMESTIC_VIOLENCE)).toBeInTheDocument;
    expect(screen.getByText(DRIVING_WHILE_LICENSE_SUSPENDED)).toBeInTheDocument;
  });

  it('handles click events', () => {
    const handleSubmitButtonClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
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
          handleClosePopup={jest.fn()}
          handleSubmitButtonClick={handleSubmitButtonClick}
        />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(handleSubmitButtonClick).toHaveBeenCalled;
  });
});
