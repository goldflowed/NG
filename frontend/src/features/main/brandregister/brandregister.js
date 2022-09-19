// import axios from "axios";
import React,{useEffect, useState} from "react";
import Navbar from "../../../common/NavBar"

// import "./brand-register.css"

function BrandRegister() {

    const initialValues = { companyname: "",
                            companynumber: "",
                            companywallet: "",
                            companyemail: "",
                            companytellnum: "",
                            companyaddress: "",
                            companylogo: "" };

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
        if(!values.companyemail){
            errors.companyemail = "이메일을 올바르게 입력해주세요."
        }
        return errors;
    };

    function submit(){
        // axios(
        //     {
        //         url: '/company/create/',
        //         method: 'post',
        //         data: {
        //             companyname: formValues.companyname,
        //             companynumber: formValues.companynumber,
        //             companywallet: formValues.companywallet,
        //             companyemail: formValues.companyemail,
        //             companytellnum: formValues.companytellnum,
        //             companyaddress: formValues.companyaddress,
        //             companylogo: formValues.companylogo,
        //         },
        //         baseURL: 'http://localhost:8080',
        //     }
        // ).then(function (response){
        //     console.log(response.data)
        // })
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
                          name="companyname"
                          placeholder="브랜드 명을 입력해주세요."
                          value={ formValues.companyname}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input
                          type="text"
                          name="companynumber"
                          placeholder="사업자 등록 번호를 입력해주세요."
                          value={ formValues.companynumber}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="companywallet"
                          placeholder="지갑 주소를 입력해주세요."
                          value={ formValues.companywallet}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="companyemail"
                          placeholder="이메일 주소를 입력해주세요."
                          value={ formValues.companyemail}
                          onChange={handleChange}>
                          </input>
                    </div>
                    <p>{ formErrors.companyemail }</p>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="companyaddress"
                          placeholder="회사 주소를 입력해주세요."
                          value={ formValues.companyaddress}
                          onChange={handleChange}>
                          </input>
                          
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text"
                          name="companytellnum"
                          placeholder="회사 전화번호를 입력해주세요."
                          value={ formValues.companytellnum}
                          onChange={handleChange}>
                          </input>
                          
                    </div>
                    <div className="field" style={{ marginTop: 50}}>
                        <input 
                          type="text" 
                          name="companylogo" 
                          placeholder="로고를 첨부해주세요." 
                          value={ formValues.companylogo}
                          onChange={handleChange}
                          ></input>
                    </div>
                    <button className="button" onClick={() => submit()}>제출하기</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default BrandRegister;