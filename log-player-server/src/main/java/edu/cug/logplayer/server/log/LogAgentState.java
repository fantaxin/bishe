package edu.cug.logplayer.server.log;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.LogAgentState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@Getter
@Setter
@ToString
public class LogAgentState {

    //TeamSide side;
    //int number = 0;
    int agentTypeIdx = -1;
    int flag = 0x0;
    double x = 0.0;
    double y = 0.0;
    //double z = 0.0;
    double vx = 0.0;
    double vy = 0.0;
    Double[] angles = {0.0,0.0,0.0};
    //double heading_angle = 0.0;
    //double neck_angle = 0.0;
    //double joint_angle = 0.0;
    double stamina = 0;
}
