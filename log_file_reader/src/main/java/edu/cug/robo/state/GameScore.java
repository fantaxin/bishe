package edu.cug.robo.state;

/**
 * edu.cug.robo.state.GameScore
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class GameScore {
    /**
     * The global time when this score was reached the first time.
     * @type {number}
     */
    int time;

    /**
     * The left team score.
     * @type {number}
     */
    int goalsLeft;

    /**
     * The left team penalty score.
     * 点球得分
     * @type {number}
     */
    //int penaltyScoreLeft = penaltyScoreLeft != null ? penaltyScoreLeft : 0;
    int penaltyScoreLeft;

    /**
     * The left team penalty misses.
     * 失点？
     * @type {number}
     */
    // int penaltyMissLeft = penaltyMissLeft != null ? penaltyMissLeft : 0;
    int penaltyMissLeft;

    /**
     * The right team score.
     * @type {number}
     */
    int goalsRight;

    /**
     * The right team penalty score.
     * @type {number}
     */
    //int penaltyScoreRight = penScoreRight !== undefined ? penScoreRight : 0;
    int penaltyScoreRight;

    /**
     * The right team penalty misses.
     * @type {number}
     */
    //int penaltyMissRight = penMissRight !== undefined ? penMissRight : 0;
    int penaltyMissRight;

}
