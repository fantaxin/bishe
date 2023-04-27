import com.alibaba.fastjson.JSON;
import edu.cug.logplayer.server.LogPlayerServerApplication;
import edu.cug.logplayer.server.log.Game;
import edu.cug.logplayer.server.log.parse.LogLoader;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.stream.Collectors;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * PACKAGE_NAME.LogLoaderTest
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@SpringBootTest
public class LogLoaderTest {

    @Test
    public void testLoadLog() {
        //LogLoader logLoader = new LogLoader("E:\\wangxin\\file\\bishe\\log\\2012final.replay");
        LogLoader logLoader = new LogLoader("D:\\a11406\\project2\\bishe\\log\\2012final.replay");
        FutureTask<Game> futureTask = new FutureTask<>(logLoader);
        new Thread(futureTask).start();

        try {
            //TODO: 在此处进行处理，以便能够防止futureTask.get()阻塞主线程
            Game game = futureTask.get();

            String json = JSON.toJSONString(game);
            System.out.println(json);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void splitTest(){
        String url = "e/file/replay/2012/bb/groupa/vs.replay";
        String[] arr = url.split("/");
        System.out.println(Arrays.stream(arr).limit(arr.length - 1).collect(Collectors.joining("/")));
    }

}
