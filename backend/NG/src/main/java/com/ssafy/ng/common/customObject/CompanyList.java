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
    private int comPermit;

    public static CompanyList of(String comName, String comWallet, int comPermit) {
        CompanyList list = new CompanyList();
        list.setComName(comName);
        list.setComWallet(comWallet);
        list.setComPermit(comPermit);
        return list;
    }
}
