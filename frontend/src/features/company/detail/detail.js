import React, {useState, useEffect, useMemo} from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Sample from "../../../assets/img/sample.png"
import Table from './table';

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
  const productCode = "SADSDADSDA"

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
  
  useEffect(() => {
    setNfts(data)
  }, []);

  return (
    <ContainerDiv>
      <SideBar/>
      <MainDiv>
        <TitleP>등록 제품 정보 {'>'} 제품 상세 페이지</TitleP><Hr/>
        <ProductDiv>
          <InfoDiv>
            <img src={Sample} alt="productImage" style={{width:"33%"}}/>
            <InfoPDiv>
              <p>제 품 명 : 비싼가방</p>
              <p>제 품 코 드 : {productCode}</p>
              <p>가 격 : 1125$</p>
              <p>제 조 국 : 어디로하지</p>
            </InfoPDiv>
          </InfoDiv>
        </ProductDiv><Hr/>
        <TableDiv>
          <Table columns={columns} data={nfts}/>
        </TableDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Detail;