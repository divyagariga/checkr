import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from '.';
import theme from '../../../Theme/theme';

describe('Chip Component', () => {
  it('CLEAR chip', () => {
    render(<Chip chipLabel="CLEAR" />);

    const chipElement = screen.getByTestId('chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle(
      `backgroundColor: ${theme.palette.accentGreen.light}`,
    );
    expect(screen.getByText('CLEAR')).toHaveStyle(
      `color: ${theme.palette.accentGreen.main}`,
    );
  });

  it('CONSIDER chip', () => {
    render(<Chip chipLabel="CONSIDER" />);

    const chipElement = screen.getByTestId('chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle(
      `backgroundColor: ${theme.palette.accentYellow.light}`,
    );
    expect(screen.getByText('CONSIDER')).toHaveStyle(
      `color: ${theme.palette.accentYellow.main}`,
    );
  });

  it('SCHEDULED chip', () => {
    render(<Chip chipLabel="SCHEDULED" />);

    const chipElement = screen.getByTestId('chip');
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveStyle(
      `backgroundColor: ${theme.palette.accentBlue.light}`,
    );
    expect(screen.getByText('SCHEDULED')).toHaveStyle(
      `color: ${theme.palette.accentBlue.main}`,
    );
  });
});
