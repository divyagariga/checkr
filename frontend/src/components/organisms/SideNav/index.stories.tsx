import type { Meta } from '@storybook/react';
import SideNavigationBar from '.';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';

const meta: Meta<typeof SideNavigationBar> = {
  title: 'Organisms/SideNavigationBar',
  component: SideNavigationBar,
};

export default meta;

export const SideNavBar = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SideNavigationBar />
      </AuthProvider>
    </BrowserRouter>
  );
};
