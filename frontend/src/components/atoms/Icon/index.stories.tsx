/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react';
import Icon from '.';
import EyeIcon from '../../../../public/assets/icons/eyeicon.svg';
import HomeIcon from '../../../../public/assets/icons/home.svg';
import CandidatesIcon from '../../../../public/assets/icons/candidates.svg';
import LoginPageImage from '../../../../public/assets/images/loginimage.svg';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Eye: Story = {
  args: {
    src: EyeIcon,
    width: '24px',
    height: '24px',
    alt: 'eyeicon',
  },
};

export const Home: Story = {
  args: {
    src: HomeIcon,
    width: '24px',
    height: '24px',
    alt: 'homeicon',
  },
};

export const Candidates: Story = {
  args: {
    src: CandidatesIcon,
    width: '24px',
    height: '24px',
    alt: 'candidateicon',
  },
};

export const LoginImage: Story = {
  args: {
    src: LoginPageImage,
    width: '292px',
    height: '316px',
    alt: 'Login',
  },
};
