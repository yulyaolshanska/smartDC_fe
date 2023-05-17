import React from 'react';

type RefObject = {
  current: HTMLElement | null;
};

interface UseHandleOutsideClick {
  (
    sortByRef: RefObject,
    sortByStackRef: RefObject,
    sortOrderRef: RefObject,
    sortOrderStackRef: RefObject,
    setToggleSortBy: (toggleSortBy: boolean) => void,
    setToggleSortOrder: (toggleSortOrder: boolean) => void
  ): void;
}

export const useHandleOutsideClick: UseHandleOutsideClick = (
  sortByRef,
  sortByStackRef,
  sortOrderRef,
  sortOrderStackRef,
  setToggleSortBy,
  setToggleSortOrder,
) => {
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      (sortByRef.current
        && !sortByRef.current.contains(event.target as Node)
        && sortByStackRef.current
        && !sortByStackRef.current.contains(event.target as Node))
      || (sortOrderRef.current
        && !sortOrderRef.current.contains(event.target as Node)
        && sortOrderStackRef.current
        && !sortOrderStackRef.current.contains(event.target as Node))
    ) {
      setToggleSortBy(false);
      setToggleSortOrder(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return handleOutsideClick;
};
