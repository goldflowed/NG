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
import { Link } from 'react-router-dom'
import Background from '../../../assets/img/home1.jpg'
import NGserviceimg from '../../../assets/img/NGservice(6).png'

function Home() {

  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
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
        id="whyng"
        className='scroll2 p-5 text-center bg-image'
        style={{ height: '700px', backgroundColor: 'rgba(87, 87, 87, 100)' }}
      >
        <div className="out-block">
          <div><h1> Why NG ?</h1></div>
          <hr style={{ color: 'black', border: 0, height: '5px' }}></hr>
          <div id="card1" className="block">
            <h3 className="card_title">Certify</h3>
            <div>NFT 인증서의 조회/확인을 고객이 직접 진행하여 인증서 발급 정보, 브랜드, 제품 번호, 상품의 제조정보까지 투명하게 제공합니다.</div>
          </div>
          <div id="card2" className="block">
            <h3 className="card_title">Worth</h3>
            <div>인증서를 통한 고객의 신뢰를 바탕으로 브랜드 가치를 한 단계 더 높여드립니다.</div>
          </div>
          <div id="card3" className="block">
            <h3 className="card_title">Cycle</h3>
            <div>생산된 물품의 등록시점부터 판매, 소비의 전체적인 과정을 기록하여 데이터 소유권을 보장합니다.</div>
          </div>
        </div>
        <div className="out-block">
          <img id="NGimg" src={NGserviceimg} alt="NGServiceImage" />
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
      <Footer />
    </div >
  )
}
export default Home;