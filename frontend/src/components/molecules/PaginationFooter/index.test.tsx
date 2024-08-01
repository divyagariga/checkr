import { fireEvent, render, screen, within } from '@testing-library/react';
import PaginationFooter from '.';
import { NUMBER_OF_RECORDS_PER_PAGE } from '../../../utils/constants';

describe('Tests pagination footer', () => {
  it('renders Pagination footer component', () => {
    render(
      <PaginationFooter
        perPageRecordsCount={10}
        totalRecordsCount={30}
        handlePageNumberIconClick={jest.fn()}
        handleLeftArrowIconClick={jest.fn()}
        handleRightArrowIconClick={jest.fn()}
      />,
    );

    const pagination = screen.getByTestId('pagination-footer');
    expect(pagination).toBeInTheDocument();
    expect(
      within(pagination).getByText(NUMBER_OF_RECORDS_PER_PAGE),
    ).toBeInTheDocument();
    expect(
      within(pagination).getByText('out of 30 results'),
    ).toBeInTheDocument();
  });

  it('handles click for pagination icons', () => {
    const handlePageNumberIconClick = jest.fn();
    render(
      <PaginationFooter
        perPageRecordsCount={10}
        totalRecordsCount={35}
        handlePageNumberIconClick={handlePageNumberIconClick}
        handleLeftArrowIconClick={jest.fn()}
        handleRightArrowIconClick={jest.fn()}
      />,
    );

    const pagination = screen.getByTestId('pagination-footer');
    const paginationIcons =
      within(pagination).getAllByTestId('pagination-item');
    expect(paginationIcons.length).toBe(4);

    fireEvent.click(paginationIcons[0]);

    expect(handlePageNumberIconClick).toHaveBeenCalled();
  });

  it('renders Pagination footer component for 0 pages', () => {
    render(<PaginationFooter perPageRecordsCount={0} totalRecordsCount={30} />);

    const pagination = screen.getByTestId('pagination-footer');
    expect(pagination).toBeInTheDocument();
    expect(
      within(pagination).getByText(NUMBER_OF_RECORDS_PER_PAGE),
    ).toBeInTheDocument();
    expect(
      within(pagination).getByText('out of 30 results'),
    ).toBeInTheDocument();
    const paginationIcons =
      within(pagination).getAllByTestId('pagination-item');
    fireEvent.click(paginationIcons[0]);
  });
});
