import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import FilterPopup from '.';
import theme from '../../../Theme/theme';
import {
  FILTER_BUTTON_TEXT,
  MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES,
  MOCK_CANDIDATE_STATUS_CHECKBOXES,
  PREADVERSE_ACTION_STATUS_FILTER_OPTIONS,
} from '../../../utils/constants';

const candidateStatusCheckBoxHandler = jest.fn();
const candidateAdjudicationCheckBoxHandler = jest.fn();

const MockCandidateFilterComponent = (
  <ThemeProvider theme={theme}>
    <FilterPopup
      variant="candidate"
      candidateStatusCheckedOptions={MOCK_CANDIDATE_STATUS_CHECKBOXES}
      handleCandidateStatusCheckbox={candidateStatusCheckBoxHandler}
      candidateAdjudicationCheckedOptions={
        MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES
      }
      handleCandidateAdjudicationCheckbox={candidateAdjudicationCheckBoxHandler}
    />
  </ThemeProvider>
);

const MockPreAdvserseActionsFilterComponent = (
  <ThemeProvider theme={theme}>
    <FilterPopup
      variant="preadverseActions"
      candidateStatusCheckedOptions={MOCK_CANDIDATE_STATUS_CHECKBOXES}
      handleCandidateStatusCheckbox={candidateStatusCheckBoxHandler}
      candidateAdjudicationCheckedOptions={
        MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES
      }
      handleCandidateAdjudicationCheckbox={candidateAdjudicationCheckBoxHandler}
    />
  </ThemeProvider>
);

describe('FilterPopup Component', () => {
  it('should render the button of filter component', () => {
    render(MockCandidateFilterComponent);
    const button = screen.getByText(FILTER_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
  });

  it('should open the filter menu when the button is clicked', () => {
    render(MockCandidateFilterComponent);

    const button = screen.getByText(FILTER_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const filterMenu = screen.getByTestId('filter-menu');
    expect(filterMenu).toBeInTheDocument();
  });

  it('should opent the preadverseActions variant filter menu also', () => {
    render(MockPreAdvserseActionsFilterComponent);

    const button = screen.getByText(FILTER_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const filterMenu = screen.getByTestId('filter-menu');
    expect(filterMenu).toBeInTheDocument();
    for (const element of PREADVERSE_ACTION_STATUS_FILTER_OPTIONS) {
      expect(screen.getByText(element)).toBeInTheDocument();
    }

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(6);
    const allStatusCheckbox = checkboxes[0];
    expect(allStatusCheckbox).toHaveProperty('checked', true);
    fireEvent.click(allStatusCheckbox);

    expect(allStatusCheckbox).toHaveProperty('checked', false);
  });
});
