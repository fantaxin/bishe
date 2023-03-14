package edu.cug.robo.entity;

import edu.cug.robo.enums.TeamSide;
import java.util.Map;
import lombok.Value;

/**
 * edu.cug.robo.entity.Agent
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
@Value
public class Agent {

    int playerNumber;

    //agent's team side
    TeamSide side;

    //A list of player type indices, used by this agent
    //球员size
    Map[] playerTypes;

    //The index of the last used player type of this agent.
    int recentTypeIdx;

}
