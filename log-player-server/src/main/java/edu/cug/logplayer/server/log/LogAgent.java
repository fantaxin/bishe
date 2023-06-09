package edu.cug.logplayer.server.log;

import edu.cug.logplayer.server.utils.enums.TeamSide;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.LogAgent
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/31]
 */
@Getter
@Setter
@ToString
public class LogAgent {
    int num;
    TeamSide side;
    int agentTypeIdx;
    ParamsMap otherAgentParam;
}
