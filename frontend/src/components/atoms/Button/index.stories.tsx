import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '.';
import {
  BUTTON_CLICKED,
  EXPORT_BUTTON_TEXT,
  GOOGLE_SIGNIN_TEXT,
  MANUAL_ORDER,
  PREADVERSE_ACTION,
  PREVIEW_NOTICE,
  SIGNUP,
} from '../../../utils/constants';
import theme from '../../../Theme/theme';
import AddIcon from '../../../../public/assets/icons/add.svg';
import GoogleIcon from '../../../../public/assets/icons/google.svg';
import ExportIcon from '../../../../public/assets/icons/export.svg';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};
const handleClickAction = action(BUTTON_CLICKED);

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    label: PREVIEW_NOTICE,
    labelColor: theme.palette.white.main,
    labelVariant: 'body1',
    color: 'primary500',
    handleClick: handleClickAction,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'contained',
    label: MANUAL_ORDER,
    startIcon: <img src={AddIcon} />,
    labelColor: theme.palette.white.main,
    labelVariant: 'body1',
    color: 'primary500',
    handleClick: handleClickAction,
  },
};

export const TextButton: Story = {
  args: {
    variant: 'text',
    label: SIGNUP,
    color: 'white',
    labelColor: theme.palette.primary500.main,
    labelVariant: 'body1',
    handleClick: handleClickAction,
    boxShadow: 'none',
  },
};

export const PreAverseButton: Story = {
  args: {
    variant: 'contained',
    label: PREADVERSE_ACTION,
    color: 'white',
    labelVariant: 'body1',
    labelColor: theme.palette.textEmphasis.main,
    border: `1px solid ${theme.palette.stroke.main}`,
    boxShadow: 'none',
    handleClick: handleClickAction,
  },
};

export const ExportButton: Story = {
  args: {
    variant: 'contained',
    label: EXPORT_BUTTON_TEXT,
    startIcon: <img src={ExportIcon} />,
    color: 'white',
    labelVariant: 'body1',
    labelColor: theme.palette.textEmphasis.main,
    border: `1px solid ${theme.palette.stroke.main}`,
    boxShadow: 'none',
    handleClick: handleClickAction,
  },
};

export const GoogleAuthButton: Story = {
  args: {
    variant: 'contained',
    label: GOOGLE_SIGNIN_TEXT,
    color: 'white',
    labelVariant: 'body2',
    labelColor: theme.palette.textEmphasis.dark,
    startIcon: <img src={GoogleIcon} />,
    handleClick: handleClickAction,
    width: '24.063rem',
    height: '3rem',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.stroke.main}`,
  },
};
