package edu.cug.logplayer.server.log.parse;

import edu.cug.logplayer.server.log.Game;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.Callable;
import java.util.concurrent.Semaphore;
import lombok.Setter;

/**
 * edu.cug.robo.log.parse.LogLoader
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@Setter
public class LogLoader implements Callable<Game> {

    private String logPath;

    // 带缓冲的流读取，默认缓冲区8k
    private BufferedReader br;

    public LogLoader(String logPath) {
        this.logPath = logPath;
    }

    public LogLoader(BufferedReader br) {
        this.br = br;
    }

    @Override
    public Game call() {

        // 日志解析线程会持续修改该对象，直至解析完成
        Game gameLog = new Game(logPath);

        // 当日志解析线程完成第一部分解析时，释放信号量，该线程结束，日志解析线程继续执行
        Semaphore semaphore = new Semaphore(0);

        try {
            if(br==null){
                br = Files.newBufferedReader(Paths.get(logPath));
            }

            //启动日志解析线程
            Thread thread = new Thread(new LogParser(gameLog, br, semaphore));
            thread.start();

            // 等待日志解析线程完成第一部分解析
            semaphore.acquire();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return gameLog;
    }
}
