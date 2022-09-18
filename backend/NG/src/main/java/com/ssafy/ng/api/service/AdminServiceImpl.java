package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.common.customObject.CompanyList;
import com.ssafy.ng.db.entity.Company;
import com.ssafy.ng.db.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("AdminService")
public class AdminServiceImpl implements AdminService{

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public Page<CompanyList> comList(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Page<Company> page = companyRepository.findAll(pageRequest);
        Page<CompanyList> dtoPage = page
                .map(m -> CompanyList.of(
                        m.getComName()
                ));
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
