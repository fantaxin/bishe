package edu.cug.robo.log;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.LogHeader
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */

@Getter
@Setter
@ToString
class LogHeader {

    // 系统环境参数
    private LogParams environmentParams;

    // 球员参数
    private LogParams playerParams;

    // 球员类型 size = playerParams.getParam("player_types")
    private LogParams[] playerTypes;
}
