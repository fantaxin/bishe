/**
* @FilePath /src/js/game/description/GameDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 16:07:35
* @LastEditTime 2023-03-23 16:21:43
 */
export { GameDescription }

import { GameType } from "@/js/util/Constants.js";

class GameDescription {
    constructor(gameType, environmentParams, agentParams, agentTypes) {

        /**@type {GameType} 2d还是3d*/
        this.gameType = gameType;

        /**@type {Map<string, number|string>} */
        this.environmentParams = environmentParams;
        /**@type {Map<string, number|string>} */
        this.agentParams = agentParams;

        /**@type {Array<Map<string, number|string>>} */
        this.agentTypes = agentTypes;
    }
}