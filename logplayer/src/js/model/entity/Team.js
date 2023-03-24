/**
* @FilePath /src/js/model/entity/Team.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:35
* @LastEditTime 2023-03-24 17:30:42
 */
export { Team }

import { TeamDescription } from "@/js/game/description/TeamDescription.js"
import { AgentDiscription } from "@/js/game/description/AgentDescription.js"
import { TeamSide } from "@/js/util/Constants.js";
import { Object3D } from "three";
import { Agent } from "./Agent";

class Team {
    /**
    * @description: 
    * @param {TeamDescription} description
     */
    constructor(description) {
        this.description = description;
        this.group = new Object3D();
        this.group.name = this.getName();
        this.agents;
        this.createAgents(description.agentDiscriptions);

    }

    /**
    * @description: 
    * @param {Array<AgentDiscription>} agentDiscription
     */
    createAgents(agentDiscriptions){
        let length = agentDiscriptions.length;
        this.agents = new Array(length);
        let agent; 
        for (let i = 0; i < length; i++) {
            agent = new Agent(agentDiscriptions[i]);
            this.agents[i] = agent;
        }
    }

    get getName(){
        return this.description.name;
    }
    get getSide(){
        return this.description.side;
    }
    get getGroupName(){
        return this.group.name;
    }

}