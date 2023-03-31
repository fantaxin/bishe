package edu.cug.robo.log;

import edu.cug.robo.enums.TeamSide;
import lombok.Getter;
import lombok.Setter;

/**
 * edu.cug.robo.log.LogAgent
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/31]
 */
@Getter
@Setter
public class LogAgent {
    int num;
    TeamSide side;
    int agentTypeIdx;
    LogParams otherAgentParam;
}
