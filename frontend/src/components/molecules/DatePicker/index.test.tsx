import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DatePicker from '.';
import { REPORTS_FROM } from '../../../utils/constants';

describe('DatePicker component', () => {
  it('should render date picker', () => {
    const onChange = jest.fn();
    const datePicker = render(
      <DatePicker label={REPORTS_FROM} onChange={onChange} />,
    );
    expect(datePicker).toBeDefined();
  });

  it('should check click functionality on Calendar', () => {
    const onChange = jest.fn();
    render(<DatePicker label={REPORTS_FROM} onChange={onChange} />);
    const calender = screen.getByAltText('calender');
    fireEvent.click(calender);
    expect(onChange).toHaveBeenCalled;
  });

  it('should check click functionality on calendar buttons', () => {
    const onChange = jest.fn();
    render(<DatePicker label={REPORTS_FROM} onChange={onChange} />);
    const calender = screen.getByAltText('calender');
    fireEvent.click(calender);
    const leftArrow = screen.getByAltText('leftArrow');
    fireEvent.click(leftArrow);
    const date = screen.getAllByText('1')[0];
    fireEvent.click(date);
    expect(onChange).toHaveBeenCalled;
  });
});
