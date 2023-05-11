import React from 'react';

export const useConditionalRender = (state: boolean) => {
  return React.useMemo(() => {
    return state ? (children: React.ReactNode) => children : () => null;
  }, [state]);
};
