package com.ssafy.ng.config;

import io.ipfs.api.IPFS;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value= ConfigurableBeanFactory.SCOPE_SINGLETON)
public class IPFSConfig {

    public IPFS ipfs;
    public IPFSConfig() {

        ipfs = new IPFS("/ip4/3.34.186.137/tcp/5001");
    }

}
