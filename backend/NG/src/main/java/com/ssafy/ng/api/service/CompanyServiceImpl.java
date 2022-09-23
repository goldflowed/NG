package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.common.customObject.CompanyList;
import com.ssafy.ng.db.entity.Company;
import com.ssafy.ng.db.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
                .comAddress(comInfo.getComAddress())
                .comTel(comInfo.getComTel())
                .comLogo(comInfo.getComLogo())
                .comPermit(1)
                .build();
        return companyRepository.save(company);
    }

    @Override
    public CompanyGetRes getCompanyByComWallet(String comWallet) {
        Optional<Company> company = companyRepository.getByComWallet(comWallet);
        if (!company.isPresent()) {
            return null;
        }
        CompanyGetRes res = CompanyGetRes.of(company.get());
        return res;
    }

    @Override
    public List<CompanyList> comList() {
        List<Company> page = companyRepository.findAllWaitPermit();
        List<CompanyList> dtoPage = page.stream()
                .map(m -> CompanyList.of(
                        m.getComName()
                )).collect(Collectors.toList());
        return dtoPage;
    }

    @Override
    public boolean permitCompany(String comWallet, CompanyPermitReq permitReq) {
        Optional<Company> company = companyRepository.getByComWallet(comWallet);
        if (!company.isPresent()) {
            return false;
        }
        companyRepository.permitCompany(comWallet, permitReq.getComPermit());
        return true;
    }
}
