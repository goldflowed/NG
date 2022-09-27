
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
  import { MDBBtn } from 'mdb-react-ui-kit';
  import {useNavigate}from 'react-router-dom'
  import DetailNft from './detailnft';

// tokenId 번호 -> tokenId에 따른 블록 정보 불러오기
function MyNft({pk}) {
    const history = useNavigate();

    const [token, setToken] = useState([]);

    const [tokenNum, settokenNum] = useState([]);

    const [tokenlength, settokenlength] = useState("");
    const [tokenInfo, settokenInfo] = useState([]);
    const [response, setresponse] = useState([])

    // 객체 데이터 삽입
    // const [data, setData] = useState([]);

    // const nftdetail = (pk) => {
    //     setData(pk);
    //     history(`/mynft/${pk.serialNo}`)
    // }

        const asyncFunc = async () => {
            tokenInfo.push(response);
            await setToken(tokenInfo);
        }

        useEffect( () => {
            const current_wallet = window.localStorage.getItem('wallet');

            console.log(current_wallet);

            nftContract.methods.getOwnedTokens(current_wallet).call().then((res) => {

                settokenNum(res);
                settokenlength(res.length);
    
                console.log(tokenNum);
                console.log(tokenlength);

                let tokenInfo = [];

                console.log(tokenInfo);
                for(let i = 0; i < tokenlength; i++){
                    nftContract.methods.ngs(i).call()
                    .then((res) => {
                        console.log(i);
                        console.log(res)
                        // console.log(tokenInfo)
                        setresponse(res)
                        console.log(response)
                        asyncFunc()
                        // tokenInfo.push(res)
                        // setToken(tokenInfo)
                    })
                }
            })
        }, [tokenlength])

    return(
        <div>
            <NavBar/>
            <div style={{height:500}}>
                <p style={{marginTop:'100px'}}></p>
                <div>
                    {/* <table> */}
                        {
                            token.map((pk) => {
                                return (
                                    <MDBCard key={pk.serialNo}>
                                        <MDBCardBody>{pk.brandNm}, {pk.productNo}, {pk.serialNo}
                                            <button onClick={() => console.log(pk)}>detail</button>
                                        </MDBCardBody>
                                    </MDBCard>
                                );
                            })
                        }
                    {/* </table> */}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MyNft;