package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.common.customObject.CompanyList;
import com.ssafy.ng.db.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompanyService {

    // 기업 정보 생성하기
    Company createCompany(CompanyPostReq companyPostReq);

    // 기업정보 조회하기
    CompanyGetRes getCompanyByComWallet(String comWallet);

    // admin============================================================================================================

    // 승인 요청한 기업 리스트
    List<CompanyList> comList();

    // 기업 승인
    boolean permitCompany(String comWallet, CompanyPermitReq permitReq);
}
