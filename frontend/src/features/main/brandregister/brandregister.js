import axios from "../../../common/api/http-common";
import React, { useEffect, useState } from "react";
import Navbar from "../../../common/navbar/NavBar"
import "./brandregister.css"
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

import Footer from "../../../common/footer/Footer"


function BrandRegister() {
  const history = useNavigate();

  // 이메일 유효성 검사
  const [emailMessage, setEmailMessage] = useState("")
  const [isEmail, setIsEmail] = useState(false)

  //유리
  const [comName, setComName] = useState("")
  const [comRegNum, setComRegNum] = useState("")
  const [comWallet, setComWallet] = useState(window.localStorage.getItem('wallet'))
  const [comEmail, setComEmail] = useState("")
  const [comTel, setComTel] = useState("")
  const [comAddress, setComAddress] = useState("")
  const [comLogo, setComLogo] = useState()

  useEffect(() => {
    axios.get(`company/${window.localStorage.wallet}`)
      .then(() => {
        alert('이미 가입되어있거나 승인 대기중인 계정입니다.')
        history('/')
      })
  })

  // 이메일 확인 정규식
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const checkEmail = (e) => {
    const emailCurrent = e.target.value;

    if (!emailRegEx.test(emailCurrent)) {
      setEmailMessage('올바른 이메일을 입력해주세요.')
      setIsEmail(false)
    } else {
      setEmailMessage('')
      setIsEmail(true)
    }
  }

  const handlerComName = (e) => {
    setComName(e.target.value)
  }

  const handlerComRegNum = (e) => {
    setComRegNum(e.target.value)
  }

  const handlerComEmail = (e) => {
    setComEmail(e.target.value)
  }

  const handlerComTel = (e) => {
    setComTel(e.target.value)
  }

  const handlerComAddress = (e) => {
    setComAddress(e.target.value)
  }

  const handlerComLogo = (e) => {
    setComLogo(e.target.files[0])
  }

  function onSubmit(e) {
    // e.preventDefault()
    const formData = new FormData()
    formData.append('comName', comName)
    formData.append('comRegNum', comRegNum)
    formData.append('comWallet', comWallet)
    formData.append('comEmail', comEmail)
    formData.append('comAddress', comAddress)
    formData.append('comTel', comTel)
    formData.append('comLogo', comLogo)

    axios.post("company/create/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert("브랜드 회원가입 신청 완료!")
        history('/')
      })
      .catch((err) => {
        console.log('err: ', err);
        if (!err.response) {
          alert('1번alert', err);
        } else {
          alert('2번alert', err.response.data)
        }
      })

  }

  return (
    <div>
      <Navbar />
      <div className="ui form display" style={{ marginTop: "100px" }}>
        <Form encType="multipart/form-data">
          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comName"
              placeholder="브랜드 명을 입력해주세요."
              id='form1'
              onChange={handlerComName} />
          </Form.Group>


          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comRegNum"
              placeholder="사업자 등록 번호를 입력해 주세요."
              id='form1'
              onChange={handlerComRegNum} />
          </Form.Group>

          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comWallet"
              disabled={true}
              id='form1'
              value={comWallet} />
          </Form.Group>

          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comEmail"
              placeholder="이메일을 입력해 주세요."
              id='form1'
              onChange={handlerComEmail}
              onBlur={checkEmail} />
          </Form.Group>
          <div>
            {comEmail.length > 0 && <div className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</div>}
          </div>

          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comAddress"
              placeholder="회사 주소를 입력해주세요."
              id='form1'
              onChange={handlerComAddress} />
          </Form.Group>

          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <MDBInput
              style={{ width: "560px" }}
              type="text"
              name="comTel"
              placeholder="회사 전화번호를 입력해주세요."
              id='form1'
              onChange={handlerComTel} />
          </Form.Group>

          <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
            <Form.Label
              style={{
                display: "flex",
                // border: "1px solid #ced4da",
                border: "1px solid #6d757e",
                backgroundColor: "#6d757e",
                borderRadius: "0.375rem",
                transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                color: "#fff",
                lineHeight: "1.5",
                fontSize: "1rem",
                fontWeight: "400",
                padding: "0.375rem 0.75rem",
                width: "560px",
                cursor: "pointer",
                paddingLeft: "240px"
              }}
              id='logo-label'
              for='logo'>
              로고 업로드
            </Form.Label>
          </Form.Group>
          <MDBInput
            style={{ width: "560px", display: "none" }}
            type="file"
            name="comLogo"
            placeholder="로고를 첨부해주세요."
            id='logo'
            onChange={handlerComLogo} />
          {/* {comLogo.name} */}
          <div>
            {comLogo && <div className="com-logo-name">{comLogo.name}</div>}
          </div>
          <MDBBtn style={{ marginRight: 50 }} outline className='mx-2' color='dark' onClick={() => {
            history('/')
          }}>뒤로가기</MDBBtn>
          {
            !!comName && !!comRegNum && !!comWallet && !!comEmail && !!comAddress && !!comTel && emailRegEx.test(comEmail)
              ? <Button style={{ marginLeft: 50 }} variant="outline-primary" onClick={() => onSubmit()}>제출하기</Button>
              : <Button style={{ marginLeft: 50 }} variant="outline-primary" onClick={() => onSubmit()} disabled>제출하기</Button>
          }
        </Form>
      </div>
      <br /><br />
      <Footer></Footer>
    </div >
  )
}

export default BrandRegister;