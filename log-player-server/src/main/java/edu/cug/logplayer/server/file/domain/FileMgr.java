package edu.cug.logplayer.server.file.domain;

import com.alibaba.fastjson.JSON;
import edu.cug.logplayer.server.log.Game;
import edu.cug.logplayer.server.log.parse.LogLoader;
import edu.cug.logplayer.server.utils.LogConstant;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

@Component
public class FileMgr {

    @Value("${file.base-local-url}")
    String baseUrl;

    @Value("${file.base-local-url-root}")
    String rootUrl;

    @Value("${file.base-net-url}")
    String baseNetUrl;

    @Value("${file.base-net-url-root}")
    String rootNetUrl;

    /**
     * 保存文件到本地
     *
     * @param url 本地文件的基础地址，带后缀
     * @param in  本地文件的输入流
     */
    public void save2Local(String url, InputStream in) throws IOException {
        String localUrl = baseUrl + rootUrl + url;
        File file = new File(localUrl);
        if (createFileIfNotExist(file)) {
            FileOutputStream out = new FileOutputStream(file);
            writeStream(in, out);
        }
    }

    /**
     * 保存压缩文件到本地
     *
     * @param url 本地文件的基础地址，带文件后缀，不带压缩后缀
     * @param in  本地文件输入流
     */
    public void save2LocalWithZip(String url, InputStream in) throws IOException {
        String localUrl = baseUrl + rootUrl + url + LogConstant.COMPRESS_SUFFIX;
        File file = new File(localUrl);
        if (createFileIfNotExist(file)) {
            GZIPOutputStream out = new GZIPOutputStream(new FileOutputStream(file));
            writeStream(in, out);
        }
    }

    /**
     * 将文件输入流中的数据转化为json文件
     *
     * @param in 文件输入流
     * @return json数据
     */
    public String parse2Json(InputStream in, String url) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            LogLoader logLoader = new LogLoader(br, url);
            FutureTask<Game> futureTask = new FutureTask<>(logLoader);
            new Thread(futureTask).start();
            Game game = futureTask.get();
            return JSON.toJSONString(game);
        } catch (InterruptedException | ExecutionException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取本地文件
     *
     * @param url 本地文件的基础路径，需要带文件后缀
     * @return 文件输入流
     */
    public InputStream getLocalFile(String url) {
        String localUrl = baseUrl + rootUrl + url + LogConstant.COMPRESS_SUFFIX;
        File file = new File(localUrl);
        if (!file.exists()) {
            return null;
        }
        try {
            return new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取解压后本地文件
     *
     * @param url 本地文件的基础路径，需要带文件后缀，不带压缩后缀
     * @return 文件输入流
     */
    public InputStream getLocalFileWithUnzip(String url) {
        String localUrl = baseUrl + rootUrl + url + LogConstant.COMPRESS_SUFFIX;
        File file = new File(localUrl);
        if (!file.exists()) {
            return null;
        }
        try {
            return new GZIPInputStream(new FileInputStream(file));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取网络文件，返回压缩后的文件输入流
     *
     * @param path 不带后缀的基础文件路径
     * @return 压缩后的文件输入流
     */
    public InputStream getNetFile(String path) {
        String fullPath = baseNetUrl + rootNetUrl + path + LogConstant.REPLAY_FILE_SUFFIX + LogConstant.COMPRESS_SUFFIX;
        try {
            URL url = new URL(fullPath);
            URLConnection conn = url.openConnection();
            return conn.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 将输入流写入输出流
     *
     * @param in  输入流
     * @param out 输出流
     */
    public void writeStream(InputStream in, OutputStream out) throws IOException {
        try {
            byte[] b = new byte[1024];
            int len;
            while ((len = in.read(b)) > 0) {
                out.write(b, 0, len);
            }
        } finally {
            out.close();
            in.close();
        }
    }

    /**
     * 如果文件不存在，就创建该文件以及该文件的父级目录
     *
     * @param file 文件
     * @return 最后文件是否存在/创建成功
     */
    public boolean createFileIfNotExist(File file) {
        boolean suc = true;
        try {
            if (!file.getParentFile().exists()) {
                suc = file.getParentFile().mkdirs();
            }
            if (!file.exists()) {
                suc = suc && file.createNewFile();
            }
            return suc;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private HttpHeaders getDownloadHeaders(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Referer", url);
        headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
        headers.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6");
        headers.set("Host", "chaosscripting.net");
        headers.set("Origin", "http://chaosscripting.net");
        headers.set("X-Requested-With", "XMLHttpRequest");
        headers.set("Connection", "keep-alive");
        headers.set("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39");
        return headers;
    }
}
