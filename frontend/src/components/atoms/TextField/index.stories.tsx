import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextField from '.';
import Icon from '../Icon';
import {
  EMAIL_PLACEHOLDER,
  ICON_CLICKED,
  PASSWORD_PLACEHOLDER,
  SEARCH_BAR_PLACEHOLDER,
} from '../../../utils/constants';
import SearchIcon from '../../../../public/assets/icons/search.svg';
import theme from '../../../Theme/theme';
import EyeOffIcon from '../../../../public/assets/icons/eyeicon.svg';
import EyeOnIcon from '../../../../public/assets/icons/eyeOn.svg';

const iconClickAction = action(ICON_CLICKED);

const meta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const EmailInput: Story = {
  args: {
    placeholder: EMAIL_PLACEHOLDER,
    styles: { width: '24rem' },
  },
};

export const PassWordInputHidden: Story = {
  args: {
    placeholder: PASSWORD_PLACEHOLDER,
    type: 'password',
    endIcon: (
      <Icon handleClick={iconClickAction} src={EyeOffIcon} alt="eye-off" />
    ),
  },
};

export const PasswordInputUnHidden: Story = {
  args: {
    endIcon: (
      <Icon handleClick={iconClickAction} src={EyeOnIcon} alt="eye-on" />
    ),
  },
};

export const SearchInput: Story = {
  args: {
    placeholder: SEARCH_BAR_PLACEHOLDER,
    type: 'text',
    styles: { width: '21.5rem' },
    startIcon: <Icon src={SearchIcon} alt="search-icon" />,
    placeholderColor: theme.palette.textEmphasis.main,
  },
};
