package edu.cug.robo.log;

import edu.cug.robo.enums.TeamSide;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.LogPlayerState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@Getter
@Setter
@ToString
public class LogPlayerState {

    //TeamSide side;
    //int number = 0;
    int playerTypeIdx = -1;
    int flag = 0x0;
    double x = 0.0;
    double y = 0.0;
    //double z = 0.0;
    double vx = 0.0;
    double vy = 0.0;
    Double[] angles = new Double[3];
    //double heading_angle = 0.0;
    //double neck_angle = 0.0;
    //double joint_angle = 0.0;
    double stamina = 0;
}
