package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.db.entity.Company;
import com.ssafy.ng.db.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("CompanyService")
public class CompanyServiceImpl implements CompanyService{

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public Company createCompany(CompanyPostReq comInfo) {
        Company company = Company.builder()
                .comName(comInfo.getComName())
                .comRegNum(comInfo.getComRegNum())
                .comWallet(comInfo.getComWallet())
                .comEmail(comInfo.getComEmail())
                .comTel(comInfo.getComTel())
                .comLogo(null)
                .build();
        return companyRepository.save(company);
    }

    @Override
    public CompanyGetRes getCompanyByComSeq(long comSeq) {
        Optional<Company> company = companyRepository.getByComSeq(comSeq);
        if (!company.isPresent()) {
            return null;
        }
        CompanyGetRes res = CompanyGetRes.of(company.get());
        return res;
    }

}
