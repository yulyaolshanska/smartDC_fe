import React from 'react';

import { ANIMATION_TIME } from 'constants/animation';

interface UseMountProps {
  opened: boolean;
}
export const useMount = ({ opened }: UseMountProps) => {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!mounted && opened) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);

  return {
    mounted,
  };
};
