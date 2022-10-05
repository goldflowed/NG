import React, { useState, useEffect } from "react";
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ssafy from '../../../assets/img/ssafy.png';
import NavBar from "../../../common/navbar/NavBar";
import { nftContract } from "../../../common/web3/web3Config"
import axios from '../../../common/api/http-common'
import { useNavigate } from 'react-router-dom';
import Footer from "../../../common/footer/Footer";

const ContainerDiv = styled.div`

  `

const MainDiv = styled.div`
  padding-top:50px;
  font-size:20px;
  margin-top:25px;
  display: flex;
  margin-left: 20rem;
  margin-bottom: 10rem;
  flex-direction: column;
  font-family: 'MaruBuri-Regular';
  `

const TitleP = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'MaruBuri-Regular';
  margin-top: 4rem;
  display: flex;
  justify-content: center
  `

const InfoDiv = styled.div`
  margin:50px;
  `

const Logo = styled.img`
  border-radius: 10px;
  justify-content: center;
  `

function Register() {
  const history = useNavigate()

  const [productNumber, setPN] = useState("");
  const [productName, setProductName] = useState("");
  const [makingDate, setMD] = useState("");
  const [country, setC] = useState("");
  const [imgUrl, setImgUrl] = useState("");
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

  const onImgUrlHandler = (event) => {
    setImgUrl(event.currentTarget.value);
  }

  const regist = async (e) => {
    e.preventDefault();
    
    await nftContract.methods
      .addProduct(brand,productName, productNumber, makingDate, country)
      .send({ from: window.localStorage.wallet })
      .then((res) => {
        const body = {"proNo": productNumber,
                      "proUrl": imgUrl,};
        axios.post(`product/create`, body)
        .then((res) => console.log(res))
        console.log(res)
        alert('성공하였습니다.')});
        history('/company/products');
  }

  useEffect(() => {
    axios.get(`company/${window.localStorage.wallet}`)
    .then((res) => {
      setBrand(res.data.comName)
      setLogoUrl(res.data.comLogo)
    })
  },[])

  return (
    <ContainerDiv>
      <NavBar/>
      <SideBar/>
      <MainDiv>
        <TitleP>제품을 등록해주세요.</TitleP>
        <InfoDiv>
          <Form>
            {/* <Logo style={{display:"block", margin:"auto"}} src={logoUrl}/> */}
            <Form.Group style={{display:"flex", justifyContent:"center", marginTop: "35px", marginBottom: "35px"}} >
              {/* <Form.Label style={{marginRight:"10px"}}>제품 이름: </Form.Label> */}
              <Form.Control placeholder="제품 이름을 입력해주세요." style={{width:"500px"}} type="text" value={productName} onChange={onProductNameHandler}/>
            </Form.Group>

            <Form.Group style={{display:"flex", justifyContent:"center", marginTop: "35px", marginBottom: "35px"}} >
              {/* <Form.Label style={{marginRight:"10px"}}>제품 번호: </Form.Label> */}
              <Form.Control placeholder="제품 번호를 입력해주세요." style={{width:"500px"}} type="text" value={productNumber} onChange={onPNHandler}/>
            </Form.Group>

            <Form.Group style={{display:"flex", justifyContent:"center", marginTop: "35px", marginBottom: "35px"}} >
              {/* <Form.Label style={{marginRight:"35px"}}>출고일: </Form.Label> */}
              <Form.Control placeholder="출고일을 입력해주세요." style={{width:"500px"}} type="text" value={makingDate} onChange={onMDHandler}/>
            </Form.Group>

            <Form.Group style={{display:"flex", justifyContent:"center", marginTop: "35px", marginBottom: "35px"}} >
              {/* <Form.Label style={{marginRight:"35px"}}>제조국: </Form.Label> */}
              <Form.Control placeholder="제조국을 입력해주세요." style={{width:"500px"}} type="text" value={country} onChange={onCHandler}/>
            </Form.Group>

            <Form.Group style={{display:"flex", justifyContent:"center", marginTop: "35px", marginBottom: "35px"}} >
              {/* <Form.Label style={{marginRight:"35px"}}>이미지: </Form.Label> */}
              <Form.Control placeholder="이미지 주소를 넣어주세요." style={{width:"500px"}} type="text" value={imgUrl} onChange={onImgUrlHandler}/>
            </Form.Group>

            <Button style={{display:"block", margin:"auto"}} variant="outline-primary" type="submit" onClick={regist}>
              발급하기
            </Button>
          </Form>
        </InfoDiv>
      </MainDiv>
      <Footer/>
    </ContainerDiv>
  )
}
export default Register;