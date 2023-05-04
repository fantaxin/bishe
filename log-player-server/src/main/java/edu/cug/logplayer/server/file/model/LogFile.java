package edu.cug.logplayer.server.file.model;

import java.sql.Date;
import java.util.Arrays;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * edu.cug.logplayer.server.file.model.LogFile
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/27]
 */
@Setter
@Getter
@TableName("log_file")
public class LogFile {
    @TableId
    private long id;
    // 0：目录，1：文件
    private int type;
    private String url;
    private long parentId;
    private int size; //B
    private Date createTime;

    public String getFileName(){
        String[] arr = url.split("/");
        return arr[arr.length-1];
    }
    public String getParentUrl(){
        String[] arr = url.split("/");
        return Arrays.stream(arr).limit(arr.length-1).collect(Collectors.joining("/"));
    }
}
