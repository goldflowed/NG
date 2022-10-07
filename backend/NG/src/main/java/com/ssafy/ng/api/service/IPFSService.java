package com.ssafy.ng.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface IPFSService {
    String saveFile(MultipartFile file);

    byte[] loadFile(String hash);
}
