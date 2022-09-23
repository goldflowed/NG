import React, { useState } from "react";
import NavBar from "../../../common/navbar/NavBar"
import "./home.css"
import {
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Footer from "../../../common/footer/Footer"
import { Link } from 'react-router-dom'
import Background from '../../../assets/img/home1.jpg'

function Home() {

  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  }

  return (
    <div className="home">
    <NavBar></NavBar>
    <div
      className='p-5 text-center bg-image'
      style={{ backgroundImage: `url(${Background})`, height: '800px' }}
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
        className='scroll2 p-5 text-center bg-image'
        style={{ height: '700px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div>
          <h1> 왼쪽</h1>
        </div>
        <div>
          <h1> 오른쪽</h1>
        </div>
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ height: '700px', backgroundColor: 'rgba(0, 0, 0, 0)' }}
      >
        <>
      <MDBTabs pills className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}>Tab 1 content</MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>Tab 2 content</MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </>
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ height: '700px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div>
          <h1> 생명 주기 적을 예정</h1>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Home;