package com.ssafy.ng.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Company {
    // 기업 시퀀스
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long comSeq;

    // 기업 이름
    @Column(name = "com_name", nullable = false)
    private String comName;

    // 사업자 등록번호
    @Column(name = "com_reg_num", nullable = false)
    private String comRegNum;

    // 기업 지갑주소
    @Column(name = "com_wallet", nullable = false, unique = true)
    private String comWallet;

    // 기업 이메일
    @Column(name = "com_email")
    private String comEmail;

    // 기업 주소
    @Column(name = "com_address")
    private String comAddress;

    // 고객센터번호
    @Column(name = "com_tel")
    private String comTel;

    // 기업 로고 이미지 url
    @Column(name = "com_logo")
    private String comLogo;

    // 기업 가입 승인 여부
    // 1: 승인중, 2:승인거부, 3:승인
    @Column(name = "com_permit")
    private int comPermit;
}
