/**
* @FilePath /src/js/game/state/Frame.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:52:18
* @LastEditTime 2023-03-23 17:32:13
 */
export { Frame };

import { PlayMode } from "@/js/util/Constants.js";
import { AgentState } from "./AgentState";
import { BallState } from "./BallState";
import { ScoreState } from "./ScoreState";

class Frame {
    /**
    * @description: 
    * @param {number} time
    * @param {number} gameTime
    * @param {PlayMode} gameMode
    * @param {ScoreState} scoreState
    * @param {BallState} ballState
    * @param {Array<AgentState>} leftAgentStates
    * @param {Array<AgentState>} rightAgentStates
     */
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