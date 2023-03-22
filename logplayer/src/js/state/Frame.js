/**
* @FilePath /src/js/state/Frame.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:52:18
* @LastEditTime 2023-03-22 17:08:54
 */
export { Frame }

import { AgentState } from "./AgentState"
import { BallState } from "./BallState"
import { ScoreState } from "./ScoreState"

class Frame {
    constructor(time, gameTime, gameMode, scoreState, ballState, leftAgentStates, rightAgentStates) {
        this.time = time;
        this.gameTime = gameTime;
        this.gameMode = gameMode;
        this.scoreState = scoreState;
        this.ballState = ballState;
        this.leftAgentStates = leftAgentStates;
        this.rightAgentStates = rightAgentStates;
    }
}