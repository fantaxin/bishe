/**
* @FilePath /src/js/state/Game.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 13:46:32
* @LastEditTime 2023-03-23 14:24:43
 */
export { Game }

import { Frame } from "./state/Frame";
import { TeamDescription } from "./description/TeamDescription";
import { LogDescription } from "./description/logDescription";
import { GameDescription } from "./description/GameDescription";
import { ScoreState } from "./state/ScoreState";
import { PlayMode } from "../util/Constants.js";

class Game {
    constructor(logDescription, gameDescription, teamDescription, leftTeam, rightTeam, frames, scoreMoment, stateMoment) {

        /**@type {LogDescription} */
        this.logDescription = logDescription;

        /**@type {GameDescription} */
        this.gameDescription = gameDescription;

        /**@type {TeamDescription} */
        this.teamDescription = teamDescription;

        /**@type {TeamDescription} */
        this.leftTeam = leftTeam;
        /**@type {TeamDescription} */
        this.rightTeam = rightTeam;

        /**@type {Array<Frame>} */
        this.frames = frames;

        /**@type {Map<number, ScoreState>} */
        this.scoreMoment = scoreMoment;
        /**@type {Map<number, PlayMode>} */
        this.stateMoment = stateMoment;

    }
}