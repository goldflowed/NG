import axios from "../../../common/api/http-common";
import React, { useEffect, useState } from "react";
import Navbar from "../../../common/navbar/NavBar"
import "./brandregister.css"
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";


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
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if (!err.response) {
                    alert(err);
                } else {
                    alert(err.response.date)
                }
            })
        alert("브랜드 회원가입 신청 완료!")
        history('/')
    }

    return (
        <div>
            <Navbar />
            <div className="brandregister text-center">
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <h1>기업 회원 가입</h1>
                <br />
                <p>저희 서비스를 이용하기 위해서는, 먼저 서비스 가입을 요청해야 합니다. 아래의 정보를 입력해서 제출해주세요.</p>
                <div>
                    <div className="ui form display">
                        <Form encType="multipart/form-data">
                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comName"
                                    label="브랜드 명을 입력해주세요."
                                    id='form1'
                                    onChange={handlerComName} />
                            </Form.Group>


                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comRegNum"
                                    label="사업자 등록 번호를 입력해 주세요."
                                    id='form1'
                                    onChange={handlerComRegNum} />
                            </Form.Group>

                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comWallet"
                                    disabled={true}
                                    label="지갑 주소를 입력해주세요."
                                    id='form1'
                                    value={comWallet} />
                            </Form.Group>

                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comEmail"
                                    label="이메일을 입력해 주세요."
                                    id='form1'
                                    onChange={handlerComEmail}
                                    onBlur={checkEmail} />
                            </Form.Group>

                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comAddress"
                                    label="회사 주소를 입력해주세요."
                                    id='form1'
                                    onChange={handlerComAddress} />
                            </Form.Group>

                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="text"
                                    name="comTel"
                                    label="회사 전화번호를 입력해주세요."
                                    id='form1'
                                    onChange={handlerComTel} />
                            </Form.Group>

                            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
                                <MDBInput
                                    style={{ width: "500px" }}
                                    type="file"
                                    name="comLogo"
                                    label="로고를 첨부해주세요."
                                    id='form1'
                                    onChange={handlerComLogo} />
                            </Form.Group>

                            <MDBBtn style={{ marginRight: 50 }} outline className='mx-2' color='dark' onClick={() => {
                                history('/')
                            }}>뒤로가기</MDBBtn>
                            {
                                !!comName && !!comRegNum && !!comWallet && !!comEmail && !!comAddress && !!comTel && emailRegEx.test(comEmail)
                                    ? <MDBBtn style={{ marginLeft: 50 }} outline color='success' type="submit" onClick={() => onSubmit()}>제출하기</MDBBtn>
                                    : <MDBBtn style={{ marginLeft: 50 }} outline color='success' disabled onClick={() => onSubmit()}>제출하기</MDBBtn>
                            }
                        </Form>
                    </div>
                </div>
            </div>
            <br /><br />
        </div >
    )
}

export default BrandRegister;