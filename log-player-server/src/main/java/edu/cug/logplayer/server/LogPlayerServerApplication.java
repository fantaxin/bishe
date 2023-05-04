package edu.cug.logplayer.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * edu.cug.logplayer.server.LogPlayerServerApplication
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/06]
 */
@SpringBootApplication
@MapperScan(basePackages = {"edu.cug.logplayer.server.file.mapper"})
public class LogPlayerServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LogPlayerServerApplication.class, args);
    }

}
