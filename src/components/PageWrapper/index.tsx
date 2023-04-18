import React, { ReactElement } from 'react';
import Wrapper from '@components/Wrapper';
import Drawer from '@components/Drawer';
import { MainContent, PageContainer } from './styles';
import ProfileComponent from '@components/Profile';
import useAvoidRenderOnPaths from 'utils/hooks/useAvoidRenderOnPaths';
import cookie from 'utils/functions/cookies';

interface WrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: WrapperProps) => {
  const shouldRender = useAvoidRenderOnPaths(['/sign-up', '/login']);
  if (shouldRender && children) {
    return children as ReactElement;
  }

  return (
    <PageContainer>
      <Drawer />
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default PageWrapper;
