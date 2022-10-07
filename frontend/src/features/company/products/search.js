import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './search.css';

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <div className="input-main">
    <InputGroup name="filter" className="mb-3" style={{width:'30rem', marginRight:0}}>
        <Form.Control
          style={{marginTop: '2rem'}}
          placeholder="키워드를 입력해주세요."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onSubmit={handleSubmit}
        />
        <Button style={{marginTop: '2rem'}} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
    </InputGroup>
    </div>
    // <form onSubmit={handleSubmit} style={{marginBottom:"10px"}}>
    //   <input name="filter" />
    //   <button>Search</button>
    // </form>
  );
}

export default Search;
