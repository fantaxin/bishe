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
import { PlayMode } from "../util/Constants.js";

class Game {
    constructor(logPath) {
        this.logPath = logPath;

        /**@type {LogDescription} */
        this.logDescription;

        /**@type {GameDescription} */
        this.gameDescription;

        /**@type {TeamDescription} */
        this.leftTeam;
        /**@type {TeamDescription} */
        this.rightTeam;

        /**@type {Array<Frame>} */
        this.frames;

        /**@type {Map<number, ScoreState>} */
        this.scoreMoment;
        /**@type {Map<number, PlayMode>} */
        this.stateMoment;
    }

    set logType(logType) {
        this.logDescription.logType = logType;
    }

    get logType() {
        return this.logDescription.logType;
    }

    set logPath(logPath) {
        this.logDescription.logPath = logPath;
    }
    get logPath() {
        return this.logDescription.logPath;
    }
}
