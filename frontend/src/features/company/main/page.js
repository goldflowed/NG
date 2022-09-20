import React from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Navbar from "../../../common/navbar/NavBar"

const ContainerDiv = styled.div`
  width:1900px;
  display: flex;
  flex-direction: row;
  `

const MainDiv = styled.div`
  width: 1450px;
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  margin-left:400px;
  margin-top:25px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const InfoDiv = styled.div`
  width: 98%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin-left:30px;
  `

const Button = styled.div`
  width:50px;
  height: 30px;
  border: 2px solid;
  float: right;
  align-items: center;
  text-align: center;
  margin-right: 10px;
  `

const Logo = styled.div`
  width:300px;
  height: 300px;
  border-radius: 10px;
  background-color: gray;
  float: right;
  `

const TitleP = styled.p`
  width:1350px;
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  margin-left: 20px;
  `

function Home() {
  return (
    <ContainerDiv>
      <Navbar/>
      <SideBar/>
      <MainDiv>
        <TitleP>기업 정보 조회</TitleP><Hr/>
        <InfoDiv>
          <div className="info" style={{display:"flex", flexDirection:"column"}}>
            <p>브랜드명: </p>
            <p>사업자 등록번호: </p>
            <p>브랜드 지갑 주소: </p>
            <p>브랜드 전화번호: </p>
            <p>기업 주소: </p>
          </div>
          <div className="logo">
            <Logo/>
          </div>
        </InfoDiv><Hr/>
        <Button>수정</Button>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Home;