import React from 'react';
import './modal.css';
import { useState } from "react"
import { MDBInput } from 'mdb-react-ui-kit';
import { nftContract } from "../../../common/web3/web3Config"


const modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sendAddress, setsendAddress] = useState("");
    const onAddHandler = (event) => {
        setsendAddress(event.currentTarget.value);
    }
    const transfer = async(from, to, tokenId, year, month) => {
        from = await window.localStorage.getItem('wallet');
        to = sendAddress; 
        console.log('from', from);
        console.log('to', to);
        tokenId = props.tokenId;
        console.log('tokenId', tokenId);
        year = props.year;
        month = props.month;

        console.log("현재 년도, 월", year+" "+month);


        await nftContract.methods.transferNG(from, to, tokenId, year, month).call();
        console.log('NFT 전송 완료')
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
                브랜드명 : {props.brandNm} <br/>
                상품명 : {props.productName} <br/>
                시리얼번호 : {props.serialNo} <br/>
                제조일 및 생산 국가 : {props.mfd} {props.madeIn}
                <br/><br/>
                <MDBInput label='받는 분의 주소를 정확히 입력해 주세요.'
                          id='form1'
                          type='text'
                          value = {sendAddress}
                          onChange={onAddHandler} />

                </main>
            <footer>
              <button className="transfer" onClick={transfer}>
                전송
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
  export default modal;
