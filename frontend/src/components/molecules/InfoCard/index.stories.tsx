import type { Meta, StoryObj } from '@storybook/react';
import InfoCard from '.';
import UserIcon from '../../../../public/assets/icons/user.svg';
import EmailIcon from '../../../../public/assets/icons/email.svg';
import CalendarIcon from '../../../../public/assets/icons/calendar.svg';
import {
  CREATED_DATE_INFO_CARD_LABEL,
  CREATED_DATE_INFO_CARD_VALUE,
  EMAIL_INFO_CARD_LABEL,
  EMAIL_INFO_CARD_VALUE,
  USER_INFO_CARD_LABEL,
  USER_INFO_CARD_VALUE,
} from '../../../utils/constants';

const meta: Meta<typeof InfoCard> = {
  title: 'Molecules/InfoCard',
  component: InfoCard,
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const UserInfoCard: Story = {
  args: {
    infoIcon: UserIcon,
    label: USER_INFO_CARD_LABEL,
    value: USER_INFO_CARD_VALUE,
    width: '31.31%',
  },
};

export const EmailInfoCard: Story = {
  args: {
    infoIcon: EmailIcon,
    label: EMAIL_INFO_CARD_LABEL,
    value: EMAIL_INFO_CARD_VALUE,
    width: '31.31%',
  },
};

export const DateInfoCard: Story = {
  args: {
    infoIcon: CalendarIcon,
    label: CREATED_DATE_INFO_CARD_LABEL,
    value: CREATED_DATE_INFO_CARD_VALUE,
    width: '31.31%',
  },
};
