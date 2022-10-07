import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import axios from "../../../common/api/http-common";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Footer from "../../../common/footer/Footer";

import './page.css';

import ipfs_apis from "../../../common/api/ipfs";

const ContainerDiv = styled.div`

  `

const MainDiv = styled.div`
  height: 800px;
  width: 1900px;
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  /* margin-left:25rem; */
  margin-top:25px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;

  `

const InfoDiv = styled.div`
  // width: 98%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  /* margin-left: 5%; */
  `

// const Button = styled.div`
//   width:50px;
//   height: 30px;
//   border: 2px solid;
//   float: right;
//   align-items: center;
//   text-align: center;
//   margin-right: 10px;
//   `

const Logo = styled.div`
  width:300px;
  height: 300px;
  border-radius: 10px;
  float: right;
  margin-top: 50px;
  display:flex;
  justify-content: center;
  `

const TitleP = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'MaruBuri-Regular';
  margin-top: 4rem;
  margin-left: 23rem;
  `

function Home() {
  const [name, setName] = useState('')
  const [regNum, setRegNum] = useState('')
  const [tel, setTel] = useState('')
  const [wallet, setWallet] = useState('')
  const [address, setAddress] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    axios.get(`company/${window.localStorage.wallet}`)
      .then((res) => {
        setName(res.data.comName)
        setRegNum(res.data.comRegNum)
        setTel(res.data.comTel)
        setWallet(res.data.comWallet)
        setAddress(res.data.comAddress)
        setLogoUrl(ipfs_apis.https_public.concat(res.data.comLogo))
      })
  }, [])

  return (
    <ContainerDiv>
      <NavBar />
      {/* <SideBar /> */}
      <MainDiv>
        <SideBar />
        <div>
          <TitleP>나의 기업 정보</TitleP>
          <InfoDiv>
            <Card style={{ width: '48rem', marginTop: '3rem', marginLeft: '1.5rem', marginRight: 10 }}>
              <Card.Body className="company-base">
                <Card.Title style={{ marginTop: 20 }}>브랜드명 : {name}</Card.Title>
                <Card.Title style={{ marginTop: 20 }}>사업자 등록번호 : {regNum}</Card.Title>
                <Card.Title style={{ marginTop: 20 }}>브랜드 전화번호 : {tel}</Card.Title>
                <Card.Title style={{ marginTop: 20 }}>기업 주소 : {address}</Card.Title>
                <Card.Title style={{ marginTop: 20 }}>브랜드 지갑 주소 : {wallet}</Card.Title>
              </Card.Body>
            </Card>
            <img src={logoUrl} style={{ marginTop: '3rem', marginLeft: 10, width: "16rem", height: "16rem" }}></img>
          </InfoDiv>
        </div>
        {/* <TitleP>나의 기업 정보</TitleP> */}
        {/* <div className="company-main">
          <Card style={{ width: '48rem', marginTop: '3rem', marginLeft: '1.5rem', marginRight: 10 }}>
            <Card.Body className="company-base">
              <Card.Title style={{ marginTop: 20 }}>브랜드명 : {name}</Card.Title>
              <Card.Title style={{ marginTop: 20 }}>사업자 등록번호 : {regNum}</Card.Title>
              <Card.Title style={{ marginTop: 20 }}>브랜드 전화번호 : {tel}</Card.Title>
              <Card.Title style={{ marginTop: 20 }}>기업 주소 : {address}</Card.Title>
              <Card.Title style={{ marginTop: 20 }}>브랜드 지갑 주소 : {wallet}</Card.Title>
            </Card.Body>
          </Card>
          <img src={logoUrl} style={{ marginTop: '3rem', marginLeft: 10, width: "16rem", height: "16rem" }}></img>
        </div> */}

        {/* <InfoDiv>
          <div className="info" style={{display:"flex", flexDirection:"column", marginTop:50}}>
            <p>브랜드명: {name}</p>
            <p>사업자 등록번호: {regNum}</p>
            <p>브랜드 전화번호: {tel}</p>
            <p>기업 주소: {address}</p>
            <p>브랜드 지갑 주소: {wallet}</p>
          </div>
          <div className="logo">
            <Logo>
              <img src={logoUrl} style={{width:"100%"}}></img>
            </Logo>
          </div>
        </InfoDiv> */}
        {/* <Button>수정</Button> */}
      </MainDiv>
      <Footer />
    </ContainerDiv>
  )
}
export default Home;