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

    const goSection2 = () => {
        const el = document.getElementById("section-2")
        el.classList.add('fadeInUp')
    }
    

    return(
        <div className="about-us">
        <NavBar/>
            <div className='section-1'>
                <video autoPlay muted loop id="video">
                    <source src={ require('../../../assets/img/BGV1.mp4') } type="video/mp4" />
                </video>
                <div className="content1 text-center" ref={ section1 }>
                    <div className="main1">
                        <h1 className="title1">소비자의 권리와 제품의 가치를 끌어올리기 위해</h1>
                        <img className="main-image" src={require("../../../assets/img/로고2.png")}/>
                    </div>    
                </div>
            </div>
            <div className='section-2' id="section2">
                <div ref={ section2 }>
                    <h1> 우리의 미션 - 블록체인 솔루션을 통해서 투명성과 추적성을 제공합니다.
                        명품의 선순환적인 거래 및 위조방지를 위해 기술을 제공합니다.

                        우리의 비전 - 소비자 및 기업의 신뢰성과 진정성 보장을 가장 중요하게 생각합니다.
                        위조 및 회색시장 방지를 위해, 선순환적인 경제활동을 장려하기 위해 노력합니다.
                        
                        우리의 가치 - 고객 경험에 새로운 패러다임을 제공
                        무한한 확장 가능성, 브랜드/물건
                    </h1>
                </div>
            </div>
            <div className='section-3'>
                <div ref={ section3 }>
                    <h1> 우리 소개</h1>
                    <div className="introduce">
                        <div className="team1">
                            <div className="teammate">
                                <div className="teammate-img">
                                    <img src={require("../../../assets/img/ham.jpg")}
                                    style={{ height:"100%", width:"100%" }}/>
                                </div>
                                <p>팀원1</p>
                                <p>파트 : 프론트엔드</p>
                                <p>솰라솰라</p>
                            </div>
                            <div className="teammate">
                                <div className="teammate-img">
                                    <img src={require("../../../assets/img/ham.jpg")}
                                    style={{ height:"100%", width:"100%" }}/>
                                </div>
                                <p>팀원2</p>
                                <p>파트 : 프론트엔드</p>
                                <p>솰라솰라</p>
                            </div>
                            <div className="teammate">
                                <div className="teammate-img">
                                    <img src={require("../../../assets/img/ham.jpg")}
                                    style={{ height:"100%", width:"100%" }}/>
                                </div>
                                <p>팀원3</p>
                                <p>파트 : 프론트엔드</p>
                                <p>솰라솰라</p>
                            </div>
                        </div>
                        <div className="team2">
                            <div className="teammate">
                                <div className="teammate-img">
                                    <img src={require("../../../assets/img/ham.jpg")}
                                    style={{ height:"100%", width:"100%" }}/>
                                </div>
                                <p>팀원4</p>
                                <p>파트 : 프론트엔드</p>
                                <p>솰라솰라</p>
                            </div>
                            <div className="teammate">
                                <div className="teammate-img">
                                    <img src={require("../../../assets/img/ham.jpg")}
                                    style={{ height:"100%", width:"100%" }}/>
                                </div>
                                <p>팀원5</p>
                                <p>파트 : 프론트엔드</p>
                                <p>솰라솰라</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
        
}

export default AboutUs