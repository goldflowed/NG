package com.ssafy.ng.api.response;

import com.ssafy.ng.db.entity.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProductGetResponse")
public class ProductGetRes {

    @ApiModelProperty(name = "제품 고유 번호")
    String proNo;

    @ApiModelProperty(name = "제품 이미지 URL")
    String proUrl;

    public static ProductGetRes of(Product pro) {
        ProductGetRes res = new ProductGetRes();
        res.setProNo(pro.getProNo());
        res.setProUrl(pro.getProUrl());
        return res;
    }
}
