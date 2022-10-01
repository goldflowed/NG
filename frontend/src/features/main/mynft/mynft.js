
import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import { nftContract } from "../../../common/web3/web3Config"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';

// tokenId 번호 -> tokenId에 따른 블록 정보 불러오기
function MyNft() {

    const [tokenlength, settokenlength] = useState(0);
    const [tokenId, setTokenId] = useState([]);
    const [tokenInfo, settokenInfo] = useState([]);

    async function getTokenLength(){
        const Wallet = window.localStorage.getItem('wallet');

        const Token = await nftContract.methods.getOwnedTokens(Wallet).call();

        console.log('토큰 정보 : ', Token);
        console.log('토큰의 개수 = ', Token.length)
        
        // 토큰의 길이가 담겨있는 상황
        await settokenlength(Token.length);
        
        // Token의 Array 지정
        var ArrToken = [];

        // TokenId 값 삽입
        for(let i = 0; i < Token.length; i++){
            await ArrToken.push(Token[i]);
        }
        await setTokenId(ArrToken);

        // Token의 Info 삽입
        var ArrTokenInfo = [];
        for(let i = 0; i < Token.length; i++){
            const TokenDetail = await nftContract.methods.ngs(Token[i]).call();
            // TokenDetail과 TokenId를 배열로 생성해서 ArrTokenInfo에 삽입
            var DetailId = [TokenDetail, Token[i]];
            await ArrTokenInfo.push(DetailId);
            console.log('토큰정보와 아이디', ArrTokenInfo)
        }
        
        await settokenInfo(ArrTokenInfo);
    }
    const history = useNavigate();

    const showDetail = (token) => {
        
        history(`${token[0].serialNo}`, {state: {token}});
    }

    useEffect( () => {
        
        getTokenLength();
    
    }, [])

    return(
        <div>
            <NavBar/>
            <div style={{height:500}}>
                <p style={{marginTop:'100px'}}></p>
                {/* <p>{tokenlength}</p> */}
                {/* <p>토큰 아이디 : {tokenId}</p>
                <p>토큰 정보 : {JSON.stringify(tokenInfo)}</p> */}
                {/* <p>테스트중</p> */}
                {tokenInfo.map((token) => {
                    return(
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>시리얼번호 : {token[0].serialNo}</MDBCardTitle>
                            <MDBCardText>
                                토큰아이디 : {token[1]} <br/>
                                브랜드이름 : {token[0].product.brandNm}                                
                            </MDBCardText>
                            <MDBBtn onClick={() => showDetail(token)}>Detail</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default MyNft;