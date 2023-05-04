package edu.cug.logplayer.server.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Component
public class LogFileUtil {

    @Value("${file.base-local-url-root}")
    String rootUrl;

    @Value("${file.base-net-url}")
    String netBaseUrl;

    @Value("${file.base-net-url-root}")
    String netRootUrl;

    public String getFileName(String url){
        String[] arr = url.split("/");
        return arr[arr.length-1];
    }

    public String getParentUrl(String url){
        String[] arr = url.split("/");
        return Arrays.stream(arr).limit(arr.length-1).collect(Collectors.joining("/"));
    }

    public String Net2LocalUrl(String url){
        String[] arr = url.split("/");
        StringBuilder sb = new StringBuilder();
        return sb.append(rootUrl).append('/').append(
                Arrays.stream(arr).skip(4).collect(Collectors.joining("/"))).toString();
    }

    public String local2NetFullUrl(String url){
        String[] arr = url.split("/");
        StringBuilder sb = new StringBuilder();
        return sb.append(netBaseUrl).append(netRootUrl).append('/').append(
                Arrays.stream(arr).skip(2).collect(Collectors.joining("/"))
        ).toString();
    }

    public String Net2LocalFullUrl(String url){
        return "";
    }

    public boolean existLocalFile(String url){
        return false;
    }

    public boolean existNetFile(String url){
        return false;
    }
}
