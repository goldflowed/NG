package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.request.company.CompanyPermitReq;
import com.ssafy.ng.api.request.company.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.api.service.CompanyService;

import com.ssafy.ng.common.customObject.CompanyList;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api(value = "기업 API", tags = {"Company"})
@RestController
@RequestMapping("/api/v1/company")
@CrossOrigin(origins = {"https://localhost:3000",
        "https://j7e206.p.ssafy.io",
        "https://localhost:13000"}, allowCredentials = "true")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    // 기업정보 생성 =====================================================================================================
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "기업정보 생성", notes = "주어진 양식에 맞게 기업 정보를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> registCom(
            @RequestParam("comName") String comName,
            @RequestParam("comRegNum") String comRegNum,
            @RequestParam("comWallet") String comWallet,
            @RequestParam("comEmail") String comEmail,
            @RequestParam("comTel") String comTel,
            @RequestParam("comAddress") String comAddress,
            @RequestParam("comLogo")MultipartFile comLogo
    ){
        CompanyPostReq comInfo = new CompanyPostReq();
        comInfo.setComName(comName);
        comInfo.setComRegNum(comRegNum);
        comInfo.setComWallet(comWallet);
        comInfo.setComEmail(comEmail);
        comInfo.setComTel(comTel);
        comInfo.setComAddress(comAddress);
        comInfo.setComLogo(comLogo);
        companyService.createCompany(comInfo);
        return new ResponseEntity<>("기업등록이 완료되었습니다", HttpStatus.valueOf(200));
    }

    // 단일기업 정보조회 ==================================================================================================
    @GetMapping("/{comWallet}")
    @ApiOperation(value = "기업정보 조회", notes = "해당하는 기업에 대한 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 404, message = "존재하지 않는 기업입니다.")
    })
    public ResponseEntity<?> getComInfo(
            @PathVariable @ApiParam(value = "해당 기업의 시퀀스", required = true) String comWallet) {
        CompanyGetRes res = companyService.getCompanyByComWallet(comWallet);
        if (res != null) {
            return ResponseEntity.status(200).body(res);
        }
        return new ResponseEntity<> ("존재하지 않는 기업입니다.", HttpStatus.NOT_FOUND);
    }

    // 승인 요청한 기업 리스트 조회 =========================================================================================
    @PostMapping("/list/{comPermit}")
    @ApiOperation(value = "기업 리스트", notes = "승인 요청한 기업 리스트를 페이지로 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyList.class)
    })
    public ResponseEntity<?> companyList(
            @PathVariable @ApiParam(value = "승인상태(요청/거부/승인)", required = true) int comPermit) {
        return ResponseEntity.status(200).body(companyService.comList(comPermit));
    }

    // 기업 승인 ========================================================================================================
    @PostMapping("/permit/{comWallet}")
    @ApiOperation(value = "기업 승인여부", notes = "기업 승인여부를 DB에 반영한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 지갑주소")
    })
    public ResponseEntity<?> judgePermit(
            @PathVariable @ApiParam(value = "기업 지갑주소", required = true) String comWallet,
            @RequestBody @ApiParam(value = "승인 여부", required = true) CompanyPermitReq permitReq) {
        companyService.permitCompany(comWallet, permitReq);
        return ResponseEntity.status(200).body(null);
    }
}
