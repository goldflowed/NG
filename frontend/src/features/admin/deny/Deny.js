import React, {useEffect} from "react";
import {useNavigate}from 'react-router-dom'
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";

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

const TitleP = styled.p`
  width:1350px;
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  margin-left: 20px;
  `

function Deny() {
  const history = useNavigate();
  useEffect(() => {
      if (false) {
        history('/admin/approve')
      }
    }, []);

  return (
    <ContainerDiv>
      <SideBar/>
      <MainDiv>
      <TitleP>거부 기업 목록</TitleP><Hr/>
        <InfoDiv>
        </InfoDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Deny;