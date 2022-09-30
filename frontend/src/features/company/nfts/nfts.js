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

function Nfts() {
  var idx = 0
  const idxUp = () => {
    idx = idx + 1
    return idx
  }

  // const getRandom = (min, max) => Math.floor(Math.random() * (max-min) + min);

  const columns = useMemo(
    () => [
      {
        accessor: "num",
        Header: "No",
      },
      {
        accessor: "productNo",
        Header: "상품명",
      },
      {
        accessor: "serialNo",
        Header: "상품코드",
      },
      {
        accessor: "madeIn",
        Header:"제조국",
      }
    ],
    []
  );
  
  // const data = useMemo(
  //   () => 
  //     Array(30)
  //       .fill()
  //       .map(() => ({
  //         num: idxUp(),
  //         name: "이름" + idx,
  //         code : "상품코드" + idx,
  //         price : getRandom(10,99) * 1000,
  //       })),
  //   []
  // );

  const [products, setProducts] = useState([])

  async function getTokenInfo() {
    var idx = 1
    const productArray = []
    let response = await nftContract.methods.getOwnedTokens(window.localStorage.wallet).call()
    for (let res of response) {
      let data = await nftContract.methods.ngs(res).call()
      let product = {
        "num" : idx,
        "productNo" : data.productNo,
        "serialNo" : data.serialNo,
        "madeIn" : data.madeIn,
        "mfd" : data.mfd,
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
export default Nfts;