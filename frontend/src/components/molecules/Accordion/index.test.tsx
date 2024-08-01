import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Accordion from '.';
import {
  CANDIDATE_ACCORDION_HEADING,
  MOCK_CANDIDATE_INFO_DATA,
} from '../../../utils/constants';
import InfoBox from '../InfoBox';

describe('Accordion unit testing', () => {
  const accordionHeading = CANDIDATE_ACCORDION_HEADING;
  const children = <InfoBox infoBoxData={MOCK_CANDIDATE_INFO_DATA} />;

  it('renders the accordion component', () => {
    render(<Accordion heading={accordionHeading}>{children}</Accordion>);

    const accordionComponent = screen.getByTestId('accordion');
    expect(accordionComponent).toBeInTheDocument();
  });

  it('Accordion opens and contains children', () => {
    const heading = CANDIDATE_ACCORDION_HEADING;

    render(<Accordion heading={heading}>{children}</Accordion>);

    const accordionHeader = screen.getByText(accordionHeading);
    fireEvent.click(accordionHeader);

    const childContent = screen.getByTestId('info-box');
    expect(childContent).toBeInTheDocument();
  });
});
