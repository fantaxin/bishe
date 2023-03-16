package edu.cug.robo.log;

import edu.cug.robo.enums.PlayMode;

/**
 * edu.cug.robo.log.LogFrame
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogFrame {

    // 当前帧的全局时间
    double time;

    // 当前帧的比赛状态
    PlayMode gameState;

    // 当前帧的比分情况
    int leftScore = -1;
    int rightScore = -1;

    // 当前帧的球状态
    LBallState ballState;

    // 当前帧的球员状态
    LPlayerState[] l_playerStates;
    LPlayerState[] r_playerStates;

}

