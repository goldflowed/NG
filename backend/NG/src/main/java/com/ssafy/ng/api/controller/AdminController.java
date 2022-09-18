package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.api.service.AdminService;
import com.ssafy.ng.common.customObject.CompanyList;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "관리자 API", tags = {"Admin"})
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    // 승인 요청한 기업 리스트 조회 =========================================================================================
    @GetMapping("/list")
    @ApiOperation(value = "기업 리스트", notes = "승인 요청한 기업 리스트를 페이지로 불러온다.")
    @ApiResponses({
           @ApiResponse(code = 200, message = "성공", response = CompanyList.class)
    })
    public ResponseEntity<?> companyList(
            @RequestBody @ApiParam(value = "기업정보", required = true) Pageable pageable) {
        return ResponseEntity.status(200).body(adminService.comList(pageable));
    }

    // 기업 승인 ========================================================================================================
    @PostMapping("/{comWallet}")
    @ApiOperation(value = "기업 승인여부", notes = "기업 승인여부를 DB에 반영한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 지갑주소")
    })
    public ResponseEntity<?> judgePermit(
            @PathVariable @ApiParam(value = "기업 지갑주소", required = true) String comWallet,
            @RequestBody @ApiParam(value = "승인 여부", required = true)CompanyPermitReq permitReq) {
        boolean res = adminService.permitCompany(comWallet, permitReq);
        if (res == false) {
            return new ResponseEntity<>("존재하지 않는 기업입니다.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }


}
