import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import Footer from "../../../common/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "../../../common/api/http-common";
import { nftContract, web3 } from "../../../common/web3/web3Config";
import { useLocation } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './detail.css';

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  `

const MainDiv = styled.div`
  /* background-color: red; */
  width: 1550px;
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  margin-left:400px;
  margin-top:25px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const TitleP = styled.p`
  width:1350px;
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  margin-left: 20px;
  `

const ProductDiv = styled.div`
  width:100%;
  `

const InfoDiv = styled.div`
  display:flex;
  flex-direction:row;
  `

const InfoPDiv = styled.div`
  margin-left:10px;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  `
const TableDiv = styled.div`
  margin:auto;
  width:800px;
  max-height: 400px;
  overflow-y: auto;
  display:flex;
  flex-direction:column;
  `

function Detail() {
  const [nfts, setNfts] = useState([])
  const [productImg, setProductImg] = useState('')
  const [productName, setProductName] = useState('')
  const [productMadeIn, setProductMadeIn] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productMfd, setProductMfd] = useState('')
  const [serialNo, setSerialNo] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenHistory, setTokenHistory] = useState([]);
  const [historylength, sethistorylength] = useState(0);
  const [tokenlength, settokenlength] = useState(0);
  const [tokenInfo, settokenInfo] = useState("");

  const params = useParams();
  const { state } = useLocation();

  const from = window.localStorage.getItem('wallet');

  const onSerialHandler = (event) => {
    setSerialNo(event.currentTarget.value);
  }

  // 등록 버튼 클릭 시
  const onRegister = async (e) => {
    console.log('등록 버튼 클릭 후', serialNo);
    console.log('productCode', productCode);
    console.log('serialNo', serialNo);
    console.log('year', year);
    console.log('month', month);
    // nft 발급
    await nftContract.methods.mint(productCode, serialNo, year, month)
      .send({from:from});

    // 토큰 아이디 저장
    const tokenNum = await nftContract.methods.totalSupply().call() - 1;
    console.log('tokenId', tokenNum);

    const TokenHistory = await nftContract.methods.getTokenHistory(tokenNum).call();
    await setTokenHistory(TokenHistory);
    
    const DectokenHistory = await Number(TokenHistory[0].blockNumber);

    // TokenHistory 16진수로 변환
    const hexHistory = await DectokenHistory.toString(16);
    console.log('16진수 변환', hexHistory);
    const realhex = '0x'+ hexHistory;
    console.log('realhex', realhex);

     // string to number
     const numhistory = await Number(realhex);
     console.log('numhistory', numhistory);
     console.log('numhistory타입', typeof(numhistory))

    // getblock을 통한 transactions 구하기 
    const block = await web3.eth.getBlock(numhistory);
    console.log(block);

    // transaction hash
    const transactions = await block.transactions[0];
    console.log('transactions', transactions)

    // setTxnHashToTokenId
    await nftContract.methods.setTxnHashToTokenId(transactions, tokenNum).send({from:from})
  }

  // 현재 날짜
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth()+1;

  async function getTable(){
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
        await ArrTokenInfo.push(TokenDetail);
        console.log('토큰정보와 아이디', ArrTokenInfo)
    }
    // await settokenInfo(ArrTokenInfo);

    for(let i = 0; i < Token.length; i++){
      const prodNo = await ArrTokenInfo[i].product.productNo;
      console.log(prodNo);

    }




  }

  useEffect(() => {
    console.log(params.productCode)
    axios.get(`product/${params.productCode}`)
    .then((res) => {
      setProductImg(res.data.proUrl)
    })
    console.log(state)
    setProductName(state.productName)
    setProductMadeIn(state.madeIn)
    setProductCode(state.productNo)
    setProductMfd(state.mfd)

    // 테이블 정보 얻기
    getTable();
  }, []);

  return (
    <ContainerDiv>
      <NavBar/>
      <SideBar/>
      <MainDiv>
        <TitleP>등록 제품 정보 {'>'} 제품 상세 페이지</TitleP><Hr/>
        <ProductDiv>
          <InfoDiv>
            <img src={productImg} alt="productImage" style={{width:"33%"}}/>
            <InfoPDiv>
              <p>제 품 명 : {productName}</p>
              <p>제 품 코 드 : {productCode}</p>
              <p>출 고 일 : {productMfd}</p>
              <p>제 조 국 : {productMadeIn}</p>
            </InfoPDiv>
          </InfoDiv>
        </ProductDiv><Hr/>
        <div className="register-overall">
          <div className="nfttable-title">
            <h2>제품 NFT 등록하기</h2>
            {/* {JSON.stringify(tokenInfo.productNo)} */}
          </div>  
          <div className="nft-register">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="시리얼 번호를 입력하세요."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={onSerialHandler}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={onRegister}>
                NFT 등록
              </Button>
            </InputGroup>
          </div>
          <div className="detail-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>시리얼 번호</th>
                <th>전송 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Detail;