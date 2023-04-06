package edu.cug.logplayer.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * edu.cug.logplayer.server.controller.TestController
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/06]
 */
@RestController
@RequestMapping("/api")
public class TestController {

    @RequestMapping
    public String api() {
        return "111";
    }

    @RequestMapping(method = {RequestMethod.GET}, path = "/test")
    public String testApi(){
        return"123";
    }
}
