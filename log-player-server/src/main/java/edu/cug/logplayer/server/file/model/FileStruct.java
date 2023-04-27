package edu.cug.logplayer.server.file.model;

import java.util.Arrays;
import java.util.Date;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

/**
 * edu.cug.logplayer.server.file.model.FileStruct
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/27]
 */
@Setter
@Getter
public class FileStruct {
    long id;

    // 0：目录，1：文件
    int type;
    String url;
    long parent;
    Date createTime;
    double size; //B

    String getFileName(){
        String[] arr = url.split("/");
        return arr[arr.length-1];
    }
    String getParentUrl(){
        String[] arr = url.split("/");
        return Arrays.stream(arr).limit(arr.length-1).collect(Collectors.joining("/"));
    }
}
