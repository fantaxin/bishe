/**
* @FilePath /src/js/game/description/TeamDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 14:16:52
* @LastEditTime 2023-03-24 09:49:23
 */

import { AgentDescription } from "./AgentDescription";
import { TeamSide } from "@/js/util/Constants.mjs";

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
        this.name = name;
        this.side = side;
        this.color = color;
        this.agentDiscriptions = agentDiscriptions;
    }

}
