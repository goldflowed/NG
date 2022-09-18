package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.api.service.CompanyService;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "기업 API", tags = {"Company"})
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    // 기업정보 생성 =====================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "기업정보 생성", notes = "주어진 양식에 맞게 기업 정보를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> registCom(
            @RequestBody @ApiParam(value = "기업정보", required = true) CompanyPostReq comInfo
//            @RequestPart(required = false) @ApiParam(value = "기업 로고 이미지 파일")MultipartFile file) throws IOException
    ){

        companyService.createCompany(comInfo);
        return new ResponseEntity<>("기업등록이 완료되었습니다", HttpStatus.valueOf(200));
    }

    // 단일기업 정보조회 ==================================================================================================
    @GetMapping("/{comSeq}")
    @ApiOperation(value = "기업정보 조회", notes = "해당하는 기업에 대한 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getComInfo(
            @PathVariable @ApiParam(value = "해당 기업의 시퀀스", required = true) String comWallet) {
        return ResponseEntity.status(200).body(companyService.getCompanyByComWallet(comWallet));
    }
}
