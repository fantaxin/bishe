package edu.cug.robo.log.parse;

import edu.cug.robo.log.GameLog;
import java.io.BufferedReader;
import java.util.concurrent.Semaphore;
import lombok.extern.slf4j.Slf4j;

/**
 * edu.cug.robo.log.parse.LogParser
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
//@Slf4j
public class LogParser implements Runnable{

    GameLog gameLog;
    BufferedReader br;

    Semaphore semaphore;

    public LogParser(GameLog gameLog, BufferedReader br, Semaphore semaphore) {
        this.gameLog = gameLog;
        this.br = br;
        this.semaphore = semaphore;
    }

    @Override
    public void run() {
        // TODO: 进行日志头的解析
        System.out.println("日志头解析完成");
        gameLog.setLogVersion(1);

        // TODO: 进行第一部分日志体的解析
        System.out.println("第一部分日志体解析完成");
        gameLog.setLogVersion(2);

        semaphore.release();

        // TODO: 进行剩余日志体的解析
        System.out.println("剩余日志体解析完成");
        gameLog.setLogVersion(3);

    }

}
