/**
* @FilePath /src/js/model/entity/Team.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:35
* @LastEditTime 2023-03-28 11:09:41
 */
export { Team }

import { TeamDescription } from "@/js/game/description/TeamDescription.js"
import { AgentDiscription } from "@/js/game/description/AgentDescription.js"
import { TeamSide } from "@/js/util/Constants.js";
import { Group } from "three";
import { Agent } from "./Agent";

class Team {
    /**
    * @description: 
    * @param {TeamDescription} description
     */
    constructor(description) {
        this.description = description;
        this.group = new Group();
        this.group.name = this.name();

        /**@type {Array<Agent>} */
        this.agents;
        this.createAgents(description.agentDiscriptions);

    }

    /**
    * @description: 
    * @param {Array<AgentDiscription>} agentDiscriptions
     */
    createAgents(agentDiscriptions) {
        let length = agentDiscriptions.length;
        this.agents = new Array(length);
        let i = 0;
        agentDiscriptions.forEach(ad => {
            this.agents[i++] = new Agent(ad);
        })
    }

    get name() {
        return this.description.name;
    }
    get side() {
        return this.description.side;
    }
    get groupName() {
        return this.group.name;
    }

}