import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from '@assets/Search.svg';

import { debounce } from 'utils/functions/debounce';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { INotes } from '..';
import { usePrevious } from 'utils/hooks/usePrevious';
import {
  Container,
  SearchIconContainer,
  StyledInput,
  StyledStack,
} from './styles';

interface SearchBarProps {
  setNotesLocal: (arg: INotes[]) => void;
}

const SearchBar = React.memo(({ setNotesLocal }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const { t } = useTranslation();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [value, setValue] = React.useState<string>('');
  const prevProps = usePrevious(value);
  const handleInputChange = React.useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === prevProps.current) {
        return;
      }
      setValue(event.target.value);
      setNotesLocal([]);
      dispatch(noteFilterActions.clearSkipAmount());
      dispatch(noteFilterActions.setSearchString(event.target.value));
      await refetchNotes();
    }, 1000),

    []
  );

  return (
    <Container onClick={handleContainerClick}>
      <StyledStack>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <StyledInput
          ref={inputRef}
          placeholder={`${t('Notes.Search')}`}
          onChange={handleInputChange}
        ></StyledInput>
      </StyledStack>
    </Container>
  );
});

export default SearchBar;
