import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCheckbox from './index';

describe('Checkbox Component', () => {
  it('renders checkbox', () => {
    render(<CustomCheckbox checked={false} onChange={jest.fn} />);

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('triggers onChange event', () => {
    render(<CustomCheckbox />);
    const checkbox = screen
      .getByTestId(`checkbox`)
      .querySelector('input[type="checkbox"]')!;

    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', true);
  });
});
