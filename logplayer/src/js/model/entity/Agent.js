/**
* @FilePath /src/js/model/entity/Agent.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:05
* @LastEditTime 2023-03-30 17:32:11
 */
export { Agent }

import { AgentDescription } from "@/js/game/description/AgentDescription";
import { ObjState } from "@/js/game/state/ObjState";
import { MovableObject } from "./MovableObj";
import { AngleY, EntityName, TeamSide } from "@/js/util/Constants";
import { MeshFactory } from "../loader/MeshFactory";
import { Vector3 } from "three";

class Agent extends MovableObject {
    /**
    * @description: 
    * @param {AgentDescription} agentDiscription
     */
    constructor(agentDiscription) {
        // left_10
        super(EntityName.Agent(agentDiscription.side, agentDiscription.num));
        this.agentDiscription = agentDiscription;
        this.otherAgentParam = agentDiscription.otherAgentParam;
        this.agentType;

        //state
        this.state = 0x1;
        this.stamina = 8000;
        this.loadModel();
    }

    loadModel() {
        // TODO: 创造 model 时使用agentType
        const main = MeshFactory.createAgent();
        main.name = EntityName.Main(this.obj.name);
        this.obj.add(main);

        this.obj.position.set(this.side === TeamSide.LEFT ? -10 : 10, 0, (this.num - 5) * 3);
    }

    /**
    * @description: 
    * @param {AgentState} state
    * @param {AgentState} nextState
    * @param {*} t
    * @return {*}
     */
    updateState(state, nextState, t) {
        this.updatePosition(state, nextState);
        const diffAngleY = AngleY(nextState.x, nextState.z) - AngleY(state.x, state.z);
        let main = this.obj.getObjectByName(EntityName.Main(this.obj.name));
        //let towards = main.getObjectByName("towards");
        main.rotateY(diffAngleY);

        this.state = nextState.flag;
        this.stamina = nextState.stamina;
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