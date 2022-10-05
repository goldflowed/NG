import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from "react"
import {
    MDBInputGroup,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardHeader
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { nftContract, web3 } from "../../../common/web3/web3Config";
import "./searchnft.css";

function SearchNft() {

    const [txnHash, settxnHash] = useState("");
    const [tokenId, settokenId] = useState("");

    const [brandNm, setbrandNm] = useState("");
    const [productNo, setproductNo] = useState("");
    const [serialNo, setserialNo] = useState("");
    const [mfd, setmfd] = useState("");
    const [madeIn, setmadeIn] = useState("");
    const [brandAdd, setbrandAdd] = useState("");
    const [ownAdd, setownAdd] = useState("");

    // 소유자 및 발행자 주소 찾기
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tokenHistory, setTokenHistory] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [historylength, sethistorylength] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrreceipt, setreceipt] = useState([])

    const onTxnHandler = (event) => {
        settxnHash(event.currentTarget.value);
    }

    const onSearch = async (e) => {
        console.log('검색버튼 클릭 후', txnHash);
        // const tokenId = 
        await nftContract.methods
            .getTokenIdFromTxnHash(txnHash).call()
        .then((res) => console.log('토큰아이디 : ', res))

        await settokenId(tokenId);
        // console.log('tokenId', tokenId)

        const nftinfo = await nftContract.methods.ngs(tokenId).call()

        console.log(nftinfo)
        console.log('nftinfo타입', typeof (nftinfo))

        // 소유자 및 발행자 주소 찾기
        const TokenHistory = await nftContract.methods.getTokenHistory(tokenId).call();
        await setTokenHistory(TokenHistory);
        await sethistorylength(TokenHistory.length);
        console.log('TokenHistory길이', TokenHistory.length);

        var receiptArr = [];
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
            console.log(block);

            // transaction hash
            const transactions = await block.transactions[0];
            console.log('transactions', transactions)

            const receipt = await web3.eth.getTransactionReceipt(transactions);
            console.log('receipt', receipt);

            console.log('receipt.logs[0].topics[2]', receipt.logs[0].topics[2]);
            receiptArr.push(receipt.logs[0].topics[2].replace('000000000000000000000000', ''));

            // if(i === 0){
            // console.log('최초발행자 주소', receipt.logs[0].topics[2]);
            // }else if( i === 1){
            // console.log('소유자 주소', receipt.logs[0].topics[2]);
            // }
        }
        console.log('receiptArr 길이', receiptArr.length);
        // console.log('receiptArr[0]', receiptArr[0]);
        await setreceipt(receiptArr);

        /////////////////// 토큰 정보들 저장 /////////////////////
        await setbrandNm(nftinfo.product.brandNm);
        await setproductNo(nftinfo.product.productNo);
        await setserialNo(nftinfo.serialNo);
        await setmfd(nftinfo.product.mfd);
        await setmadeIn(nftinfo.product.madeIn);

        // console.log('Arrreceipt[0]', Arrreceipt[0]);
        // console.log('Arrreceipt[historylength-1]', Arrreceipt[historylength-1]);
        // 0번째 index의 receipt로 발행자 주소 찾기
        // await setbrandAdd(Arrreceipt[0].logs[0].topics[2]);

        // 마지막 index로 현재 소유자 주소 찾기
        await setownAdd(Arrreceipt[historylength - 1]);
    }

    return (
        <div className="input-add">
            <NavBar />
            <div className="main-height">
                <br /><br /><br /><br />
                <div className="searchnft-title">
                    <h1 style={{ marginTop: 50 }}>NFT를 검색해 보세요</h1>
                    {/* {Arrreceipt[historylength-1].logs[0].topics[2]} */}
                </div>
                <div className="input-group">
                    <MDBInputGroup className='mb-6' style={{ marginTop: 40 }}>
                        <input className='form-control' placeholder="해쉬 주소를 입력하세요." type='text' onChange={onTxnHandler} />
                        <Button variant="outline-primary" onClick={onSearch}>Search</Button>
                    </MDBInputGroup>
                </div>
                <div>
                    <div>
                        {
                        {tokenId} === 0
                            ? <div>null</div>
                            : <div>
                                <MDBCard background='white' className='mb-3' style={{ marginTop: 40 }}>
                                    <MDBCardHeader><div className="search-header">NFT 정보</div></MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBCardTitle className="search-card">토큰아이디 : {tokenId}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">브랜드 명 : {brandNm}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">제품 번호 : {productNo}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">시리얼 번호 : {serialNo}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">제조 날짜 : {mfd}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">제조국 : {madeIn}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">발행자 주소 : {Arrreceipt[0]}</MDBCardTitle>
                                        <MDBCardTitle className="search-card">소유자 주소 : {Arrreceipt[historylength - 1]}</MDBCardTitle>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer style={{width:"100%"}}></Footer>    
        </div>        
    )

}

export default SearchNft;