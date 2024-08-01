import React from 'react';
import { render } from '@testing-library/react';
import InfoBox from '.';
import { MOCK_CANDIDATE_INFO_DATA } from '../../../utils/constants';

describe('InfoBox Component', () => {
  it('should render InfoBox with data', () => {
    const { getByTestId, getByText } = render(
      <InfoBox infoBoxData={MOCK_CANDIDATE_INFO_DATA} boxWidth="300px" />,
    );

    const infoBox = getByTestId('info-box');
    expect(infoBox).toBeInTheDocument();

    MOCK_CANDIDATE_INFO_DATA.forEach((data) => {
      const label = getByText(data.label);
      const value = getByText(data.value);

      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });

  it('should render InfoBox with correct styles', () => {
    const { getByTestId } = render(
      <InfoBox infoBoxData={MOCK_CANDIDATE_INFO_DATA} boxWidth="300px" />,
    );

    const infoBox = getByTestId('info-box');
    expect(infoBox).toHaveStyle('padding: 0.25rem 1rem 1.25rem 0rem');
  });

  it('should render InfoBox with infocards', () => {
    const { getAllByTestId } = render(
      <InfoBox infoBoxData={MOCK_CANDIDATE_INFO_DATA} boxWidth="300px" />,
    );
    const infocards = getAllByTestId('info-card');

    expect(infocards.length).toBeGreaterThan(0);
  });
});
