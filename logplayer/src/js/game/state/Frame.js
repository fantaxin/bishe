/**
* @FilePath /src/js/game/state/Frame.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:52:18
* @LastEditTime 2023-04-06 16:37:52
 */
export { Frame };

import { GameMode } from "@/js/util/Constants.js";
import { AgentState } from "./AgentState";
import { BallState } from "./BallState";
import { ScoreState } from "./ScoreState";

class Frame {
    /**
    * @description: 
    * @param {number} time
    * @param {number} gameTime
    * @param {GameMode} gameMode
    * @param {ScoreState} scoreState
    * @param {BallState} ballState
    * @param {Array<AgentState>} leftAgentStates
    * @param {Array<AgentState>} rightAgentStates
     */
    constructor(time, gameTime, gameMode, scoreState, ballState, agentChange, leftAgentStates, rightAgentStates) {
        /**@type {number} */
        this.time = time;
        /**@type {number} */
        this.gameTime = gameTime;
        /**@type {GameMode} */
        this.gameMode = gameMode;
        /**@type {ScoreState} */
        this.scoreState = scoreState;
        /**@type {BallState} */
        this.ballState = ballState;
        /**@type {string} */
        this.agentChange = agentChange;
        /**@type {Array<AgentState>} */
        this.leftAgentStates = leftAgentStates;
        /**@type {Array<AgentState>} */
        this.rightAgentStates = rightAgentStates;
    }
}