import React from 'react';
import { Stack, Box } from '@mui/material';
import { createPortal } from 'react-dom';
import {
  SortByText,
  SortContainer,
  SortStatementText,
  SortList,
  Arrow,
} from './styles';

const Sort = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLUListElement>(null);
  const stackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node) &&
        stackRef.current &&
        !stackRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!toggle || !stackRef.current || !sortRef.current) return;

    const sortListEl = sortRef.current;
    const stackEl = stackRef.current;

    const containerRect = stackEl.getBoundingClientRect();
    const containerTop = containerRect.top + window.pageYOffset + 20;
    const containerLeft = containerRect.left + window.pageXOffset;

    sortListEl.style.top = `${containerTop + stackEl.offsetHeight}px`;
    sortListEl.style.left = `${containerLeft}px`;
    sortListEl.style.width = `${stackEl.offsetWidth}px`;
  }, [toggle]);

  return (
    <Stack ref={stackRef} justifyContent="center" alignItems="start">
      <SortContainer onClick={() => setToggle(!toggle)}>
        <Stack direction="row" alignItems="center">
          <SortByText>Sort By:</SortByText>
          <SortStatementText>Date (Latest)</SortStatementText>
          <Arrow toggle={toggle} />
        </Stack>
      </SortContainer>
      {toggle ? (
        <Box width="100%">
          <SortList ref={sortRef} toggle={toggle}>
            <li>Date (Latest)</li>
            <li>Date (Oldest)</li>
          </SortList>
        </Box>
      ) : null}
    </Stack>
  );
};

export default Sort;
