import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Table from './table';
import NavBar from "../../../common/navbar/NavBar";
import { nftContract } from "../../../common/web3/web3Config";

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

function Products() {
  const columns = useMemo(
    () => [
      {
        accessor: "num",
        Header: "No",
      },
      {
        accessor: "productNo",
        Header: "제품코드",
      },
      {
        accessor: "productName",
        Header: "제품명",
      },
      {
        accessor: "madeIn",
        Header:"제조국",
      }
    ],
    []
  );

  const [products, setProducts] = useState([])

  async function getTokenInfo() {
    var idx = 1
    const productArray = []
    let response = await nftContract.methods.getAddressToCategorys(window.localStorage.wallet).call()
    for (let res of response) {
      let product = {
        "num" : idx,
        "productNo" : res.productNo,
        "productName" : res.productName,
        "madeIn" : res.madeIn,
        "mfd" : res.mfd,
      }
      productArray.push(product)
      idx = idx+1
    }
    setProducts(productArray)
  }

  useEffect(() => {
    getTokenInfo()
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
export default Products;