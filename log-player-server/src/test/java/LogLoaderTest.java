import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import edu.cug.logplayer.server.LogPlayerServerApplication;
import edu.cug.logplayer.server.log.Game;
import edu.cug.logplayer.server.log.parse.LogLoader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * PACKAGE_NAME.LogLoaderTest
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@SpringBootTest(classes = LogPlayerServerApplication.class)
@RunWith(SpringRunner.class)
public class LogLoaderTest {
    @Resource
    private RestTemplate restTemplate;

    @Test
    public void RestTest(){
        List<String> folderRes = new LinkedList<>();
        List<String> fileRes = new LinkedList<>();

        String urlHead = "http://chaosscripting.net";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
//        headers.set("Accept-Encoding", "gzip");
        headers.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6");
        headers.set("Host", "chaosscripting.net");
        headers.set("Origin", "http://chaosscripting.net");
        headers.set("X-Requested-With", "XMLHttpRequest");
        headers.set("Connection", "keep-alive");
        headers.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39");
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("action", "get");
        map.add("items", "true");
        map.add("itemsWhat", "1");

        Queue<String> queue = new LinkedList<>();
        queue.add("/files/replays/2DSim/ChinaOpens/");
        folderRes.add("/files/replays/2DSim/ChinaOpens/");

        while(!queue.isEmpty()){
            String urlBody = queue.remove();
            String url = urlHead + urlBody;
            headers.set("Referer", url);
            map.add("itemsHref", urlBody);
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, request, String.class);
            String result = responseEntity.getBody();
            JSONObject obj = JSON.parseObject(result);
            JSONArray arr = obj.getJSONArray("items");
            assert arr != null;
            arr.forEach(json0->{
                JSONObject json = (JSONObject) json0;
                String herf = json.getString("absHref");
                if(json.containsKey("is_managed")&&json.getBoolean("is_managed")){
                    if((!urlBody.equals(herf))&&urlBody.equals(getParentUrl(herf))){
                        queue.add(herf);
                        folderRes.add(herf);
                    }
                }else{
                    String[] strings = herf.split("\\.");
                    String last = strings[strings.length-1];
                    if(last.equals("replay")){
                        fileRes.add(herf);
                    }
                }
            });
        }
        System.out.println("aaa");

    }
    private String getParentUrl(String url){
        String[] arr = url.split("/");
        return Arrays.stream(arr).limit(arr.length-1).collect(Collectors.joining("/"))+"/";
    }
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
