package com.ssafy.ng.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CompanyPostRequset")
public class CompanyPostReq {

    @ApiModelProperty(name = "기업 이름")
    String comName;

    @ApiModelProperty(name = "사업자 등록번호")
    String comRegNum;

    @ApiModelProperty(name = "기업 이름")
    String comWallet;

    @ApiModelProperty(name = "기업 이름")
    String comEmail;

    @ApiModelProperty(name = "기업 이름")
    String comTel;
}
