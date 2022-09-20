import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Table from './table';
import NavBar from "../../../common/navbar/NavBar"

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
  margin-top:25px;
  `

const TableDiv = styled.div`
  margin:auto;
  width:800px;
  max-height: 750px;
  overflow-y: auto;
  display:flex;
  flex-direction:column;
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

function Nfts() {
  var idx = 0
  const idxUp = () => {
    idx = idx + 1
    return idx
  }

  const getRandom = (min, max) => Math.floor(Math.random() * (max-min) + min);

  const columns = useMemo(
    () => [
      {
        accessor: "num",
        Header: "No",
      },
      {
        accessor: "name",
        Header: "상품명",
      },
      {
        accessor: "code",
        Header: "상품코드",
      },
      {
        accessor: "price",
        Header:"가격",
      }
    ],
    []
  );
  
  const data = useMemo(
    () => 
      Array(30)
        .fill()
        .map(() => ({
          num: idxUp(),
          name: "이름" + idx,
          code : "상품코드" + idx,
          price : getRandom(10,99) * 1000,
        })),
    []
  );

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(data)
  }, []);

  return (
    <ContainerDiv>
      <NavBar/>
      <SideBar/>
      <MainDiv>
        <TitleP>등록 제품 조회</TitleP><Hr/>
        <TableDiv>
          <Table columns={columns} data={products}/>
        </TableDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Nfts;