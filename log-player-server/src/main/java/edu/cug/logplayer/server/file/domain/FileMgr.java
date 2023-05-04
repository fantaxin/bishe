package edu.cug.logplayer.server.file.domain;

import com.alibaba.fastjson.JSON;
import edu.cug.logplayer.server.log.Game;
import edu.cug.logplayer.server.log.parse.LogLoader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

@Component
public class FileMgr {

    public boolean save2Local() {

    }

    public boolean saveJson2Local(String json, String url) {
        try {
            Files.write(Paths.get(url), json.getBytes());
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String parse2Json(MultipartFile file) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
        LogLoader logLoader = new LogLoader(br);
        FutureTask<Game> futureTask = new FutureTask<>(logLoader);
        new Thread(futureTask).start();
        try {
            Game game = futureTask.get();
            return JSON.toJSONString(game);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public File getLocalFile(String url) {
        File file = new File(url);
        if(file.exists()){
            return file;
        }
        return null;
    }

    public boolean getLocalJsonFile() {

    }

    public boolean getNetFile(String url) {

    }
}
