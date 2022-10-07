import React from 'react'
import NavBar from '../../../common/navbar/NavBar'
import Footer from '../../../common/footer/Footer'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { nftContract, web3 } from "../../../common/web3/web3Config";
import Modal from './modal.js';
import Modal2 from './modal2.js';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './detailnft.css';

import axios from "../../../common/api/http-common";


function detailnft() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productImg, setproductImg] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const tokenInfo = location.state.token;
  console.log('토큰 정보', tokenInfo);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tokenHistory, setTokenHistory] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tokenId, settokenId] = useState(tokenInfo[1]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [historylength, sethistorylength] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [receipt, setreceipt] = useState([])
  // modal 관련 함수
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modalOpen2, setModalOpen2] = useState(false);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [totalPeriod, settotalperiod] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [txnHash, setTxnHash] = useState()

  async function getDetail() {
    console.log('tokenInfo[2]', tokenInfo[2]);
    setproductImg(tokenInfo[2]);


    const TokenHistory = await nftContract.methods.getTokenHistory(tokenId).call();
    console.log('TokenHistory', TokenHistory);
    console.log('TokenHistory[0]', TokenHistory[0]);
    await setTokenHistory(TokenHistory);
    console.log('TokenHistory[0]타입', typeof (TokenHistory[0]))
    console.log('TokenHistory타입', typeof (TokenHistory))
    console.log('TokenHistory 길이', TokenHistory.length)
    await sethistorylength(TokenHistory.length);

    // receipt를 삽입하는데 사용되는 배열
    const RecArray = [];
    var TmpArray = [];
    var usePeriodYear = 0;
    var usePeriodMonth = 0;
    var totalPeriod = 0;
    for (let i = 0; i < TokenHistory.length; i++) {
      // tokenHistory[i].blockNumber -> string to number()
      const DectokenHistory = await Number(TokenHistory[i].blockNumber);

      // TokenHistory 16진수로 변환
      const hexHistory = await DectokenHistory.toString(16);
      console.log('16진수 변환', hexHistory);
      const realhex = '0x' + hexHistory;
      console.log('realhex', realhex);

      // string to number
      const numhistory = await Number(realhex);
      console.log('numhistory', numhistory);
      console.log('numhistory타입', typeof (numhistory))

      // getblock을 통한 transactions 구하기 
      const block = await web3.eth.getBlock(numhistory);
      console.log('이것은 블록이다: ', block);

      // transaction hash
      const transactions = await block.transactions[0];
      console.log('transactions', transactions)
      setTxnHash(transactions)

      const receipt = await web3.eth.getTransactionReceipt(transactions);
      console.log('receipt', receipt);

      var usePeriod = 0;
      if (i === 0) {
        // receipt와 TokenHistory를 동시에 담기 위한 배열
        TmpArray = [receipt, TokenHistory[i], i, TokenHistory[i].year, TokenHistory[i].month, usePeriod, totalPeriod];
        await settotalperiod(TmpArray[6]);
      } else {
        usePeriodYear = TokenHistory[i].year - TokenHistory[i - 1].year;
        usePeriodMonth = TokenHistory[i].month - TokenHistory[i - 1].month;
        usePeriod = usePeriodYear * 12 + usePeriodMonth;
        totalPeriod += (usePeriodYear * 12 + usePeriodMonth);
        TmpArray = [receipt, TokenHistory[i], i, TokenHistory[i].year, TokenHistory[i].month, usePeriod, totalPeriod];
        await settotalperiod(TmpArray[6]);
      }
      await RecArray.push(TmpArray);
    }
    await setreceipt(RecArray);
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  const now = new Date();
  const year = now.getFullYear();
  console.log(year);
  const month = now.getMonth() + 1;
  console.log(month);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {


    getDetail();
  }, [])

  return (
    <div>
      <NavBar />
      <div className="detailnft-title">
        <h1>{tokenInfo[0].product.productName}의 상세 정보</h1>
      </div>
      <div className="detailnft-main">
        <div className="detailnft-image">
          <img src={productImg} alt="productImage" style={{ width: "20rem", height: "18rem" }} />
        </div>
        <div>
          <MDBCard className="detailnft-card">
            <MDBCardBody>
              <MDBCardText>
                {/* <MDBCardTitle>블록길이 : {historylength}</MDBCardTitle>
                                <MDBCardTitle>토큰아이디 : {tokenId}</MDBCardTitle> */}
                <MDBCardTitle style={{ marginTop: 10 }}>브랜드명 : {tokenInfo[0].product.brandNm}</MDBCardTitle>
                <MDBCardTitle style={{ marginTop: 10 }}>상품명 : {tokenInfo[0].product.productName}</MDBCardTitle>
                <MDBCardTitle style={{ marginTop: 10 }}>상품번호 : {tokenInfo[0].product.productNo}</MDBCardTitle>
                <MDBCardTitle style={{ marginTop: 10 }}>시리얼번호 : {tokenInfo[0].serialNo}</MDBCardTitle>
                <MDBCardTitle style={{ marginTop: 10 }}>제조일자 : {tokenInfo[0].product.mfd}</MDBCardTitle>
                <MDBCardTitle style={{ marginTop: 10 }}>제조국 : {tokenInfo[0].product.madeIn}</MDBCardTitle>
              </MDBCardText>
              <Button className="detailnft-button" variant="outline-primary" onClick={openModal}>소유권 이전</Button>
              <Modal
                open={modalOpen}
                close={closeModal}
                tokenId={tokenId}
                header="NFT 전송하기"
                brandNm={tokenInfo[0].product.brandNm}
                productName={tokenInfo[0].product.productName}
                serialNo={tokenInfo[0].serialNo}
                mfd={tokenInfo[0].product.mfd}
                madeIn={tokenInfo[0].product.madeIn}
                year={year}
                month={month}
                ImgUrl={productImg}
                txnHash={txnHash}
              >
              </Modal>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
      <div className="table-title">
      <Button variant="outline-success" onClick={openModal2}>해쉬 주소 확인하기</Button>
      <Modal2
        open={modalOpen2}
        close={closeModal2}
        header="해쉬 주소"
        txnHash={txnHash}
      >
      </Modal2>
        {/* 해시 값: {txnHash} */}
      </div>

      <div className="table-title">
        <h3>NFT 사용 기록</h3>
      </div>
      <div className="detailnft-table">
        <div style={{ width: "55rem" }}>
          <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col' className="owner"><div>소유자</div></th>
                <th scope='col'>NFT 이전 날짜</th>
                <th scope='col'>사용 기간</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {receipt.map((res) => {
              console.log('res', res);
              return (
                <tr>
                  <th scope='row'>{res[2]+1}</th>
                  <td>{res[0].logs[0].topics[2].replace('000000000000000000000000', '')}</td>
                  <td>{res[1].year}년 {res[1].month}월</td>
                  <td>
                    {
                      res[2] === 0
                        ? <p>최초발행</p>
                        : <p>{res[5]}개월</p>
                    }
                  </td>
                </tr>
              )
            })}
            </MDBTableBody>
          </MDBTable>
          <div className="total-period">
            <p>제품 총 사용 기간 : {totalPeriod}개월</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default detailnft;