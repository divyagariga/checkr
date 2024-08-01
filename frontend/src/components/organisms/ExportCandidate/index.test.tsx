import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import ExportCandidate from '.';
import theme from '../../../Theme/theme';
import {
  DATEPICKER_ERROR_MESSAGE,
  EXPORT_CANDIDATE_POPUP_HEAD,
  REPORTS_FROM,
  REPORTS_TO,
} from '../../../utils/constants';

describe('renders ExportCandidate', () => {
  const handleExportButtonClick = jest.fn();
  it('should render export candidate component', () => {
    render(
      <ThemeProvider theme={theme}>
        <ExportCandidate
          isPopupOpen={true}
          handleCloseModal={jest.fn()}
          handleExportButtonClick={handleExportButtonClick}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('export-candidate')).toBeInTheDocument;
    expect(screen.getByText(EXPORT_CANDIDATE_POPUP_HEAD)).toBeInTheDocument;
    expect(screen.getByText(REPORTS_FROM)).toBeInTheDocument;
    expect(screen.getByText(REPORTS_TO)).toBeInTheDocument;

    const datepickers = screen.getAllByRole('textbox');

    expect(datepickers.length).toBe(2);
  });

  it('should handle datepicker changes', () => {
    render(
      <ThemeProvider theme={theme}>
        <ExportCandidate
          isPopupOpen={true}
          handleCloseModal={jest.fn()}
          handleExportButtonClick={handleExportButtonClick}
        />
      </ThemeProvider>,
    );
    const datepickers = screen.getAllByRole('textbox');

    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, 'MM/dd/yyyy');

    const currentDateMinusOne = new Date(currentDate);
    currentDateMinusOne.setDate(currentDate.getDate() - 1);
    const formattedCurrentDateMinusOne = format(
      currentDateMinusOne,
      'MM/dd/yyyy',
    );

    const tenDaysAgo = new Date(currentDate);
    tenDaysAgo.setDate(currentDate.getDate() - 10);
    const formattedTenDaysAgoDate = format(tenDaysAgo, 'MM/dd/yyyy');

    fireEvent.change(datepickers[0], {
      target: { value: formattedCurrentDateMinusOne },
    });
    fireEvent.change(datepickers[1], {
      target: { value: formattedTenDaysAgoDate },
    });

    expect(screen.getByText(DATEPICKER_ERROR_MESSAGE)).toBeInTheDocument;

    fireEvent.change(datepickers[1], {
      target: { value: formattedCurrentDate },
    });

    expect(screen.queryByText(DATEPICKER_ERROR_MESSAGE)).toBeNull;
  });

  it('should handle export button clicks', () => {
    render(
      <ThemeProvider theme={theme}>
        <ExportCandidate
          isPopupOpen={true}
          handleCloseModal={jest.fn()}
          handleExportButtonClick={handleExportButtonClick}
        />
      </ThemeProvider>,
    );
    const datepickers = screen.getAllByRole('textbox');

    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, 'MM/dd/yyyy');

    const currentDateMinusOne = new Date(currentDate);
    currentDateMinusOne.setDate(currentDate.getDate() - 1);
    const formattedCurrentDateMinusOne = format(
      currentDateMinusOne,
      'MM/dd/yyyy',
    );

    const tenDaysAgo = new Date(currentDate);
    tenDaysAgo.setDate(currentDate.getDate() - 10);
    const formattedTenDaysAgoDate = format(tenDaysAgo, 'MM/dd/yyyy');

    const exportButton = screen.getAllByRole('button');

    fireEvent.change(datepickers[0], {
      target: { value: formattedCurrentDateMinusOne },
    });
    fireEvent.change(datepickers[1], {
      target: { value: formattedTenDaysAgoDate },
    });

    expect(exportButton[2]).toBeDisabled;

    fireEvent.change(datepickers[1], {
      target: { value: formattedCurrentDate },
    });

    expect(exportButton[2]).toBeEnabled;

    fireEvent.click(exportButton[2]);
    expect(handleExportButtonClick).toHaveBeenCalled;
  });
});
