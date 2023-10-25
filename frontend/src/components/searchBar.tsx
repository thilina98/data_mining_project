import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleInput,
  handleSearch,
  searchTerm,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      fullWidth
      sx={{ mt: 2, mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
