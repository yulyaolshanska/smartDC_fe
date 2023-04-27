import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 548 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="7" y="6" rx="7" ry="7" width="533" height="104" />
    <rect x="134" y="443" rx="0" ry="0" width="9" height="0" />
  </ContentLoader>
);

export default Skeleton;
