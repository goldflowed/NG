import React from 'react'
import NavBar from '../../../common/navbar/NavBar'
import Footer from '../../../common/footer/Footer'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { nftContract, web3 } from "../../../common/web3/web3Config"
import Modal from './modal.js'
 
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';
  import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function detailnft() {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();    
    const tokenInfo = location.state.token;
    console.log('토큰 정보', tokenInfo);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tokenId, settokenId] = useState(tokenInfo[1]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [historylength, sethistorylength] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [receipt, setreceipt] = useState([])
    // modal 관련 함수
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(false);

    async function getDetail() {
        const TokenHistory = await nftContract.methods.getTokenHistory(tokenId).call();
        console.log('TokenHistory',TokenHistory);
        console.log('TokenHistory[0]',TokenHistory[0]);
        console.log('TokenHistory[0]타입', typeof(TokenHistory[0]))
        console.log('TokenHistory타입', typeof(TokenHistory))
        console.log('TokenHistory 길이', TokenHistory.length)
        await sethistorylength(TokenHistory.length);

        // receipt를 삽입하는데 사용되는 배열
        const RecArray = [];
        for(let i = 0; i < TokenHistory.length; i++){
            // tokenHistory[i] -> string to number
            const DectokenHistory = await Number(TokenHistory[i]);

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

            const receipt = await web3.eth.getTransactionReceipt(transactions);
            console.log('receipt', receipt);
            await RecArray.push(receipt);
        }
        await setreceipt(RecArray);
    }

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const now = new Date();
    const year = now.getFullYear();
    console.log(year);
    const month = now.getMonth();
    console.log(month);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getDetail();
    }, [])

    return(
        <div>
            <NavBar/>
            <div style={{height:500,}}>
                <MDBCard style={{marginTop:100}}>
                    <MDBCardBody>
                        <MDBCardTitle>NFT 상세 정보</MDBCardTitle>
                        <MDBCardText>
                            블록길이 : {historylength} <br/>
                            토큰아이디 : {tokenId} <br/>
                            브랜드명 : {tokenInfo[0].product.brandNm} <br/>
                            상품명 : {tokenInfo[0].product.productName} <br/> 
                            상품번호 : {tokenInfo[0].product.productNo} <br/>
                            시리얼번호 : {tokenInfo[0].serialNo} <br/>
                            제조일자 : {tokenInfo[0].product.mfd} <br/>
                            제조국 : {tokenInfo[0].product.madeIn} <br/>
                        </MDBCardText>
                        <MDBBtn onClick={openModal}>소유권 이전</MDBBtn>
                            <Modal 
                                open={modalOpen}
                                close={closeModal}
                                tokenId = {tokenId}
                                header="NFT 전송하기"
                                brandNm = {tokenInfo[0].product.brandNm}
                                productName = {tokenInfo[0].product.productName}
                                serialNo = {tokenInfo[0].serialNo}
                                mfd = {tokenInfo[0].product.mfd}
                                madeIn = {tokenInfo[0].product.madeIn}
                                year = {year}
                                month = {month}
                                >
                            </Modal>
                    </MDBCardBody>
                </MDBCard>

                <MDBTable striped>
                    <MDBTableHead>
                        <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>소유자</th>
                        <th scope='col'>NFT 이전 날짜</th>
                        <th scope='col'>사용 기간</th>
                        </tr>
                    </MDBTableHead>
                    {receipt.map((res) => {
                        return(
                            <MDBTableBody>
                            <tr>
                            <th scope='row'>1</th>
                            <td>{res.logs[0].topics[2]}</td>
                            <td>날짜 들어갈 공간</td>
                            <td>사용 기간 들어갈 공간</td>
                            </tr>
                    </MDBTableBody>     
                        )
                    })}
                </MDBTable>
            </div>
            <Footer/>
        </div>
    )
}

export default detailnft;