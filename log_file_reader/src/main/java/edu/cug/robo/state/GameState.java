package edu.cug.robo.state;

/**
 * edu.cug.robo.state.GameState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class GameState {
    /**
     * The global time when this state was reached.
     * 达到此状态的全局时间
     * @type {number}
     */
    int time;

    /**
     * The play mode string.
     * kick_off, play_on, foul_charge, free_kick, kick_in, goal, offside, time_over
     */
    String playMode;
}
