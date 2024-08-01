import { render, screen } from '@testing-library/react';
import Modal from '.';
import { OTP_SUCCESS_MESSAGE } from '../../../utils/constants';

describe('Tests Modal', () => {
  it('renders Modal', () => {
    render(
      <Modal
        isPopupOpen={true}
        handleClose={jest.fn()}
        innerPopupContent={OTP_SUCCESS_MESSAGE}
        popupWidth={'450px'}
        popupHeight={'152px'}
      />,
    );

    expect(screen.getByTestId('pop-over')).toBeInTheDocument();
    expect(screen.getByText(OTP_SUCCESS_MESSAGE)).toBeInTheDocument();
  });
});
