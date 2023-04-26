import React from 'react';
import { Stack, Box } from '@mui/material';
import { createPortal } from 'react-dom';
import {
  SortByText,
  SortContainer,
  SortStatementText,
  SortList,
  Arrow,
  SortItem,
} from './styles';
import { relative } from 'path';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { noteApi } from 'services/NoteService';
interface SortProps {
  setNotesLocal: ([]) => void;
}

const Sort = React.memo(({ setNotesLocal }: SortProps) => {
  const dispatch = useAppDispatch();

  const sortPositions = ['Date', 'Doctor'];
  const sortOrderPositions = ['desc', 'asc'];

  const [toggleSortBy, setToggleSortBy] = React.useState<boolean>(false);
  const [toggleSortOrder, setToggleSortOrder] = React.useState<boolean>(false);
  const sortByRef = React.useRef<HTMLUListElement>(null);
  const sortByStackRef = React.useRef<HTMLDivElement>(null);
  const sortOrderRef = React.useRef<HTMLUListElement>(null);
  const sortOrderStackRef = React.useRef<HTMLDivElement>(null);

  const sortBy = useAppSelector((state) => state.noteFilterReducer.sortBy);
  const sortOrder = useAppSelector(
    (state) => state.noteFilterReducer.sortOrder
  );
  const filterParams = useAppSelector((state) => state.noteFilterReducer);

  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const handleSortBy = (arg: string) => {
    setNotesLocal([]);
    dispatch(noteFilterActions.setSortBy(arg));
    setToggleSortBy(false);
    dispatch(noteFilterActions.clearSkipAmount());
    refetchNotes();
  };

  const handleSortOrder = (arg: string) => {
    setNotesLocal([]);
    dispatch(noteFilterActions.setSortOrder(arg));
    setToggleSortOrder(false);
    refetchNotes();
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        (sortByRef.current &&
          !sortByRef.current.contains(event.target as Node) &&
          sortByStackRef.current &&
          !sortByStackRef.current.contains(event.target as Node)) ||
        (sortOrderRef.current &&
          !sortOrderRef.current.contains(event.target as Node) &&
          sortOrderStackRef.current &&
          !sortOrderStackRef.current.contains(event.target as Node))
      ) {
        setToggleSortBy(false);
        setToggleSortOrder(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Stack direction="row">
      <Stack
        ref={sortByStackRef}
        justifyContent="center"
        alignItems="start"
        position="relative"
      >
        <SortContainer onClick={() => setToggleSortBy(!toggleSortBy)}>
          <Stack direction="row" alignItems="center" gap="5px">
            <SortByText>Sort By:</SortByText>
            <SortStatementText>{sortBy}</SortStatementText>
            <Arrow toggle={toggleSortBy} />
          </Stack>
        </SortContainer>
        {toggleSortBy ? (
          <Box width="100%">
            <SortList ref={sortByRef} toggle={toggleSortBy}>
              {sortPositions.map((obj) => (
                <SortItem
                  onClick={() => handleSortBy(obj)}
                  selected={sortBy === obj}
                >
                  {obj}
                </SortItem>
              ))}
            </SortList>
          </Box>
        ) : null}
      </Stack>
      <Stack
        ref={sortOrderStackRef}
        justifyContent="center"
        alignItems="start"
        position="relative"
      >
        <SortContainer onClick={() => setToggleSortOrder(!toggleSortOrder)}>
          <Stack direction="row" alignItems="center" gap="5px">
            <SortByText>Sort Order: </SortByText>
            <SortStatementText>{sortOrder}</SortStatementText>
            <Arrow toggle={toggleSortOrder} />
          </Stack>
        </SortContainer>
        {toggleSortOrder ? (
          <Box width="100%">
            <SortList ref={sortOrderRef} toggle={toggleSortOrder}>
              {sortOrderPositions.map((obj) => (
                <SortItem
                  onClick={() => handleSortOrder(obj)}
                  selected={sortOrder === obj}
                >
                  {obj}
                </SortItem>
              ))}
            </SortList>
          </Box>
        ) : null}
      </Stack>
    </Stack>
  );
});

export default Sort;
