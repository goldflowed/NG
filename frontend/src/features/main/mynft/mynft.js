
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
import './mynft.css'
import Button from 'react-bootstrap/Button';

import axios from "../../../common/api/http-common";
import ipfs_apis from "../../../common/api/ipfs"

// tokenId 번호 -> tokenId에 따른 블록 정보 불러오기
function MyNft() {

    const [tokenlength, settokenlength] = useState(0);
    const [tokenId, setTokenId] = useState([]);
    const [tokenInfo, settokenInfo] = useState([]);
    const [productImg, setproductImg] = useState();

    async function getTokenLength() {

        const Wallet = window.localStorage.getItem('wallet');

        const Token = await nftContract.methods.getOwnedTokens(Wallet).call();
        console.log(Token);

        // 토큰의 길이가 담겨있는 상황
        await settokenlength(Token.length);

        // Token의 Array 지정
        var ArrToken = [];

        // TokenId 값 삽입
        for (let i = 0; i < Token.length; i++) {
            await ArrToken.push(Token[i]);
        }
        await setTokenId(ArrToken);

        // Token의 Info 삽입
        var ArrTokenInfo = [];
        var ImgUrl = "";
        for (let i = 0; i < Token.length; i++) {
            const TokenDetail = await nftContract.methods.ngs(Token[i]).call();
            await axios.get(`product/${TokenDetail.product.productNo}`)
                // eslint-disable-next-line no-loop-func
                .then((res) => {
                    setproductImg(ipfs_apis.https_public.concat(res.data.proUrl));
                    ImgUrl = ipfs_apis.https_public.concat(res.data.proUrl);
                })
            // TokenDetail과 TokenId를 배열로 생성해서 ArrTokenInfo에 삽입
            var DetailId = [TokenDetail, Token[i], ImgUrl];
            await ArrTokenInfo.push(DetailId);
        }

        await settokenInfo(ArrTokenInfo);


    }
    const history = useNavigate();

    const showDetail = (token) => {

        history(`${token[0].serialNo}`, { state: { token } });
    }

    useEffect(() => {

        getTokenLength();

    }, [])

    return (
        <div>
            <NavBar />
            <div>
                <div className="mynft-title">
                    <h1>나의 NFT 목록</h1>
                </div>
                <div className="mynft-contents">
                    {
                        tokenlength === 0
                            ? <div className="mynft-none-parent">
                                <div className="mynft-none">
                                    <h2>No items to display</h2>
                                </div>
                            </div>
                            : <div className="mynft-main row">
                                {tokenInfo.map((token) => {
                                    return (
                                        <div className="col-lg-3 mt-4" style={{ minWidth: 300, maxWidth: 400 }}>
                                            <MDBCard className="mynft-card">
                                                <MDBCardBody>
                                                    <img src={token[2]} alt="productImage" style={{ width: "20rem" }} />
                                                    <br /><br />
                                                    {/* <MDBCardTitle>토큰아이디 : {token[1]}</MDBCardTitle> */}
                                                    <MDBCardTitle>브랜드 이름 : {token[0].product.brandNm}</MDBCardTitle>
                                                    <MDBCardTitle>제품 이름 : {token[0].product.productName}</MDBCardTitle>
                                                    <MDBCardTitle>상품 일련 번호 : {token[0].serialNo}  </MDBCardTitle>
                                                    <br />
                                                    <div className="myButton">
                                                        <Button className="mynft-button" variant="outline-primary" onClick={() => showDetail(token)}>Detail</Button>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyNft;