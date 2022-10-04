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
    private String comWallet;

    public static CompanyList of(String comName, String comWallet) {
        CompanyList list = new CompanyList();
        list.setComName(comName);
        list.setComWallet(comWallet);
        return list;
    }
}
