package com.ssafy.ng.api.service;

import com.ssafy.ng.api.response.ProductGetRes;
import com.ssafy.ng.db.entity.Product;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    // 제품 이미지 등록하기
    Product createProduct(MultipartFile file, String proNo);

    // 이미지 조회하기
    ProductGetRes getProductByProNo(String proNo);

}
