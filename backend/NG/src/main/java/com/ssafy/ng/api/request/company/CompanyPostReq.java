package com.ssafy.ng.api.request.company;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("CompanyPostRequset")
public class CompanyPostReq {

    @ApiModelProperty(name = "기업 이름")
    String comName;

    @ApiModelProperty(name = "사업자 등록번호")
    String comRegNum;

    @ApiModelProperty(name = "기업 지갑주소")
    String comWallet;

    @ApiModelProperty(name = "기업 이메일")
    String comEmail;

    @ApiModelProperty(name = "기업 주소")
    String comAddress;

    @ApiModelProperty(name = "기업 전화번호")
    String comTel;

    @ApiModelProperty(name = "기업 로고")
    MultipartFile comLogo;

}
