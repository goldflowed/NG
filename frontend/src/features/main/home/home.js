import React, { useState, useEffect } from "react";
import NavBar from "../../../common/navbar/NavBar"
import "./home.css"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import Footer from "../../../common/footer/Footer"
import { Link } from 'react-router-dom'
import Background from '../../../assets/img/home1.jpg'
import NGserviceimg from '../../../assets/img/NGservice.png'
import CustomerImg01 from '../../../assets/img/Customer01.png'
import CustomerImg02 from '../../../assets/img/Customer02.png'
import CustomerImg03 from '../../../assets/img/Customer03.png'
import BrandImg01 from '../../../assets/img/Brand01.png'
import BrandImg02 from '../../../assets/img/Brand02.png'
import BrandImg03 from '../../../assets/img/Brand03.png'
import Cycle01 from '../../../assets/img/Cycle01.png'
import Cycle02 from '../../../assets/img/Cycle02.png'
import Cycle03 from '../../../assets/img/Cycle03.png'
import Cycle04 from '../../../assets/img/Cycle04.png'

function Home() {

  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  }

  useEffect(() => {
    // console.log(typeof(web3))
    if (typeof(web3) === 'undefined') {
      // alert('저희 서비스를 이용하기위해서는 metamask 설치가 필요합니다. \n설치페이지로 이동하시겠습니까?')
      if (window.confirm('저희 서비스를 이용하기위해서는 MetaMask 설치가 필요합니다. \n설치페이지로 이동하시겠습니까?') == true) {
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
      } else {
        console.log('아니오')
      }
    }
  }, []);

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
                <MDBBtn className="mt-5" outline size="lg">
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
                For Customer
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                For Brand
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'tab1'}>
              <div style={{ display: "flex" }} >
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={CustomerImg01} alt="고유한인증서" />
                    <div style={{ margin: "15px" }}>
                      <div className="customerCardTitle"> <b>고유한 인증서</b> </div>
                      <div className="customerCardBody">
                        인증서 발급자의 제한 및 발급 가능한 브랜드의 투명한 공개로
                        브랜드의 가치 상승과 고객의 제품 신뢰성을 제공하는 고유한 인증서입니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={CustomerImg02} alt="소유권이전" />
                    <div style={{ margin: "15px" }}>
                      <div className="customerCardTitle"> <b>소유권 이전</b> </div>
                      <div className="customerCardBody">
                        블록체인을 통한 정품 인증서 관리로 제품의 양도/재판매/증여 시
                        본인 소유의 인증서에서 정확한 상대의 계정으로만 전송이 가능합니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={CustomerImg03} alt="거래안정성" />
                    <div style={{ margin: "15px" }}>
                      <div className="customerCardTitle"> <b>거래 안정성</b> </div>
                      <div className="customerCardBody">
                        인증서에 표시되는 거래 기록으로 최초 발급자를 확인가능하며
                        현재 소유자 및 이전 소유기록 또한 조회/확인이 가능합니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
              <div style={{ display: "flex" }} >
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={BrandImg01} alt="데이터보안" />
                    <div style={{ margin: "15px" }}>
                      <div className="brandCardTitle"> <b>데이터보안</b> </div>
                      <div className="brandCardBody">
                        제품의 데이터는 브랜드가 소유하고 인증받을 수 있으며
                        서비스 네트워크 내 중복 데이터 없이 고유함을 보장합니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={BrandImg02} alt="고객신뢰성향상" />
                    <div style={{ margin: "15px" }}>
                      <div className="brandCardTitle"> <b>고객 신뢰성 향상</b> </div>
                      <div className="brandCardBody">
                        발행자와 브랜드 지갑을 확인할 수 있어 가품문제에 대한 예방 및 확인이 가능하여
                        브랜드에 대한 고객의 신뢰성을 기대할 수 있습니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="benefitCard">
                  <MDBCardBody>
                    <img className="benefitImg" src={BrandImg03} alt="중고거래감시" />
                    <div style={{ margin: "15px" }}>
                      <div className="brandCardTitle"> <b>중고거래 감시</b> </div>
                      <div className="brandCardBody">
                        빠르게 성장하는 중고 시장에서의 불법 및 가품 문제에 있어
                        정확한 기록과 정보를 통해 확인 및 통제할 수 있습니다.
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </>
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ height: '700px', backgroundColor: 'rgba(87, 87, 87, 100)' }}
      >
        <div>
          <h1 className="text-light"> 지속 가능한 제품의 생명주기 </h1>
          <div className="text-light" style={{ "marginTop": "20px", "paddingBottom": "7%" }}>제품의 등록부터 거래내역까지 생명주기의 확인 가능</div>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <div className="carousel-inner cycleBox">
              <div className="carousel-item active" data-bs-interval="3000">
                <div className="cycleCard">
                  <img src={Cycle01} className="d-block cycleImg" alt="..." />
                  <div className="cycleText">
                    <h2>생산</h2>
                    <hr />
                    <div className="cycleTextBody">
                      생산된 상품을 등록하여 이후 거래 기록들을 모두 추적할 수 있는
                      고유한 디지털 id와 hash를 생성
                    </div>
                    <br />
                    <div className="cycleTextBody">
                      생성된 id로 제품의 고유한 인증서를 조회/확인
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <div className="cycleCard">
                  <img src={Cycle02} className="d-block cycleImg" alt="..." />
                  <div className="cycleText">
                    <h2>구입</h2>
                    <hr />
                    <div className="cycleTextBody">
                      제품을 구매하고 고유한 NG를 받으세요. 제품의 진품을 보장합니다.
                    </div>
                    <br />
                    <div className="cycleTextBody">
                      제품의 정보에 접근할 수 있는 NFT Guarantee를 통해 신뢰할 수 있는 거래경험을 선사합니다.
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <div className="cycleCard">
                  <img src={Cycle03} className="d-block cycleImg" alt="..." />
                  <div className="cycleText">
                    <h2>기록</h2>
                    <hr />
                    <div className="cycleTextBody">
                      제품의 등록 부터 발생하는 모든 거래의 기록을 보관하세요.
                    </div>
                    <br />
                    <div className="cycleTextBody">
                      거래 기록을 통해 제품의 사용기간을 확인하고 거래의 역추적 또한 가능합니다.
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <div className="cycleCard">
                  <img src={Cycle04} className="d-block cycleImg" alt="..." />
                  <div className="cycleText">
                    <h2>재판매</h2>
                    <hr />
                    <div className="cycleTextBody">
                      인증서를 조회하고 제품과 비교한 뒤 중고 시장 거래를 진행하세요.
                    </div>
                    <br />
                    <div className="cycleTextBody">
                      NG Service를 기반으로 발급 및 거래된 디지털 인증서를 기반으로 보다 높은 신뢰성을 제공합니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}
export default Home;