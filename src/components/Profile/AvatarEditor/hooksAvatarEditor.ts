import React from 'react';

import { ANIMATION_TIME } from 'constants/animation';
type qwet = {
  opened: boolean;
};
export const useMount = ({ opened }: qwet) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!mounted && opened) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);
  console.log('mounted', mounted);
  console.log('opeend', opened);

  return {
    mounted,
  };
};
