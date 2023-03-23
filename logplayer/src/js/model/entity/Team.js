/**
* @FilePath /src/js/model/entity/Team.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:35
* @LastEditTime 2023-03-23 17:09:58
 */
export { Team }

import { TeamDescription } from "@/js/game/description/TeamDescription"
import { TeamSide } from "@/js/util/Constants.js";
import { Object3D } from "three";

class Team {
    constructor(description, agents) {
        this.description = description;
        this.group = new Object3D();
        this.group.name = description.side === TeamSide.LEFT ? TeamSide.LEFT : TeamSide.RIGHT;
        this.agents = agents;
    }
}