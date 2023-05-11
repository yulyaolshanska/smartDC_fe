import React from 'react';
import ContentLoader from 'react-content-loader';
import {
  CONTENT_LOADER_BACKGROUND,
  CONTENT_LOADER_FOREGROUND,
} from '@constants/colors';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 548 120"
    backgroundColor={CONTENT_LOADER_BACKGROUND}
    foregroundColor={CONTENT_LOADER_FOREGROUND}
  >
    <rect x="7" y="6" rx="7" ry="7" width="533" height="104" />
    <rect x="134" y="443" rx="0" ry="0" width="9" height="0" />
  </ContentLoader>
);

export default Skeleton;
