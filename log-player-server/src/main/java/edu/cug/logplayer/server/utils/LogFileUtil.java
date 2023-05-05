package edu.cug.logplayer.server.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.zip.GZIPOutputStream;
import java.util.zip.GZIPInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class LogFileUtil {

    @Value("${file.base-local-url-root}")
    String rootUrl;

    @Value("${file.base-net-url}")
    String netBaseUrl;

    @Value("${file.base-net-url-root}")
    String netRootUrl;

    public String getFileName(String url) {
        String[] arr = url.split("/");
        return arr[arr.length - 1];
    }

    public String getBaseFileName(String url){
        return getFileName(url).split("\\.")[0];
    }

    public String getParentUrl(String url) {
        String[] arr = url.split("/");
        return Arrays.stream(arr).limit(arr.length - 1).collect(Collectors.joining("/"));
    }

    public String Net2LocalUrl(String url) {
        String[] arr = url.split("/");
        StringBuilder sb = new StringBuilder();
        return sb.append(rootUrl).append('/').append(
                Arrays.stream(arr).skip(4).collect(Collectors.joining("/"))).toString();
    }

    public String local2NetFullUrl(String url) {
        String[] arr = url.split("/");
        StringBuilder sb = new StringBuilder();
        return sb.append(netBaseUrl).append(netRootUrl).append('/').append(
                Arrays.stream(arr).skip(2).collect(Collectors.joining("/"))
        ).toString();
    }

    public String getFileUrl(String url){
        String[] arr = url.split("\\.")[0].split("/");
        return "/" + Arrays.stream(arr).skip(2).collect(Collectors.joining("/"));
    }

    public String Net2LocalFullUrl(String url) {
        return "";
    }

    public OutputStream compressFile(OutputStream outputStream) throws IOException {
        return new GZIPOutputStream(outputStream);
    }

    public InputStream decompressFile(InputStream inputStream) throws IOException {
        return new GZIPInputStream(inputStream);
    }

    public boolean existLocalFile(String url) {
        return Files.exists(Paths.get(url));
    }

    public boolean existNetFile(String url) {
        return false;
    }


}
