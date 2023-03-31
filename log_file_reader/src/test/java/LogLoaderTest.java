import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import edu.cug.robo.enums.PlayMode;
import edu.cug.robo.log.Game;
import edu.cug.robo.log.LogFrame;
import edu.cug.robo.log.LogPlayerState;
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
        LogLoader logLoader = new LogLoader("D:\\a11406\\project2\\bishe\\log\\2012final.replay");
        FutureTask<Game> futureTask = new FutureTask<>(logLoader);
        new Thread(futureTask).start();

        try {
            //TODO: 在此处进行处理，以便能够防止futureTask.get()阻塞主线程
            Game game = futureTask.get();

            System.out.println(game.getLogVersion());
            //Thread.sleep(4000);//
            System.out.println(game.getLogVersion());

            Game game2 = game;
            String json = JSON.toJSONString(game2);



            for (LogFrame f : game.getFrames()) {
                if(f.getGameMode()== PlayMode.play_on){
                    continue;
                }
                for (LogPlayerState playerState : f.getLeftAgentStates()) {
                    if(playerState.getFlag() != 9 && playerState.getFlag() != 1)
                        System.out.println(playerState.getFlag());
                }
                for (LogPlayerState playerState : f.getRightAgentStates()) {
                    if(playerState.getFlag() != 9 && playerState.getFlag() != 1)
                        System.out.println(playerState.getFlag());
                }
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

}
