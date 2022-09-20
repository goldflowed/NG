import React from "react";
import { Navigate } from "react-router-dom";
import IsCompany from "./IsCompany";

const CompanyRoute = ({ children }) => {
  const isCompany = IsCompany()
  console.log(isCompany)
  if (!isCompany) {
    alert("기업회원이 아닙니다. 메인페이지로 이동합니다.")
  }
  return isCompany ? children : <Navigate to="/" />;
};

export default CompanyRoute;