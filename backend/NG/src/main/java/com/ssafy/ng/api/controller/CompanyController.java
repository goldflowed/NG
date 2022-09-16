package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.api.service.CompanyService;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

@Api(value = "기업 API", tags = {"Company"})
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @PostMapping("/")
    @ApiOperation(value = "기업정보 생성", notes = "주어진 양식에 맞게 기업 정보를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> registCom(
            @RequestBody @ApiParam(value = "기업정보", required = true) CompanyPostReq comInfo) {
        companyService.createCompany(comInfo);
        return new ResponseEntity<>("기업등록이 완료되었습니다", HttpStatus.valueOf(200));
    }

    @GetMapping("/{comSeq}")
    @ApiOperation(value = "기업정보 생성", notes = "주어진 양식에 맞게 기업 정보를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getComInfo(
            @PathVariable @ApiParam(value = "해당 기업의 시퀀스", required = true) long comSeq) {
        CompanyGetRes res = companyService.getCompanyByComSeq(comSeq);
        return ResponseEntity.status(200).body(res);
    }
}
