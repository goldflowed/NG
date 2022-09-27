import React from 'react'
import NavBar from '../../../common/navbar/NavBar'
import Footer from '../../../common/footer/Footer'

function detailnft(props) {

    console.log(props.name);
    return(
        <div>
            <NavBar/>
            <div style={{height:500,}}>
                <p style={{marginTop:100}}></p>
            </div>
            <Footer/>
        </div>
        
    )
}

export default detailnft;