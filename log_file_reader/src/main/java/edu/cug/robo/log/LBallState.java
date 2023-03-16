package edu.cug.robo.log;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.Value;

/**
 * edu.cug.robo.log.LBallState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */

@Setter
@Getter
@ToString
@Value
public class LBallState {

    double x = 0.0;

    double y = 0.0;

    double vx = 0.0;

    double vy = 0.0;

}
