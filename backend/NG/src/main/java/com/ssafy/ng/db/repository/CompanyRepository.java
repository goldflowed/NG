package com.ssafy.ng.db.repository;

import com.ssafy.ng.db.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> getByComWallet(String comWallet);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update Company com set com.comPermit = :comPermit where com.comWallet = :comWallet")
    void permitCompany(int comPermit, String comWallet);

    @Modifying(clearAutomatically = true)
    @Query(value = "select com from Company com where com.comPermit = :comPermit")
    List<Company> findAllWaitPermit(int comPermit);
}
