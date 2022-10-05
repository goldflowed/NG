import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import { useEffect, useRef } from "react"
import "./aboutus.css"

function AboutUs() {

  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);

  useEffect(() => {
    var video = document.querySelector('#video');
    if (video.paused) {
      video.play();
    }
  }, []);

  return (
    <div className="about-us">
      <NavBar />
      <div className='section-1'>
        <video autoPlay muted loop id="video">
          <source src={require('../../../assets/img/aboutus/BGV1.mp4')} type="video/mp4" />
        </video>
        <div className="content1 text-center" ref={section1}>
          <div className="main1">
            <p className="title1 fs-1 fw-bold">소비자의 권리와 제품의 가치를 끌어올리기 위해</p>
          </div>
        </div>
      </div>
      <div className='section-2 p-4' ref={section2}>
        <div className="">
          <p className="m-3 text-start fs-1 fw-bold">우리의 미션</p>
          <p className="m-3 fs-4 text-start">
            블록체인 솔루션을 통해서 <strong>투명성</strong>과 <strong>추적성</strong>을 제공합니다.
            명품의 <strong>선순환적인 거래 및 위조방지</strong>를 위해 기술을 제공합니다.
          </p>
        </div>
        <div className=" border-top border-light">
          <p className="m-3 text-end fs-1 fw-bold">우리의 비전</p>
          <p className="m-3 fs-4 text-end">
            소비자 및 기업의 <strong>신뢰성과 진정성 보장</strong>을 가장 중요하게 생각합니다.
            <strong>위조 및 회색시장 방지</strong>, 선순환적인 경제활동을 위해 노력합니다.
          </p>
        </div>
        <div className=" border-top border-light">
          <p className="m-3 text-start fs-1 fw-bold">우리의 가치</p>
          <p className="m-3 fs-4 text-start">
            고객 경험에 <strong>새로운 패러다임</strong>을 제공합니다.
            브랜드나 제품에 국한되지 않는 <strong>무한한 확장 가능성</strong>을 목표합니다.
          </p>
        </div>
      </div>
      <div className='section-3'>
        <div ref={section3}>
          <div className="m-5">
            <h1>TEAM MEMBER</h1>
          </div>
          <div className="introduce">
            <div className="team1">
              <div className="teammate">
                <div className="teammate-img">
                  <img src={require("../../../assets/img/aboutus/captain.jpg")}
                    style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="my-2">유도경</p>
                <p className="my-2">Front-End</p>
              </div>
              <div className="teammate">
                <div className="teammate-img">
                  <img src={require("../../../assets/img/aboutus/byeongsoo.jpg")}
                    style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="my-2">강병수</p>
                <p className="my-2">Front-End</p>
              </div>
              <div className="teammate">
                <div className="teammate-img">
                  <img src={require("../../../assets/img/aboutus/daeyeong.jpg")}
                    style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="my-2">김대영</p>
                <p className="my-2">Back-End</p>
              </div>
              <div className="teammate">
                <div className="teammate-img">
                  <img src={require("../../../assets/img/aboutus/yuri.jpg")}
                    style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="my-2">김유리</p>
                <p className="my-2">Blockchain</p>
              </div>
              <div className="teammate">
                <div className="teammate-img">
                  <img src={require("../../../assets/img/aboutus/gwangseok.jpg")}
                    style={{ height: "100%", width: "100%" }} />
                </div>
                <p className="my-2">서광석</p>
                <p className="my-2">Blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default AboutUs