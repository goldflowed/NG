package com.ssafy.ng.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "hello", description = "hello api")
@RequestMapping("/hello")
public class HelloController {
    @GetMapping("/")
    @Operation(summary = "hello~", description = "test")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    public ResponseEntity<String> hello(
            @Parameter(description = "이름", required = true) @RequestParam String name) {
        return ResponseEntity.ok("hello" + name);
    }
}
