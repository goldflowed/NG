import React, { useState, useEffect } from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ssafy from '../../../assets/img/ssafy.png';
import NavBar from "../../../common/navbar/NavBar";
import { nftContract } from "../../../common/web3/web3Config"
import axios from '../../../common/api/http-common'
import { Ipfs } from "../../../common/api/ipfs";

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

const InfoDiv = styled.div`
  margin:50px;
  `

const Logo = styled.img`
  width:500px;
  border-radius: 10px;
  justify-content: center;
  `

function Register() {
  const [productNumber, setPN] = useState("");
  const [productName, setProductName] = useState("");
  const [makingDate, setMD] = useState("");
  const [country, setC] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [logoUrl, setLogoUrl] = useState('')
  const onPNHandler = (event) => {
    setPN(event.currentTarget.value);
  }

  const onProductNameHandler = (event) => {
    setProductName(event.currentTarget.value);
  }

  const onMDHandler = (event) => {
    setMD(event.currentTarget.value);
  }

  const onCHandler = (event) => {
    setC(event.currentTarget.value);
  }

  const onimgFileHandler = (event) => {
    setImgFile(event.target.files[0]);
  }



  const regist = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('file', imgFile)
    formData.append('proNo', productNumber)

    await nftContract.methods
      .addProduct(brand, productName, productNumber, makingDate, country)
      .send({ from: window.localStorage.wallet })
      .then((res) => {
        axios.post(`product/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((res) => console.log(res))
        console.log(res)
        alert('성공하였습니다.')
      });
  }

  useEffect(() => {
    axios.get(`company/${window.localStorage.wallet}`)
      .then((res) => {
        setBrand(res.data.comName)
        setLogoUrl(res.data.comLogo)
      })
  }, [])

  return (
    <ContainerDiv>
      <NavBar />
      <SideBar />
      <MainDiv>
        <TitleP>제품 등록</TitleP><Hr />
        <InfoDiv>
          <Form encType="multipart/form-data">
            <Logo style={{ display: "block", margin: "auto" }} src={logoUrl} />

            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
              <Form.Label style={{ marginRight: "10px" }}>제품 이름: </Form.Label>
              <Form.Control style={{ width: "500px" }} type="text" value={productName} onChange={onProductNameHandler} />
            </Form.Group>

            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
              <Form.Label style={{ marginRight: "10px" }}>제품 번호: </Form.Label>
              <Form.Control style={{ width: "500px" }} type="text" value={productNumber} onChange={onPNHandler} />
            </Form.Group>

            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
              <Form.Label style={{ marginRight: "35px" }}>출고일: </Form.Label>
              <Form.Control style={{ width: "500px" }} type="text" value={makingDate} onChange={onMDHandler} />
            </Form.Group>

            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
              <Form.Label style={{ marginRight: "35px" }}>제조국: </Form.Label>
              <Form.Control style={{ width: "500px" }} type="text" value={country} onChange={onCHandler} />
            </Form.Group>

            <Form.Group style={{ display: "flex", marginTop: "35px", marginBottom: "35px" }} >
              <Form.Label style={{ marginRight: "35px" }}>이미지: </Form.Label>
              <Form.Control style={{ width: "500px" }} type="file" onChange={onimgFileHandler} />
            </Form.Group>

            <Button style={{ display: "block", margin: "" }} variant="primary" type="submit" onClick={regist}>
              발급
            </Button>
          </Form>
        </InfoDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Register;