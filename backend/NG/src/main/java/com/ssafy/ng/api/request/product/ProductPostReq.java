package com.ssafy.ng.api.request.product;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProductPostRequest")
public class ProductPostReq {

    @ApiModelProperty(name = "제품 고유 번호")
    String proNo;

    @ApiModelProperty(name = "제품 이미지 URL")
    String proUrl;
}
