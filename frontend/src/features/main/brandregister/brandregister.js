import axios from "../../../common/api/http-common";
import React,{useEffect, useState} from "react";
import Navbar from "../../../common/navbar/NavBar"
import "./brandregister.css"
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function BrandRegister() {
    const history = useNavigate()
    // 변수 초기화
    const initialValues = { comName: "",
                            comRegNum: "",
                            comWallet: window.localStorage.getItem('wallet'),
                            comEmail: "",
                            comTel: "",
                            comAddress: "",
                            comLogo: "" };

    // 서버로 전달한 formValues
    const [formValues, setFormValues ] = useState(initialValues);
    const [formErrors, setFormErrors ] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    // 이메일 유효성 검사
    const [emailMessage, setEmailMessage] = useState("")
    const [isEmail, setIsEmail] = useState(false)

    const handleChange = (e) => {
        console.log(e.target);
        const {name, value } = e.target;
        setFormValues({...formValues, [name]:value })
        console.log(formValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        axios.get(`company/${window.localStorage.wallet}`)
        .then(() => {
            alert('이미 가입되어있거나 승인 대기중인 계정입니다.')
            history('/')
        })
    })

    // 이메일 확인 정규식
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const checkEmail = (e) => {
        const emailCurrent = e.target.value;

        if(!emailRegEx.test(emailCurrent)){
            setEmailMessage('올바른 이메일을 입력해주세요.')
            setIsEmail(false)
        }else{
            setEmailMessage('')
            setIsEmail(true)
        }
    }

    function onSubmit(event){

        axios.post("company/create/", formValues)
            .then((response) => {
                alert("브랜드 등록 완료!");
                history('/');
            })
            .catch((err) => {
                if(!err.response){
                    alert(err);
                }else{
                    alert(err.response.date)
                }
            })
    }

    const [isActive, setIsActive] = useState(false)
    
    const navigate = useNavigate();

    const check = (formValues) => {
        
    }

    return(
        <div>
        <Navbar/>
        <div className="brandregister text-center">
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <form onSubmit={handleSubmit}>
                <h1>기업 회원 가입</h1>
                <br/>
                <p>저희 서비스를 이용하기 위해서는, 먼저 서비스 가입을 요청해야 합니다. 아래의 정보를 입력해서 제출해주세요.</p>
                <div className="ui divider"></div>
                <div className="ui form display">
                    <div className="field">
                        <br/><br/>
                        <MDBInput
                          type="text"
                          name="comName"
                          label="브랜드 명을 입력해주세요."
                          id='form1'
                          value={ formValues.comName}
                          onChange={handleChange}/>
                    </div>
                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput
                          type="text"
                          name="comRegNum"
                          label="사업자 등록 번호를 입력해 주세요."
                          id='form1'
                          value={ formValues.comRegNum}
                          onChange={handleChange}/>
                    </div>
                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput 
                          type="text"
                          name="comWallet"
                          disabled= {true}
                          label="지갑 주소를 입력해주세요."
                          id='form1'
                          value={ formValues.comWallet}
                          onChange={handleChange}/>
                    </div>
                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput
                          type="text"
                          name="comEmail"
                          label="이메일을 입력해 주세요."
                          id='form1'
                          value={ formValues.comEmail}
                          onChange={handleChange}
                          onBlur={checkEmail}
                          />
                          {formValues.comEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                    </div>

                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput
                          type="text"
                          name="comAddress"
                          label="회사 주소를 입력해주세요."
                          id='form1'
                          value={ formValues.comAddress}
                          onChange={handleChange}/>
                          
                    </div>
                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput
                          type="text"
                          name="comTel"
                          label="회사 전화번호를 입력해주세요."
                          id='form1'
                          value={ formValues.comTel}
                          onChange={handleChange}/>
                    </div>
                    <div className="field" style={{ marginTop: 40}}>
                        <MDBInput
                          type="text" 
                          name="comLogo" 
                          label="로고를 첨부해주세요."
                          id='form1' 
                          value={ formValues.comLogo}
                          onChange={handleChange}/>
                    </div>
                    <br/>
                    <div>
                    <MDBBtn style={{marginRight:50}} outline className='mx-2' color='dark' onClick={() => {
                        navigate('/')
                    }}>뒤로가기</MDBBtn>
                    {
                      !!formValues.comName && !!formValues.comRegNum && !!formValues.comWallet && !!formValues.comEmail && !!formValues.comAddress && !!formValues.comTel && emailRegEx.test(formValues.comEmail)
                      ? <Button style={{marginLeft:50}} variant="outline-primary" onClick={() => onSubmit()}>제출하기</Button>
                      : <Button style={{marginLeft:50}} variant="outline-primary" onClick={() => onSubmit()} disabled>제출하기</Button>
                    }
                    {/* <MDBBtn style={{marginLeft:50}} outline color='success' disabled onClick={() => onSubmit() }>제출하기</MDBBtn> */}
                    </div>
                </div>
            </form>
        </div>
        <br/><br/>
        </div>
    )
}

export default BrandRegister;