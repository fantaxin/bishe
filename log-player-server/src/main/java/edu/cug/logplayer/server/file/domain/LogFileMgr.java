package edu.cug.logplayer.server.file.domain;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import edu.cug.logplayer.server.file.mapper.LogFileMapper;
import edu.cug.logplayer.server.file.model.LogFile;
import org.springframework.stereotype.Component;

/**
 * edu.cug.logplayer.server.file.domain.LogFileMgr
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/28]
 */
@Component
public class LogFileMgr extends ServiceImpl<LogFileMapper, LogFile> {

    public byte[] getLocalFile(){

    }

    public byte[] getNetFile(){

    }
}
