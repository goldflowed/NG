import axios from "axios";
import React,{useEffect, useState} from "react";
import Navbar from "../../../common/NavBar"
import "./brandregister.css"
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';

function BrandRegister() {

    // 변수 초기화
    const initialValues = { comName: "",
                            comRegNum: "",
                            comWallet: "",
                            comEmail: "",
                            comTel: "",
                            comAddress: "",
                            comLogo: "" };

    // 서버로 전달한 formValues
    const [formValues, setFormValues ] = useState(initialValues);
    const [formErrors, setFormErrors ] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    })

    // const validate = (values) => {
    //     const errors = {}
    //     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if(!values.comEmail){
    //         errors.comEmail = "이메일을 올바르게 입력해주세요."
    //     }
    //     return errors;
    // };

    function onSubmit(event){

        axios.post("http://localhost:8080/company/create/", formValues)
            .then((response) => {
                alert("브랜드 등록 완료!")
            })
            .catch((err) => {
                if(!err.response){
                    alert(err);
                }else{
                    alert(err.response.date)
                }
            })
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
                          onChange={handleChange}/>
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
                    <MDBBtn outline color='success' onClick={() => onSubmit()}>제출하기</MDBBtn>
                </div>
            </form>
        </div>
        </div>
    )
}

export default BrandRegister;