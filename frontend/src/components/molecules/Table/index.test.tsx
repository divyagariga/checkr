import { Typography } from '@mui/material';
import { render, screen } from '@testing-library/react';
import Table from '.';
import theme from '../../../Theme/theme';
import { CANDIDATE_TABLE_HEAD } from '../../../utils/constants';

describe('Tests Table', () => {
  it('renders Table', () => {
    render(
      <Table
        tableData={[
          [
            <Typography
              variant="body1"
              color={theme.palette.primary500.main}
              key="name"
            >
              John Smith
            </Typography>,
          ],
        ]}
        tableHeadingData={CANDIDATE_TABLE_HEAD}
        tableColumnWidth={'180px'}
      />,
    );
    expect(screen.getByTestId('table')).toBeInTheDocument;
    expect(screen.getByText('John Smith')).toBeInTheDocument;
  });
});
