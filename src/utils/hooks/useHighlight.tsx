import { useAppSelector } from '@redux/hooks';

export const useHighlight = (text: string) => {
  if (!text) {
    return null;
  }
  const searchValue = useAppSelector(
    (state) => state.noteFilterReducer.searchString
  );

  const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));

  return (
    <span>
      {parts.map((part) =>
        part.toLowerCase() === searchValue.toLowerCase() ? (
          <mark>{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
