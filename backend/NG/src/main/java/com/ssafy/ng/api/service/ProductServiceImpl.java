package com.ssafy.ng.api.service;

import com.ssafy.ng.api.request.product.ProductPostReq;
import com.ssafy.ng.api.response.ProductGetRes;
import com.ssafy.ng.db.entity.Product;
import com.ssafy.ng.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("ProductService")
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;

    @Override
    public Product createProduct(ProductPostReq productPostReq) {
        Product product = Product.builder()
                .proNo(productPostReq.getProNo())
                .proUrl(productPostReq.getProUrl())
                .build();
        return productRepository.save(product);
    }

    @Override
    public ProductGetRes getProductByProNo(String proNo) {
        Optional<Product> product = productRepository.findByProNo(proNo);
        if (!product.isPresent()) {
            return null;
        }
        ProductGetRes res = ProductGetRes.of(product.get());
        return res;
    }
}
