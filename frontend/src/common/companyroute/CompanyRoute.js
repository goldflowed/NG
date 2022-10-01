import React from "react";
import { Navigate } from "react-router-dom";
import IsCompany from "./IsCompany";

const CompanyRoute = ({ children }) => {
  // const isCompany = IsCompany()
  // console.log(IsCompany())
  // if (!IsCompany()) {
  //   alert("기업회원이 아닙니다. 메인페이지로 이동합니다.")
  // }
  // return  IsCompany() ? children : <Navigate to="/" />;

  IsCompany().then((res) => {
    if (!res)  {
      alert("기업회원이 아닙니다. 메인페이지로 이동합니다.")
    }
    return res ? children : <Navigate to="/" />;
  })
};

export default CompanyRoute;