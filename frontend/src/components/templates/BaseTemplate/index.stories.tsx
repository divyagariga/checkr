import type { Meta } from '@storybook/react';
import BaseTemplate from '.';
import SideNavigationBar from '../../organisms/SideNav';
import Header from '../../molecules/Header';
import { PAGE_HEADINGS } from '../../../utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';

const meta: Meta<typeof BaseTemplate> = {
  title: 'Templates/BaseTemplate',
  component: BaseTemplate,
};

export default meta;

export const SignupExample = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BaseTemplate
          sideNav={<SideNavigationBar />}
          header={
            <Header
              type={'Main'}
              heading={PAGE_HEADINGS.CANDIDATE}
              showBackButton={false}
            />
          }
          content={undefined}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};
