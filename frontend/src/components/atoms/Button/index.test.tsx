import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import Button from '.';
import theme from '../../../Theme/theme';

const mockHandleClick = jest.fn();

describe('button component test', () => {
  it('checks render of button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button
          variant={'contained'}
          label={'button'}
          labelVariant={'body1'}
          handleClick={mockHandleClick}
          color={'primary500'}
          labelColor={theme.palette.primary500.main}
        />
      </ThemeProvider>,
    );
    const component = screen.getByTestId('button');
    expect(component).toBeInTheDocument();
    fireEvent.click(component);
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button
          variant={'contained'}
          label={'button'}
          labelVariant={'body1'}
          handleClick={mockHandleClick}
          color={'primary500'}
          labelColor={theme.palette.primary500.main}
          disabled={true}
        />
      </ThemeProvider>,
    );

    const component = screen.getByTestId('button');
    expect(component).toBeInTheDocument();
    fireEvent.click(component);
    expect(mockHandleClick).not.toHaveBeenCalled();
    expect(component).toBeDisabled();
  });
});
