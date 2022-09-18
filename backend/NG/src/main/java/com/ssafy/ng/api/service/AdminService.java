package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.common.customObject.CompanyList;
import com.ssafy.ng.db.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

    // 승인 요청한 기업 리스트
    Page<CompanyList> comList(Pageable pageable);

    // 기업 승인
    boolean permitCompany(String comWallet, CompanyPermitReq permitReq);
}
