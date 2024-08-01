import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Typography from '.';
import theme from '../../../Theme/theme';

describe('Typography component unit test', () => {
  const variant = 'h1';
  const text = 'Test Text';
  it('positive scenario for typography text', () => {
    render(
      <Typography variant={variant} color={theme.palette.primary100.main}>
        {text}
      </Typography>,
    );
    const typographyElement = screen.getByText(text);
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent(text);
    expect(typographyElement).toHaveClass(`MuiTypography-${variant}`);
  });

  it('negative scenario for typography text', () => {
    render(
      <Typography variant={variant} color={theme.palette.primary100.main}>
        {text}
      </Typography>,
    );
    expect(screen.queryByText('hi')).not.toBeInTheDocument();
  });

  it('should handle clickable typography', () => {
    const handleClick = jest.fn();
    render(
      <Typography
        variant={variant}
        color={theme.palette.primary100.main}
        onClick={handleClick}
      >
        {text}
      </Typography>,
    );
    const typoText = screen.getByText(text);
    fireEvent.click(typoText);
    expect(handleClick).toHaveBeenCalled;
  });
});
