import edu.cug.robo.log.GameLog;
import edu.cug.robo.log.parse.LogLoader;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import org.junit.Test;

/**
 * PACKAGE_NAME.LogLoaderTest
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogLoaderTest {

    @Test
    public void testLoadLog() {
        LogLoader logLoader = new LogLoader("D:\\a11406\\project2\\bishe\\log_file_reader\\src\\test\\resources\\a.replay");
        FutureTask<GameLog> futureTask = new FutureTask<>(logLoader);
        new Thread(futureTask).start();

        try {
            //TODO: 在此处进行处理，以便能够防止futureTask.get()阻塞主线程
            GameLog gameLog = futureTask.get();

            System.out.println(gameLog.getLogVersion());
            Thread.sleep(1000);//
            System.out.println(gameLog.getLogVersion());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

}
