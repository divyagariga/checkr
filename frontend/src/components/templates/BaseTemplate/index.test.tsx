import React from 'react';
import { render } from '@testing-library/react';
import BaseTemplate from '.';
import SideNavigationBar from '../../organisms/SideNav';
import Header from '../../molecules/Header';
import { COMPONENT, PAGE_HEADINGS } from '../../../utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';

describe('BaseTemplate component', () => {
  it('should render BaseTemplate correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <BaseTemplate
            sideNav={<SideNavigationBar />}
            header={
              <Header
                type={'Plain'}
                heading={PAGE_HEADINGS.CANDIDATE}
                showBackButton={false}
              />
            }
            content={<div>{COMPONENT}</div>}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const baseTemplate = getByTestId('base-template');
    expect(baseTemplate).toBeInTheDocument();
  });

  it('should render BaseTemplate for Candidate details correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <BaseTemplate
            sideNav={<SideNavigationBar />}
            header={
              <Header
                type={'Plain'}
                heading={PAGE_HEADINGS.CANDIDATE}
                showBackButton={false}
              />
            }
            content={<div>{COMPONENT}</div>}
            isCandidateDetailsPage={true}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const baseTemplate = getByTestId('base-template');
    expect(baseTemplate).toBeInTheDocument();
  });
});
