package com.ssafy.ng.api.service;

import com.ssafy.ng.api.response.ProductGetRes;
import com.ssafy.ng.config.IPFSConfig;
import com.ssafy.ng.db.entity.Product;
import com.ssafy.ng.db.repository.ProductRepository;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Optional;

@Service("ProductService")
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private IPFSConfig ipfsConfig;

    @Override
    public Product createProduct(MultipartFile file, String proNo) {
        System.out.println("createProduct");
        String hash = null;
        try {
            InputStream is = new ByteArrayInputStream(file.getBytes());
            NamedStreamable.InputStreamWrapper inputStreamWrapper = new NamedStreamable.InputStreamWrapper(is);
            IPFS ipfs = ipfsConfig.ipfs;

            MerkleNode merkleNode = ipfs.add(inputStreamWrapper).get(0);
            hash = merkleNode.hash.toBase58();
            System.out.println("merkleNode.hash.toBase58(): "+merkleNode.hash.toBase58());
        }catch (Exception e) {
            throw new RuntimeException("Error whilst communicationg with the IPFS node", e);
        }
        System.out.println("hash: "+hash);
        Product product = productRepository.findByProNo(proNo);
        if (product==null) {
            product = new Product();
        }
        product.setProNo(proNo);
        product.setProUrl(hash);
        return productRepository.save(product);
    }

    @Override
    public ProductGetRes getProductByProNo(String proNo) {
        Product product = productRepository.findByProNo(proNo);
        if (product==null) {
            return null;
        }
        ProductGetRes res = ProductGetRes.of(product);
        return res;
    }
}
