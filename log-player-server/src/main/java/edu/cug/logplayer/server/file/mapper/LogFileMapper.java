package edu.cug.logplayer.server.file.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import edu.cug.logplayer.server.file.model.LogFile;
import org.springframework.stereotype.Component;

/**
 * edu.cug.logplayer.server.file.mapper.LogFileMapper
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/28]
 */
@Component
public interface LogFileMapper extends BaseMapper<LogFile> {

}
