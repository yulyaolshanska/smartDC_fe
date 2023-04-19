import React, { ReactElement } from 'react';
import Drawer from '@components/Drawer';
import { avoidRenderArray } from '@constants/other';
import { MainContent, PageContainer } from './styles';
import useAvoidRenderOnPaths from 'utils/hooks/useAvoidRenderOnPaths';

interface WrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: WrapperProps) => {
  const shouldRender = useAvoidRenderOnPaths(avoidRenderArray);
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
