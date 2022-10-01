package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.product.ProductPostReq;
import com.ssafy.ng.api.response.ProductGetRes;
import com.ssafy.ng.db.entity.Product;

public interface ProductService {

    // 제품 이미지 등록하기
    Product createProduct(ProductPostReq productPostReq);

    // 이미지 조회하기
    ProductGetRes getProductByProNo(String proNo);

}
