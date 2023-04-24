import React from 'react';
import { Stack } from '@mui/system';

import { ReactComponent as SearchIcon } from '@assets/Search.svg';
import {
  Container,
  SearchIconContainer,
  StyledInput,
  StyledStack,
} from './styles';

const SearchBar = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      <StyledStack>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <StyledInput ref={inputRef} placeholder="Search"></StyledInput>
      </StyledStack>
    </Container>
  );
};

export default SearchBar;
