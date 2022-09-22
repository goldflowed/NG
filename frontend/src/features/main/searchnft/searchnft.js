import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from "react"
import {
  MDBInputGroup,
  MDBBtn
} from 'mdb-react-ui-kit';

function SearchNft() {

    const [txnHash, settxnHash] = useState("");

    const onTxnHandler = (event) => {
        console.log(event.currentTarget.value);
        settxnHash(event.currentTarget.value);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(txnHash);
    }

    return(
        <div>
            <NavBar/>
            <div style={{height:500}}>
                <br/><br/><br/><br/>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="해쉬 주소를 입력하세요." type='text' onChange={onTxnHandler}/>
                    <MDBBtn outline onClick={onSubmit}>Search</MDBBtn>  
                </MDBInputGroup>
            </div>
            <Footer/>
        </div>
    )

}

export default SearchNft;