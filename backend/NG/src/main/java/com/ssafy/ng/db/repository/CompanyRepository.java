package com.ssafy.ng.db.repository;

import com.ssafy.ng.db.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> getByComWallet(String comWallet);

    @Modifying(clearAutomatically = true)
    @Query(value = "update Company com set com.comPermit = :comPermit where com.comWallet = :comWallet")
    void permitCompany(String comWallet, int comPermit);

    @Modifying(clearAutomatically = true)
    @Query(value = "select * from company com where com.com_permit = 1", nativeQuery = true)
    List<Company> findAllWaitPermit();
}
