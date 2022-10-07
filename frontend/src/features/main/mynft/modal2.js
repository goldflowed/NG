import React from 'react';
import './modal2.css';
import { useState } from "react"
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

  const handleCopyClipBoard = async (text) => {
    try{
      await navigator.clipboard.writeText(text);
      alert('해쉬주소가 복사되었습니다') 
    } catch(err){
      alert('복사 실패!')
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
            {props.txnHash}
            <div class="MoButton">
              <Button variant="outline-primary" onClick={() => handleCopyClipBoard(props.txnHash)}>주소 복사</Button>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
}
export default modal;
