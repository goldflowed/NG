package com.ssafy.ng.db.repository;

import com.ssafy.ng.db.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> getByComSeq(long comSeq);
}
