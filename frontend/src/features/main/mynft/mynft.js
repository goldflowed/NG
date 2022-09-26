
import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import { nftContract, web3 } from "../../../common/web3/web3Config"
import { useState, useEffect } from "react"
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage
  } from 'mdb-react-ui-kit';

// tokenId 번호 -> tokenId에 따른 블록 정보 불러오기
function MyNft() {

    const [brandNm, setbrandNm] = useState([]);
    const [productNo, setproductNo] = useState([]);
    const [serialNo, setserialNo] = useState([]);
    const [mfd, setmfd] = useState([]);
    const [madeIn, setmadeIn] = useState([]);
    const [token, setToken] = useState([]);

    const [tokenNum, settokenNum] = useState([]);

    const [tokenlength, settokenlength] = useState("");

        

        useEffect( () => {
            const current_wallet = window.localStorage.getItem('wallet');

            console.log(current_wallet);

            nftContract.methods.getOwnedTokens(current_wallet).call().then((res) => {

                settokenNum(res);
                settokenlength(res.length);})
    
                console.log(tokenNum);
                console.log(tokenlength);

                var tokenInfo = [];

                for(var i = 0; i < tokenlength; i++){
                    nftContract.methods.ngs(i).call()
                    .then((res) => {
                        console.log(res)
                        tokenInfo.push(res)
                    })
                    console.log(tokenInfo)
                    setToken(tokenInfo)
                }

        }, [tokenlength])

    return(
        <div>
            <NavBar/>
            <div style={{height:500}}>
                <p style={{marginTop:'100px'}}></p>
                {/* <div>13{tokendetail(token)}</div> */}
                <div>
                    <table>
                        <tr>
                            <th>브랜드명</th>
                            <th>제품번호</th>
                            <th>시리얼번호</th>
                        </tr>
                        {/* {tokenlength} */}
                        {/* {JSON.stringify(token)} */}
                        {token && 
                            token.map((token) => (
                                <MDBCard key={token.serialNo}>
                                <MDBCardBody>{token.brandNm}, {token.productNo}, {token.serialNo}
                                <button>detail</button>
                                 </MDBCardBody>
                                </MDBCard>
                                // <div key={token.serialNo}>
                                //     <div>
                                //         <td>{token.brandNm}</td>
                                //         <td>{token.productNo}</td>
                                //         <td>{token.serialNo}</td>
                                //     </div>
                                // </div>
                            ))
                        }
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MyNft;