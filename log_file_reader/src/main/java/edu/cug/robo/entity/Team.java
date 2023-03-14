package edu.cug.robo.entity;

import edu.cug.robo.entity.Agent;
import edu.cug.robo.enums.TeamSide;
import lombok.Value;

/**
 * edu.cug.robo.entity.Team
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
@Value
public class Team {

    String name;

    String color;

    TeamSide side;

    //球员属性
    Agent[] agents;

}
