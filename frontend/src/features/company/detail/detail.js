import React, { useState, useEffect, useMemo } from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import Footer from "../../../common/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "../../../common/api/http-common";
import { nftContract, web3 } from "../../../common/web3/web3Config";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';


import './detail.css';

const ContainerDiv = styled.div`
  `

const MainDiv = styled.div`
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  margin-top:25px;
  margin-left: 35rem;
  width: 50rem;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const TitleP = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'MaruBuri-Regular';
  margin-top: 4rem;
  display: flex;
  justify-content: center
  `

const ProductDiv = styled.div`
  margin-top: 4rem;
  width:100%;
  `

const InfoDiv = styled.div`
  display:flex;
  flex-direction:row;
  margin-left: 5rem;
  font-family: 'MaruBuri-Regular';
  `

const InfoPDiv = styled.div`
  margin-left:10px;
  display: flex;
  justify-content: center
  font-family: 'MaruBuri-Regular';
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
  const [sameArr, setSameArr] = useState([]);

  const history = useNavigate();


  // 두번째 history
  const [SndtokenHistory, setSndTokenHistory] = useState([]);
  const [Sndhistorylength, setSndhistorylength] = useState(0);

  const params = useParams();
  const { state } = useLocation();

  const from = window.localStorage.getItem('wallet');

  const onSerialHandler = (event) => {
    setSerialNo(event.currentTarget.value);
  }

  // 등록 버튼 클릭 시
  const onRegister = async (e) => {
    // nft 발급
    await nftContract.methods.mint(productCode, serialNo, year, month)
      .send({ from: from });

    // 토큰 아이디 저장
    const tokenNum = await nftContract.methods.totalSupply().call() - 1;

    const TokenHistory = await nftContract.methods.getTokenHistory(tokenNum).call();
    await setTokenHistory(TokenHistory);

    const DectokenHistory = await Number(TokenHistory[0].blockNumber);

    // TokenHistory 16진수로 변환
    const hexHistory = await DectokenHistory.toString(16);
    const realhex = '0x' + hexHistory;

    // string to number
    const numhistory = await Number(realhex);

    // getblock을 통한 transactions 구하기 
    const block = await web3.eth.getBlock(numhistory);

    // transaction hash
    const transactions = await block.transactions[0];

    // setTxnHashToTokenId
    await nftContract.methods.setTxnHashToTokenId(transactions, tokenNum).send({ from: from })

    alert("NFT 등록 완료")
    // 새로고침
    // eslint-disable-next-line no-restricted-globals
    await location.reload();
  }

  // 현재 날짜
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  async function getTable() {
    const Wallet = window.localStorage.getItem('wallet');
    // 전체 토큰 개수
    const tokenCnt = await nftContract.methods.totalSupply().call() - 1;

    var proArr = [];
    var count = 0;

    for (let i = 0; i <= tokenCnt + 1; i++) {
      // 발행자 주소를 찾아서 Wallet과 같을 경우 배열에 담아서 출력
      const SndTokenHistory = await nftContract.methods.getTokenHistory(i).call();
      await setSndTokenHistory(SndTokenHistory);
      await setSndhistorylength(SndTokenHistory.length);

      // tokenHistory[i].blockNumber -> string to number()
      const SndDectokenHistory = await Number(SndTokenHistory[0].blockNumber);

      // TokenHistory 16진수로 변환
      const SndhexHistory = await SndDectokenHistory.toString(16);
      const Sndrealhex = '0x' + SndhexHistory;

      // string to number
      const Sndnumhistory = await Number(Sndrealhex);

      // getblock을 통한 transactions 구하기 
      const Sndblock = await web3.eth.getBlock(Sndnumhistory);

      // transaction hash
      const Sndtransactions = await Sndblock.transactions[0];

      const Sndreceipt = await web3.eth.getTransactionReceipt(Sndtransactions);

      const FirstAdd = Sndreceipt.logs[0].topics[2];
      const newFirstAdd = FirstAdd.slice(-4);
      const newWallet = Wallet.slice(-4);

      if (newFirstAdd === newWallet) {
        const SndTokenDetail = await nftContract.methods.ngs(i).call();
        if (params.productCode === SndTokenDetail.product.productNo) {
          count++;
          var productArr = [SndTokenDetail, count, SndTokenHistory.length, i];
          await proArr.push(productArr);
        }
      }
      setSameArr(proArr);
    }



    /*
    const Token = await nftContract.methods.getOwnedTokens(Wallet).call();

    // console.log('토큰 정보 : ', Token);
    // console.log('토큰의 개수 = ', Token.length)

    // 토큰의 길이가 담겨있는 상황
    // await settokenlength(Token.length);

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

    //  배열 만들어서 같은 productNo이면 삽입
    var proArr = [];
    var count = 0;
    for(let i = 0; i < Token.length; i++){
      const prodNo = await ArrTokenInfo[i].product.productNo;
      console.log(prodNo);
      console.log();

      if(state.productNo === prodNo){
        count++;
        var productArr = [ArrTokenInfo[i], count];
        await proArr.push(productArr);
      }
    }
    setSameArr(proArr);
    */
  }

  const showNftDetail = (data) => {
    history(`${data[0].serialNo}`, { state: data })
  }

  useEffect(() => {
    axios.get(`product/${params.productCode}`)
      .then((res) => {
        setProductImg('https://ipfs.io/ipfs/'.concat(res.data.proUrl))
      })
    setProductName(state.productName)
    setProductMadeIn(state.madeIn)
    setProductCode(state.productNo)
    setProductMfd(state.mfd)

    // 테이블 정보 얻기
    getTable();
  }, []);

  return (
    <ContainerDiv>
      <NavBar />
      <SideBar />
      <MainDiv>
        <TitleP>{productName}</TitleP>
        <ProductDiv>
          <InfoDiv>
            <img src={productImg} alt="productImage" style={{ width: "12rem" }} />
            <InfoPDiv>
              <Card style={{ width: '22rem', height: '12rem' }}>
                <Card.Body>
                  <Card.Title style={{ marginTop: 20 }}>제 품 명 : {productName}</Card.Title>
                  <Card.Title style={{ marginTop: 10 }}>제 품 코 드 : {productCode}</Card.Title>
                  <Card.Title style={{ marginTop: 10 }}>출 고 일 : {productMfd}</Card.Title>
                  <Card.Title style={{ marginTop: 10 }}>제 조 국 : {productMadeIn}</Card.Title>
                </Card.Body>
              </Card>
            </InfoPDiv>
          </InfoDiv>
        </ProductDiv><Hr />
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
                  <th className="table-th1"><div>#</div></th>
                  <th className="table-th2"><div>시리얼 번호</div></th>
                  <th className="table-th3"><div>전송 여부</div></th>
                </tr>
              </thead>
              <tbody>
                {sameArr.map((res) => {
                  return (
                    <tr style={{ cursor: "pointer" }} onClick={() => showNftDetail(res)}>
                      <td>{res[1]}</td>
                      <td>{res[0].serialNo}</td>
                      <td>
                        {
                          res[2] === 1
                            ? <h5>No</h5>
                            : <h5>Yes</h5>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </MainDiv>
      <Footer />
    </ContainerDiv>
  )
}
export default Detail;