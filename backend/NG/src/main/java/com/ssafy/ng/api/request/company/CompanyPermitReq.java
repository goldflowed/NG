package com.ssafy.ng.api.request.company;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CompanyPermitRequest")
public class CompanyPermitReq {

    // 2: 승인거부 3: 승인
    @ApiModelProperty(name = "승인 여부")
    int comPermit;
}
