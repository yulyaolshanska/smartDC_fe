import React from 'react';
import { Stack } from '@mui/system';

import { ReactComponent as SearchIcon } from '@assets/Search.svg';
import {
  Container,
  SearchIconContainer,
  StyledInput,
  StyledStack,
} from './styles';
import { debounce } from 'utils/functions/debounce';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

interface SearchBarProps {
  setNotesLocal: ([]) => void;
}

const SearchBar = React.memo(({ setNotesLocal }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [value, setValue] = React.useState<string>('');

  const handleInputChange = React.useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setNotesLocal([]);
      dispatch(noteFilterActions.clearSkipAmount());
      dispatch(noteFilterActions.setSearchString(event.target.value));
      await refetchNotes();
    }, 500),

    []
  );

  // React.useEffect(() => {
  //   refetchNotes();
  // }, [filterParams]);

  return (
    <Container onClick={handleContainerClick}>
      <StyledStack>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <StyledInput
          ref={inputRef}
          placeholder="Search"
          onChange={handleInputChange}
        ></StyledInput>
      </StyledStack>
    </Container>
  );
});

export default SearchBar;
