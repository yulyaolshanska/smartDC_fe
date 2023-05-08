import React from 'react';
import ContentLoader from 'react-content-loader';

const AvatarLoader = () => (
  <ContentLoader
    speed={2}
    width={160}
    height={160}
    viewBox="0 0 120 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="134" y="443" rx="0" ry="0" width="9" height="0" />
    <circle cx="57" cy="60" r="55" />
  </ContentLoader>
);

export default AvatarLoader;
