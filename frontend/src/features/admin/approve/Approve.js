import React, { useState, useEffect, useMemo } from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import axios from '../../../common/api/http-common';
import Table from './table';

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

const TitleP = styled.p`
  width:1350px;
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  margin-left: 20px;
  `

 const TableDiv = styled.div`
  margin:auto;
  width:1000px;
  max-height: 750px;
  overflow-y: auto;
  display:flex;
  flex-direction:column;
  `
function Home() {
  const columns = useMemo(
    () => [
      {
        accessor: "num",
        Header: "번호",
      },
      {
        accessor: "comName",
        Header: "기업이름",
      },
      {
        accessor: "comWallet",
        Header: "지갑주소",
      },
    ],
    []
  );

  const [companies, setCompanies] = useState([])
  
  useEffect(() => {
    var i = 1;
    axios.post(`/company/list/2`).then((response) => {
      for ( const res of response.data ) {
        res['num'] = i;
        i = i+1;
      }
      setCompanies(response.data)
    })
  }, []);


  return (
    <ContainerDiv>
      <NavBar/>
      <SideBar/>
      <MainDiv>
      <TitleP>승인 기업 목록</TitleP><Hr/>
        <InfoDiv>
        <TableDiv><Table columns={columns} data={companies}/></TableDiv>
        </InfoDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Home;