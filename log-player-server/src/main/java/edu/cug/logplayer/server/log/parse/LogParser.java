package edu.cug.logplayer.server.log.parse;

import edu.cug.logplayer.server.log.Game;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.concurrent.Semaphore;

import lombok.SneakyThrows;

/**
 * edu.cug.robo.log.parse.LogParser
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
//@Slf4j
public class LogParser implements Runnable {

    Game gameLog;
    BufferedReader br;

    Semaphore semaphore;

    public LogParser(Game gameLog, BufferedReader br, Semaphore semaphore) {
        this.gameLog = gameLog;
        this.br = br;
        this.semaphore = semaphore;
    }

    @SneakyThrows
    @Override
    public void run() {
        try {
            String line = LogParseUtil.parseFileHeader(gameLog, br);
            System.out.println("日志头解析完成");

            //line = LogParseUtil.parseLogBody(gameLog,line,br,Integer.MAX_VALUE);

            LogParseUtil.parseLogBody(gameLog, line, br, Integer.MAX_VALUE);
            System.out.println("日志体解析完成");
        } catch (NullPointerException e) {

            System.out.println(br.readLine());
        }
        semaphore.release();
    }

}
