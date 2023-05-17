import React from 'react';

export const useConditionalRender = (state: boolean) => React.useMemo(() => (state ? (children: React.ReactNode) => children : () => null), [state]);
