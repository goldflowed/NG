import React from 'react';
import './modal.css';
import { useState } from "react"
import { MDBInput } from 'mdb-react-ui-kit';
import { nftContract, web3 } from "../../../common/web3/web3Config"
import { renderMatches } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button';


const modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sendAddress, setsendAddress] = useState("");
  const onAddHandler = (event) => {
    setsendAddress(event.currentTarget.value);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tokenHistory, setTokenHistory] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const transfer = async (from, to, tokenId, year, month) => {
    from = await window.localStorage.getItem('wallet');
    to = sendAddress;
    tokenId = props.tokenId;
    year = props.year;
    month = props.month;

    try {
      await nftContract.methods.transferNG(from, to, tokenId, year, month)
        .send({ from: from });

      const TokenHistory = await nftContract.methods.getTokenHistory(tokenId).call();
      await setTokenHistory(TokenHistory);

      const TokenHisLength = TokenHistory.length - 1;
      const DectokenHistory = await Number(TokenHistory[TokenHisLength].blockNumber);

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
      await nftContract.methods.setTxnHashToTokenId(transactions, tokenId).send({ from: from })

      alert('전송이 완료되었습니다.');
      navigate('/mynft');
    } catch (err) {
      alert('올바른 주소를 입력해 주세요.');
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="modal-overall">
              <div className="modal-image">
                <img src={props.ImgUrl} alt="productImage" style={{ width: "13rem", height: "13rem" }} />
              </div>
              <div>
                <p>브랜드명 : {props.brandNm}</p>
                <p>상품명 : {props.productName}</p>
                <p>시리얼번호 : {props.serialNo}</p>
                <p>제조 일자 : {props.mfd}</p>
                <p>생산 국가 : {props.madeIn}</p>
              </div>
            </div>
            <br />
            <MDBInput style={{ width: '100%' }}
              // label='받는 분의 주소를 정확히 입력해 주세요.'
              id='form1'
              type='text'
              value={sendAddress}
              onChange={onAddHandler} />
            <div style={{ marginLeft: 120, marginTop: 5, color: 'red' }}>받는 분의 주소를 정확히 입력해주세요.</div>

          </main>
          <footer>
            <Button variant="outline-primary" onClick={transfer}>전송</Button>{' '}
            {/* <button className="transfer" onClick={transfer}> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
}
export default modal;
