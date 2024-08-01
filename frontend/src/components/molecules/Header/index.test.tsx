import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import Header from '.';
import {
  ENGAGE,
  EXPORT,
  MANUAL_ORDER,
  PAGE_HEADINGS,
  PREADVERSE_ACTION,
} from '../../../utils/constants';
import theme from '../../../Theme/theme';

describe('Header component unit test', () => {
  it('render for Candidate Header', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          type={'Main'}
          heading={PAGE_HEADINGS.CANDIDATE}
          showBackButton={false}
        />
        ,
      </ThemeProvider>,
    );

    const HeaderElement = screen.getByTestId('header');
    expect(HeaderElement).toBeInTheDocument();
    const elements = [EXPORT, MANUAL_ORDER];
    elements.forEach((element) => {
      expect(HeaderElement).toHaveTextContent(element);
    });
  });

  it('render for AdverseActions Header', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          type={'Plain'}
          heading={PAGE_HEADINGS.ADVERSE_ACTION}
          showBackButton={true}
        />
        ,
      </ThemeProvider>,
    );

    const HeaderElement = screen.getByTestId('header');
    expect(HeaderElement).toBeInTheDocument();
    expect(HeaderElement).toHaveTextContent(PAGE_HEADINGS.ADVERSE_ACTION);
  });

  it('render for Candidate detailed Header', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header
          type={'Detailed'}
          heading={'John Smith'}
          showBackButton={true}
        />
        ,
      </ThemeProvider>,
    );

    const HeaderElement = screen.getByTestId('header');
    expect(HeaderElement).toBeInTheDocument();
    expect(HeaderElement).toHaveTextContent('John Smith');
    const elements = [PREADVERSE_ACTION, ENGAGE];
    elements.forEach((element) => {
      expect(HeaderElement).toHaveTextContent(element);
    });
  });
});
