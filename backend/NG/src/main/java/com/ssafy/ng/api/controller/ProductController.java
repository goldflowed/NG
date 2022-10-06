package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.response.ProductGetRes;
import com.ssafy.ng.api.service.IPFSServiceImpl;
import com.ssafy.ng.api.service.ProductService;
import com.ssafy.ng.db.entity.Product;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api(value = "제품 API", tags = {"Product"})
@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = {"https://localhost:3000",
        "https://j7e206.p.ssafy.io",
        "https://localhost:13000"}, allowCredentials = "true")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    private IPFSServiceImpl ipfsService;

    // 제품 이미지 등록 ==================================================================================================
    @PostMapping("/create")
    @ApiOperation(value = "제품 이미지 등록", notes = "제품 등록 시 제품 고유 번호와 이미지 URL을 백엔드에 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = Product.class),
            @ApiResponse(code = 401, message = "유효하지 않은 정보")
    })
    public ResponseEntity<?> registPro(
            @RequestParam("file") MultipartFile file, @RequestParam("proNo") String proNo) {
//            @RequestParam("file")MultipartFile file, @RequestBody @ApiParam(value = "등록하는 이미지 정보", required = true)ProductPostReq productInfo) {
//        ipfsService.saveFile(file);
        productService.createProduct(file, proNo);
//        productService.createProduct(productInfo);
        return new ResponseEntity<>("제품 이미지 등록이 완료되었습니다.", HttpStatus.valueOf(200));
    }

    @GetMapping("/{proNo}")
    @ApiOperation(value = "제품이미지 불러오기", notes = "제품의 고유번호를 통해 제품의 이미지 URL을 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 제품")
    })
    public ResponseEntity<?> getProUrl(
            @PathVariable @ApiParam(value = "해당 제품의 고유번호", required = true) String proNo) {
        ProductGetRes res = productService.getProductByProNo(proNo);
        if (res != null) {
            return ResponseEntity.status(200).body(res);
        }
        return new ResponseEntity<>("존재하지 않는 제품입니다.", HttpStatus.NOT_FOUND);
    }
}
