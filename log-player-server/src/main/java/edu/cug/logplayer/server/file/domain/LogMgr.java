package edu.cug.logplayer.server.file.domain;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import edu.cug.logplayer.server.file.mapper.LogFileMapper;
import edu.cug.logplayer.server.file.model.LogFile;
import edu.cug.logplayer.server.utils.LogFileUtil;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * edu.cug.logplayer.server.file.domain.LogMgr
 * 操作数据库中的文件信息表
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/28]
 */
@Component
public class LogMgr extends ServiceImpl<LogFileMapper, LogFile> {

    @Resource
    private LogFileMapper logFileMapper;

    @Resource
    private LogFileUtil logFileUtil;

    public boolean addFile(LogFile logFile){
        LogFile parentFile = logFileMapper.selectOne(Wrappers.<LogFile>query().eq("url",logFile.getParentUrl()));
        logFile.setParentId(parentFile.getId());
        if(getByUrl(logFile.getUrl())!=null) {
            return false;
        }
        try{
            logFileMapper.insert(logFile);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public List<LogFile> getChildren(long id){
        return logFileMapper.selectList(Wrappers.<LogFile>query().eq("parent_id",id));
    }

    public LogFile getByUrl(String url){
        return logFileMapper.selectOne(Wrappers.<LogFile>query().eq("url", url));
    }



    public byte[] getLogFileByUrl(String url){
        // todo: 先查本地有没有
        if(false){}

        // todo: 如果本地没有请求网络中的
        String netUrl = logFileUtil.local2NetFullUrl(url);
        // todo: 先请求.replay.gz文件，如果没有再请求.replay文件然后压缩，并保存到本地

        return null;
    }

    public byte[] getNetFile(){
        return null;
    }
}
