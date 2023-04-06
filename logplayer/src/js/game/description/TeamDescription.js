/**
* @FilePath /src/js/game/description/TeamDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 14:16:52
* @LastEditTime 2023-03-27 15:19:51
 */

import { AgentDescription } from "./AgentDescription";
import { TeamSide } from "@/js/util/Constants.js";

export { TeamDescription }
class TeamDescription {
    /**
    * @description: 
    * @param {string} name
    * @param {TeamSide} side
    * @param {THREE.Color} color
    * @param {Array<AgentDescription>} agentDiscriptions
     */
    constructor(name, side, color, agentDiscriptions) {

        /**@type {string} */
        this.name = name;

        /**@type {TeamSide} */
        this.side = side;

        /**@type {THREE.Color} */
        this.color = color;

        /**@type {Array<AgentDescription>} */
        this.agentDiscriptions = agentDiscriptions;
    }

}
