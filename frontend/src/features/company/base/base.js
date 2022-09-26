import React from "react";
import SideBar from "../sidebar/SideBar";
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
  padding-left: 100px;
  padding-right: 100px;
  font-size:20px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
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
      <SideBarDiv>
        <SideBar/>
      </SideBarDiv>
      <MainDiv>
        <TitleP>NFT 인증서 발급</TitleP><Hr/>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Home;