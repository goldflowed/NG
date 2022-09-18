package com.ssafy.ng.common.customObject;

import com.ssafy.ng.db.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyList {
    private String comName;

    public static CompanyList of(String comName) {
        CompanyList list = new CompanyList();
        list.setComName(comName);
        return list;
    }
}
