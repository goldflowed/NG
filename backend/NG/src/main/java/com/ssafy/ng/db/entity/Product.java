package com.ssafy.ng.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    // 제품 이미지 시퀀스
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long proSeq;

    // 제품 고유번호
    @Column(name = "pro_no", nullable = false)
    private String proNo;

    // 제품 이미지 URL
    @Column(name = "pro_url", nullable = false)
    private String proUrl;
}
