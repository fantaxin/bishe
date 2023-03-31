package edu.cug.robo.log;

import edu.cug.robo.enums.PlayMode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * edu.cug.robo.log.LogFrame
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
@Getter
@Setter
@ToString
public class LogFrame {

    // 当前帧的全局时间
    double time;

    double gametime = 0.0;

    // 当前帧的比赛状态
    PlayMode gameMode;

    // 当前帧的比分情况
    //int leftScore = -1;
    //int rightScore = -1;
    LogScoreState scoreState;

    // 当前帧的球状态
    LogBallState ballState;

    // 当前帧的球员状态
    List<LogPlayerState> leftAgentStates;
    List<LogPlayerState> rightAgentStates;

}

