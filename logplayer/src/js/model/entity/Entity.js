/**
* @FilePath /src/js/model/entity/Entity.js
* @Description 
* @Author wangxin
* @Date 2023-04-07 11:17:29
* @LastEditTime 2023-04-07 11:19:08
 */

export { Entity }

import { Group, Light } from "three"
import { GameDescription } from "../game/description/GameDescription";
import { TeamDescription } from "../game/description/TeamDescription.js";
import { EntityName } from "../util/Constants.js";
import { Ball } from "./entity/Ball";
import { Field } from "./entity/Field";
import { Team } from "./entity/Team";
import { Frame } from "../game/state/Frame";
import { MeshFactory } from "./loader/MeshFactory";

class Entity {
    /**
    * @description: 
    * @param {TeamDescription} leftTeamDescription
    * @param {TeamDescription} rightTeamDescription
     */

    constructor(leftTeamDescription, rightTeamDescription) {
        this.group = new Group();
        this.group.name = EntityName.World;

        this.leftTeamDescription = leftTeamDescription;
        this.rightTeamDescription = rightTeamDescription;

        this.ball;
        this.leftTeam;
        this.rightTeam;
    }

    createBall() {
        this.ball = new Ball();
        this.group.add(this.ball.obj);
    }

    createTeams() {
        this.leftTeam = new Team(this.leftTeamDescription);
        this.rightTeam = new Team(this.rightTeamDescription);
        this.group.add(this.leftTeam.group);
        this.group.add(this.rightTeam.group);

        this.leftTeam.agents.forEach(agent => {
            //agent.agentType = this.gameDescription.playerTypes;
        });
        this.rightTeam.agents.forEach(agent => {
            //agent.agentType = this.gameDescription.playerTypes;
        });
    }

    //TODO: 对world进行状态更新
    /**
    * @description: 
    * @param {Frame} frame
    * @param {Frame} nextFrame
    * @return {*}
     */
    updateEntity(frame, nextFrame, t) {
        this.ball.updatePosition(frame.ballState, nextFrame.ballState);
        this.leftTeam.updateState(frame.leftAgentStates, nextFrame.leftAgentStates, t);
        this.rightTeam.updateState(frame.rightAgentStates, nextFrame.rightAgentStates, t);
    }
}