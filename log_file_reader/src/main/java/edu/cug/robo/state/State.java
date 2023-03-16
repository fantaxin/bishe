package edu.cug.robo.state;

/**
 * edu.cug.robo.state.State
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class State {
    /**
     * 达到此状态的全局时间
     */
    int time;

    /**
     * 到达此状态的游戏时间, 由于游戏暂停, 此时间可能小于time
     */
    int gameTime;

    /**
     * 当前时刻下的比分情况
     */
    GameScore gameScore;

    /**
     * 当前时刻下的比赛状态
     */
    GameState gameState;




}
