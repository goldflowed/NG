import NavBar from "../../../common/navbar/NavBar"
import React from 'react';
import {
  MDBInputGroup,
  MDBBtn
} from 'mdb-react-ui-kit';

function SearchNft() {

    return(
        <div>
            <NavBar/>
            <br/><br/><br/><br/>
            <MDBInputGroup className='mb-3'>
                <input className='form-control' placeholder="해쉬 주소를 입력하세요." type='text' />
                <MDBBtn outline>Search</MDBBtn>
            </MDBInputGroup>

        </div>
    )

}

export default SearchNft;