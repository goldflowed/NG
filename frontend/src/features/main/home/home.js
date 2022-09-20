import React from "react";
import NavBar from "../../../common/NavBar"
import "./home.css"
import {
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import Footer from "../../../common/Footer"

function Home() {
  return (
    <div className="home">
      <NavBar></NavBar>
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