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

function Home() {
  return (
    <ContainerDiv>
      <SideBarDiv>
        <SideBar/>
      </SideBarDiv>
      <MainDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Home;