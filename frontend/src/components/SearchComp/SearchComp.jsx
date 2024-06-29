import React, { useState } from 'react';
import { TextField, IconButton, Box, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComp = ({ onSearch, suggestions }) => {

  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleSelect = (event, value) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <Box display="flex" alignItems="center">
      <Autocomplete
        freeSolo
        options={suggestions}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search..."
            size="large"
            sx={{ marginRight: 1, width: "100vh" }}
          />
        )}
      />
      <IconButton onClick={handleSearch} color="primary">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchComp;
