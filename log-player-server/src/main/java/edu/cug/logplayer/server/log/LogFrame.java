package edu.cug.logplayer.server.log;

import edu.cug.logplayer.server.utils.enums.GameMode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
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
    GameMode gameMode;

    // 当前帧的比分情况
    //int leftScore = -1;
    //int rightScore = -1;
    LogScoreState scoreState;

    // 当前帧的球状态
    LogBallState ballState;

    List<String> agentChange = new ArrayList<>();

    // 当前帧的球员状态
    List<LogAgentState> leftAgentStates;
    List<LogAgentState> rightAgentStates;

}

