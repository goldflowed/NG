package com.ssafy.ng.api.response;

import com.ssafy.ng.db.entity.Company;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CompanyGetResponse")
public class CompanyGetRes {

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

    public static CompanyGetRes of(Company com) {
        CompanyGetRes res = new CompanyGetRes();
        res.setComName(com.getComName());
        res.setComRegNum(com.getComRegNum());
        res.setComWallet(com.getComWallet());
        res.setComEmail(com.getComEmail());
        res.setComTel(com.getComTel());
        return res;
    }
}
