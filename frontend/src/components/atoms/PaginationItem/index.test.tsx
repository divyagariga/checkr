import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationItem from '.';
import theme from '../../../Theme/theme';

const mockHandleClick = jest.fn();

describe('PaginationItem Component', () => {
  it('click PaginationItem', () => {
    render(
      <PaginationItem
        label={1}
        handleClick={mockHandleClick}
        isPaginationItemActive={false}
      />,
    );

    const paginationItem = screen.getByTestId('pagination-item');
    expect(paginationItem).toBeInTheDocument();
    expect(paginationItem).toHaveStyle(
      `backgroundColor: ${theme.palette.white.light}`,
    );
    fireEvent.click(paginationItem);
    expect(mockHandleClick).toBeCalledTimes(1);
    expect(paginationItem).toHaveStyle(
      `backgroundColor: ${theme.palette.primary300.light}`,
    );
  });

  it('click PaginationItem active', () => {
    render(
      <PaginationItem
        label={1}
        handleClick={mockHandleClick}
        isPaginationItemActive={true}
      />,
    );

    const paginationItem = screen.getByTestId('pagination-item');
    expect(paginationItem).toBeInTheDocument();
    expect(paginationItem).toHaveStyle(
      `backgroundColor: ${theme.palette.white.light}`,
    );
    fireEvent.click(paginationItem);
    expect(mockHandleClick).toBeCalledTimes(1);
    expect(paginationItem).toHaveStyle(
      `backgroundColor: ${theme.palette.primary500.light}`,
    );
  });
});
