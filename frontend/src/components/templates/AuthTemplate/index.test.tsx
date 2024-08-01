import React from 'react';
import { render } from '@testing-library/react';
import AuthTemplate from '.';
import { COMPONENT } from '../../../utils/constants';

describe('AuthTemplate component', () => {
  it('should render AuthTemplate correctly', () => {
    const { getByTestId, getByAltText } = render(
      <AuthTemplate authComponent={<div>{COMPONENT}</div>} />,
    );
    const authTemplate = getByTestId('auth-template');
    expect(authTemplate).toBeInTheDocument();
    const image = getByAltText('login-image');
    expect(image).toBeInTheDocument();
  });
});
