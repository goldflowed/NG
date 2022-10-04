import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import { useParams } from "react-router-dom";
import axios from "../../../common/api/http-common";
import { nftContract } from "../../../common/web3/web3Config";
import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';

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

const ProductDiv = styled.div`
  width:100%;
  `

const InfoDiv = styled.div`
  display:flex;
  flex-direction:row;
  `

const InfoPDiv = styled.div`
  margin-left:10px;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  `
const TableDiv = styled.div`
  margin:auto;
  width:800px;
  max-height: 400px;
  overflow-y: auto;
  display:flex;
  flex-direction:column;
  `

function Detail() {
  const [nfts, setNfts] = useState([])
  const [productImg, setProductImg] = useState('')
  const [productName, setProductName] = useState('')
  const [productMadeIn, setProductMadeIn] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productMfd, setProductMfd] = useState('')
  const params = useParams();
  const { state } = useLocation();

  var idx = 0
  const idxUp = () => {
    idx = idx + 1
    return idx
  }

  const columns = useMemo(
    () => [
      {
        accessor: "num",
        Header: "No",
      },
      {
        accessor: "productNum",
        Header: "제 품 번 호",
      },
      {
        accessor: "isTransact",
        Header: "전송 여부",
      },
    ],
    []
  );
  
  const data = useMemo(
    () => 
      Array(30)
        .fill()
        .map(() => ({
          num: idxUp(),
          productNum: productCode + idx,
          isTransact: 'N',
        })),
    []
  );
  
  async function getTokenInfo() {
    var idx = 1
    const productArray = []
    let response = await nftContract.methods.getProductnoToNgs(window.localStorage.wallet, state.productNo).call()
    console.log(response)
    // for (let res of response) {
    //   let product = {
    //     "num" : idx,
    //     "productNo" : res.productNo,
    //     "productName" : res.productName,
    //     "madeIn" : res.madeIn,
    //     "mfd" : res.mfd,
    //   }
    //   productArray.push(product)
    //   idx = idx+1
    // }
    // setNfts(productArray)
  }

  useEffect(() => {
    console.log(params.productCode)
    axios.get(`product/${params.productCode}`)
    .then((res) => {
      setProductImg(res.data.proUrl)
    })
    console.log(state)
    setProductName(state.productName)
    setProductMadeIn(state.madeIn)
    setProductCode(state.productNo)
    setProductMfd(state.mfd)
  }, []);

  return (
    <ContainerDiv>
      <NavBar/>
      <SideBar/>
      <MainDiv>
        <TitleP>등록 제품 정보 {'>'} 제품 상세 페이지</TitleP><Hr/>
        <ProductDiv>
          <InfoDiv>
            <img src={productImg} alt="productImage" style={{width:"33%"}}/>
            <InfoPDiv>
              <p>제 품 명 : {productName}</p>
              <p>제 품 코 드 : {productCode}</p>
              <p>출 고 일 : {productMfd}</p>
              <p>제 조 국 : {productMadeIn}</p>
            </InfoPDiv>
          </InfoDiv>
        </ProductDiv><Hr/>
        <div>
          <div className="nfttable-title">
            <h2>제품 NFT 등록하기</h2>
          </div>  
          <div className="nft-register">

          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Detail;