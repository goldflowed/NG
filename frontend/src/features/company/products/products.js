import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Table from './table';
import NavBar from "../../../common/navbar/NavBar";
import Footer from "../../../common/footer/Footer";
import { nftContract } from "../../../common/web3/web3Config";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1900px;
  `

const MainDiv = styled.div`
  /* background-color: red; */
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  /* margin-left:26rem; */
  margin-top:25px;
  `

const TableDiv = styled.div`
  margin:auto;
  width:900px;
  max-height: 750px;
  overflow-y: auto;
  display:flex;
  flex-direction:column;
  margin-bottom: 30rem;
  `
  
const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const TitleP = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'MaruBuri-Regular';
  margin-top: 4rem;
  display: flex;
  justify-content: center;
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
      {/* <SideBar/> */}
      <MainDiv>
        <SideBar/>
        <div>
          <TitleP>NG에 등록된 제품입니다.</TitleP>
          <TableDiv>
            <Table columns={columns} data={products}/>
          </TableDiv>
        </div>
        {/* <TitleP>NG에 등록된 제품입니다.</TitleP>
        <TableDiv>
          <Table columns={columns} data={products}/>
        </TableDiv> */}
      </MainDiv>
      <Footer/>
    </ContainerDiv>
  )
}
export default Products;