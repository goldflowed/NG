import axios from "axios";
import React,{useEffect, useState} from "react";
import Navbar from "../../../common/NavBar"

// import "./brand-register.css"

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
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    })

    const validate = (values) => {
        const errors = {}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.comEmail){
            errors.comEmail = "이메일을 올바르게 입력해주세요."
        }
        return errors;
    };

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
        <div className="container">
            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            <form onSubmit={handleSubmit}>
                <h1>기업 회원 가입</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field" style={{ marginTop: 50}}>
                        <input
                          type="text"
                          name="comName"
                          placeholder="브랜드 명을 입력해주세요."
                          value={ formValues.comName}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input
                          type="text"
                          name="comRegNum"
                          placeholder="사업자 등록 번호를 입력해주세요."
                          value={ formValues.comRegNum}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="comWallet"
                          placeholder="지갑 주소를 입력해주세요."
                          value={ formValues.comWallet}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="comEmail"
                          placeholder="이메일 주소를 입력해주세요."
                          value={ formValues.comEmail}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <p>{ formErrors.comEmail }</p>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="comAddress"
                          placeholder="회사 주소를 입력해주세요."
                          value={ formValues.comAddress}
                          onChange={handleChange}>
                          </input>
                          
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="comTel"
                          placeholder="회사 전화번호를 입력해주세요."
                          value={ formValues.comTel}
                          onChange={handleChange}>
                          </input>
                          
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text" 
                          name="comLogo" 
                          placeholder="로고를 첨부해주세요." 
                          value={ formValues.comLogo}
                          onChange={handleChange}
                          ></input>
                    </div>
                    <button className="button" onClick={() => onSubmit()}>제출하기</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default BrandRegister;