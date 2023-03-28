/**
* @FilePath /src/js/model/entity/Agent.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:05
* @LastEditTime 2023-03-28 10:37:47
 */
export { Agent }

import { AgentDescription } from "@/js/game/description/AgentDescription";
import { ObjState } from "@/js/game/state/ObjState";
import { MovableObject } from "./MovableObj";

class Agent extends MovableObject {
    /**
    * @description: 
    * @param {AgentDescription} agentDiscription
     */
    constructor(agentDiscription) {
        // left_10
        super(agentDiscription.side + "_" + agentDiscription.num);
        this.agentDiscription = agentDiscription;
        this.otherAgentParam = agentDiscription.otherAgentParam;
        this.agentType;

        //state
        this.state = 0x1;
        this.stamina = 8000;
    }

    set agentType(agentTypes) {
        this.agentType = agentTypes[this.agentTypeIdx];
    }

    get num() {
        return this.agentDiscription.num;
    }

    get side() {
        return this.agentDiscription.side;
    }

    get agentTypeIdx() {
        return this.agentDiscription.agentTypeIdx;
    }
}