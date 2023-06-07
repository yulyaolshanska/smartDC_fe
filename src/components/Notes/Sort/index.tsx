import React from 'react';
import { Stack, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  SortByText,
  SortContainer,
  SortStatementText,
  SortList,
  Arrow,
  SortItem,
} from './styles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { noteApi } from 'services/NoteService';
import { INotes } from '..';
import { useHandleOutsideClick } from './hooksSort';
interface SortProps {
  setNotesLocal: (arg: INotes[]) => void;
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
    dispatch(noteFilterActions.clearSkipAmount());
    setToggleSortBy(false);
    refetchNotes();
  };

  const handleSortOrder = (arg: string) => {
    setNotesLocal([]);
    dispatch(noteFilterActions.setSortOrder(arg));
    dispatch(noteFilterActions.clearSkipAmount());
    setToggleSortOrder(false);
    refetchNotes();
  };

  const handleOutsideClick = useHandleOutsideClick(
    sortByRef,
    sortByStackRef,
    sortOrderRef,
    sortOrderStackRef,
    setToggleSortBy,
    setToggleSortOrder
  );

  const { t } = useTranslation();


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
            <SortByText>{t('Notes.sortBy')}</SortByText>
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
            <SortByText>{t(`Notes.sortOrder`)}</SortByText>
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
