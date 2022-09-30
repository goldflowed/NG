package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.company.CompanyPermitReq;
import com.ssafy.ng.api.request.company.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.common.customObject.CompanyList;
import com.ssafy.ng.db.entity.Company;
import com.ssafy.ng.db.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<CompanyList> comList(int comPermit) {
        List<Company> page = companyRepository.findAllWaitPermit(comPermit);
        List<CompanyList> dtoPage = page.stream()
                .map(m -> CompanyList.of(
                        m.getComName(),
                        m.getComWallet()
                )).collect(Collectors.toList());
        return dtoPage;
    }

    @Override
    public void permitCompany(String comWallet, CompanyPermitReq permitReq) {
        // 지갑주소에 해당하는 기업을 도출
        Optional<Company> company = companyRepository.getByComWallet(comWallet);
        // 해당 기업이 존재하지 않거나 승인대기 상태일 때만 변환
        if ( company.isPresent() || company.get().getComPermit() == 1) {
            companyRepository.permitCompany(permitReq.getComPermit(), comWallet);
        }
    }
}
