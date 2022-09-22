import React from "react";
import NavBar from "../../../common/navbar/NavBar"
import "./home.css"
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import Footer from "../../../common/footer/Footer"
import { Link } from 'react-router-dom'
import Background from '../../../assets/img/home1.jpg'

function Home() {
  return (
    <div className="home">
    <NavBar></NavBar>
    <div
      className='p-5 text-center bg-image'
      style={{ backgroundImage: `url(${Background})`, height: '900px' }}
    >
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className='text-white'>
            <h1 className='mt-5'>LUXURY CERTIFICATION NFT</h1>
            <h3 className='mt-3'>명품 브랜드를 위한 블록체인 솔루션</h3>
            <h5 className='mt-5'>우리는 고객의 새로운 경험과 함께 건전한 명품 산업의 생태계를 구축하기 위한 서비스입니다.</h5>
            <Link to="./aboutus">
              <MDBBtn className="mt-5" tag="a" outline size="lg">
                MORE DETAIL
              </MDBBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
   <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '700px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Block Chain</h1>
              <h4 className='mb-3'>혁명을 맞이하라</h4>
              <MDBBtn tag="a" outline size="lg">
                Call to action
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '700px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Block Chain</h1>
              <h4 className='mb-3'>혁명을 맞이하라</h4>
              <MDBBtn tag="a" outline size="lg">
                Call to action
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '700px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Block Chain</h1>
              <h4 className='mb-3'>혁명을 맞이하라</h4>
              <MDBBtn tag="a" outline size="lg">
                Call to action
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}
export default Home;