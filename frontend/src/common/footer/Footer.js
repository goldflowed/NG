import React from 'react';
import './Footer.css'
import {
  MDBFooter,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import LogoImg from '../../assets/img/로고2.png'
import Cycle01 from '../../assets/img/footCycle01.png'
import Cycle02 from '../../assets/img/footCycle02.png'
import Cycle03 from '../../assets/img/footCycle03.png'
import Cycle04 from '../../assets/img/footCycle04.png'

function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <br />
      <div className='p-4'>
        <section className='footerTop mb-1'>
          <img className="headImg" src={Cycle01} alt="cycleImg" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img className="headImg" src={Cycle02} alt="cycleImg" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img className="headImg" src={Cycle03} alt="cycleImg" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img className="headImg" src={Cycle04} alt="cycleImg" />
        </section>

        <div className="footerMid">
          <section className="footerText">
            <div style={{ textAlign: "right" }}>
              <div> NG Service </div>
              <div> 대표 유도경 </div>
              <div> 부산 강서구 녹산산업중로 333 </div>
              <div> nftguarantee@ssafyng.com </div>
              <div> 051-000-0000 </div>
            </div>
          </section>

          <img style={{ width: "10%", height: "10%" }} src={LogoImg} alt="페이지로고" />

          <section className="footerLink">
            <MDBRow>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='/aboutus' className='text-white'>
                      AboutUs
                    </a>
                  </li>
                  <li>
                    <a href='/searchnft' className='text-white'>
                      SerarchNFT
                    </a>
                  </li>
                  <li>
                    <a href='/mynft' className='text-white'>
                      MyNFT
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='/' className='text-white'>
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href='https://map.naver.com/v5/entry/place/1882570816?c=14343455.6082713,4176965.6014261,15,0,0,0,dh' className='text-white'>
                      Company Map
                    </a>
                  </li>
                  <li>
                    <a href='/brandregister' className='text-white'>
                      BrandRegister
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section>
        </div>

      </div>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright&nbsp;:&nbsp;
        <a className='text-white' href='https://www.ssafy.com/'>
          SSAFY NFT Guarantee. All rights reserved. 333, Noksansaneopjung-ro, Gangseo-gu, Busan, Rep Of Korea
        </a>
      </div>
    </MDBFooter >
  );
}

export default Footer;