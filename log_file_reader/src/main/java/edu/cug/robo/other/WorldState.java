package edu.cug.robo.other;

import edu.cug.robo.state.GameScore;
import edu.cug.robo.state.GameState;

/**
 * edu.cug.robo.other.WorldState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class WorldState {
    int time;
    int gameTime;
    GameState gameState;
    GameScore gameScore;

    /**
     * The state of the ball.
     * @type {!Array<number> | !Float32Array}
     */
    int[] ball;

    /**
     * The states of all left agents.
     * @type {!Array<!Array<number> | !Float32Array | undefined>}
     */
    int[][] leftAgentStateArrs;

    /**
     * The states of all right agents.
     * @type {!Array<!Array<number> | !Float32Array | undefined>}
     */
    int[][] rightAgentStateArrs;
}
