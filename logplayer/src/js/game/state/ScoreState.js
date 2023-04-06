/**
* @FilePath /src/js/game/state/ScoreState.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:53:41
* @LastEditTime 2023-04-06 16:33:28
 */
export { ScoreState }

class ScoreState {
    /**
     * @param {number} goalsLeft
     * @param {number} goalsRight
     * @param {number=} penScoreLeft
     * @param {number=} penMissLeft
     * @param {number=} penScoreRight
     * @param {number=} penMissRight
     */
    constructor(goalsLeft, goalsRight, penScoreLeft, penMissLeft, penScoreRight, penMissRight) {

        //this.time = time;
        this.goalsLeft = goalsLeft;
        this.penaltyScoreLeft = penScoreLeft !== undefined ? penScoreLeft : 0;
        this.penaltyMissLeft = penMissLeft !== undefined ? penMissLeft : 0;
        this.goalsRight = goalsRight;
        this.penaltyScoreRight = penScoreRight !== undefined ? penScoreRight : 0;
        this.penaltyMissRight = penMissRight !== undefined ? penMissRight : 0;
    }
}