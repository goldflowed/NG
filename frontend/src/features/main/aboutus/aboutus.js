import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"

function AboutUs() {

    return(
        <div>
        <NavBar/>
            <div
            className='p-5 text-center bg-image mt-5'
            style={{ height: '300px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
                <div>
                    <h1> 진품 인증에 관심이 많은 ~~~ 만들었다 ~~~~</h1>
                </div>
            </div>
            <div
            className='p-5 text-center bg-image'
            style={{ height: '400px', backgroundColor: 'rgba(0, 0, 0, 0)' }}
            >
                <div>
                    <h1> 우리의 미션 우리의 비전 우리의 가치</h1>
                </div>
            </div>
            <div
            className='p-5 text-center bg-image'
            style={{ height: '500px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
                <div>
                    <h1> 우리 소개</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default AboutUs