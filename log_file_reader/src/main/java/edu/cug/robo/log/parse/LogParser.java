package edu.cug.robo.log.parse;

import edu.cug.robo.log.GameLog;
import java.io.BufferedReader;
import java.util.concurrent.Semaphore;

import lombok.SneakyThrows;

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

    @SneakyThrows
    @Override
    public void run() {
        // TODO: 进行日志头的解析
        String line = LogParseUtil.parseFileHeader(gameLog, br);
        System.out.println("日志头解析完成");

        // TODO: 进行第一部分日志体的解析
        System.out.println("第一部分日志体解析完成");
        line = LogParseUtil.parseLogBody(gameLog,line,br,300);

        semaphore.release();

        // TODO: 进行剩余日志体的解析
        LogParseUtil.parseLogBody(gameLog,line,br,6000);
        System.out.println("剩余日志体解析完成");

    }

}
