import React from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  `

const MainDiv = styled.div`
  /* background-color: red; */
  width: 1550px;
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  margin-left:400px;
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
function Nft() {
  return (
    <ContainerDiv>
      <SideBar/>
      <MainDiv>
        <TitleP>어쨋든Nft보여주는페이지</TitleP><Hr/>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Nft;