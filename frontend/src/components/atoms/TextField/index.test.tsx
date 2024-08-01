import React from 'react';
import { render } from '@testing-library/react';
import TextField from '.';
import Icon from '../Icon';
import {
  TEST_TEXTFIELD_PASSWORD,
  TEST_TEXTFIELD_PLACEHOLDER,
  TEST_TEXTFIELD_VALUE,
} from '../../../utils/constants';
import EyeOffIcon from '../../../../public/assets/icons/eyeicon.svg';

test('Renders the TextField component with placeholder and value', () => {
  const placeholder = TEST_TEXTFIELD_PLACEHOLDER;
  const value = TEST_TEXTFIELD_VALUE;
  const handleChange = jest.fn();

  const { getByPlaceholderText, getByDisplayValue } = render(
    <TextField
      placeholder={placeholder}
      handleChange={handleChange}
      value={value}
      variant={'outlined'}
    />,
  );

  const inputElement = getByPlaceholderText(placeholder);
  const valueElement = getByDisplayValue(value);

  expect(inputElement).toBeInTheDocument();
  expect(valueElement).toBeInTheDocument();
});

test('TextField renders with endIcon', () => {
  const placeholder = TEST_TEXTFIELD_PLACEHOLDER;
  const value = TEST_TEXTFIELD_PASSWORD;
  const handleChange = jest.fn();

  const { getByAltText } = render(
    <TextField
      placeholder={placeholder}
      handleChange={handleChange}
      value={value}
      endIcon={<Icon src={EyeOffIcon} alt="password-icon" />}
      type="password"
      variant={'outlined'}
    />,
  );

  const eyeIcon = getByAltText('password-icon');
  expect(eyeIcon).toBeInTheDocument();
});

test('TextField renders with startIcon', () => {
  const placeholder = TEST_TEXTFIELD_PLACEHOLDER;
  const value = TEST_TEXTFIELD_PASSWORD;
  const handleChange = jest.fn();
  const { getByAltText } = render(
    <TextField
      placeholder={placeholder}
      handleChange={handleChange}
      value={value}
      startIcon={<Icon src={EyeOffIcon} alt="password-icon" />}
      type="password"
      variant={'outlined'}
    />,
  );
  const searchIcon = getByAltText('password-icon');
  expect(searchIcon).toBeInTheDocument();
});
