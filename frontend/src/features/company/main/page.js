import React from "react";
import SideBar from "../../../common/companysidebar/SideBar";
import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  `

const SideBarDiv = styled.div`
  background-color: #3E3E3E;
  width: 300px;
  height: 969px;
  margin: 0px;
  display:flex;
  justify-content: center;
  flex-direction: column;
  `

const MainDiv = styled.div`
  /* background-color: red; */
  width: 1600px;
  padding-top:50px;
  padding-left: 10px;
  padding-right: 10px;
  font-size:20px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const InfoDiv = styled.div`
  width: 1580px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
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
function Home() {
  return (
    <ContainerDiv>
      <SideBarDiv>
        <SideBar/>
      </SideBarDiv>
      <MainDiv>
        <p>기업 정보</p><Hr/>
        <InfoDiv>
          <div className="info">
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