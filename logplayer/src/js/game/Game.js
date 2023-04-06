/**
* @FilePath /src/js/game/Game.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 13:46:32
* @LastEditTime 2023-04-03 09:57:41
 */
export { Game }

import { Frame } from "./state/Frame";
import { TeamDescription } from "./description/TeamDescription.js";
import { LogDescription } from "./description/LogDescription";
import { GameDescription } from "./description/GameDescription";
import { ScoreState } from "./state/ScoreState";
import { GameMode } from "../util/Constants.js";

class Game {
    constructor() {

        this.logPath;

        /**@type {LogType} */
        this.logType;

        /**@type {int} */
        this.logVersion;

        /**@type {number} 播放的速度，每秒多少frame*/
        this.frequency;

        /**@type {Array<string>} */
        this.other;

        /**@type {GameType} 2d还是3d*/
        this.gameType;

        /**@type {Map<string, number|string>} */
        this.environmentParams;

        /**@type {Map<string, number|string>} */
        this.agentParams;

        /**@type {Array<Map<string, number|string>>} */
        this.agentTypes;

        /**@type {TeamDescription} */
        this.leftTeam;

        /**@type {TeamDescription} */
        this.rightTeam;

        /**@type {Array<Frame>} */
        this.frames;

        /**@type {Map<number, ScoreState>} */
        this.scoreMoment;

        /**@type {Map<number, GameMode>} */
        this.stateMoment;
    }
}
