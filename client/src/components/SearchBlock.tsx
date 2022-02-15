import React, {useState} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {SEARCH_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const SearchBlock = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>('')

  const onSearchHandler = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    if (search.trim() === '') {
      return event.preventDefault()
    }
    navigate(SEARCH_ROUTE + '/title=' + search)
    setSearch('')
  }

  return (
    <InputGroup>
      <FormControl
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(event) =>
          (event.key === 'Enter') && onSearchHandler(event)
        }
        type="search"
        placeholder="I search ..."
        aria-label="Search"
        aria-describedby="search-products"
      />
      <Button
        variant="outline-secondary"
        id="search"
        onClick={(e) => onSearchHandler(e)}
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBlock;