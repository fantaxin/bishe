/**
* @FilePath /src/js/model/World.js
* @Description 该类是场景中各种实体、光、天空盒的抽象的集合，负责对其进行添加和删除，
*              可以递归创建Entity，但不涉及对Object3D的更新和创建
* @Author wangxin
* @Date 2023-03-22 13:32:13
* @LastEditTime 2023-04-06 17:42:11
 */
export { World }

import { Group, Light } from "three"
import { GameDescription } from "../game/description/GameDescription";
import { TeamDescription } from "../game/description/TeamDescription.js";
import { EntityName } from "../util/Constants.js";
import { Ball } from "./entity/Ball";
import { Field } from "./environment/Field";
import { Team } from "./entity/Team";
import { Frame } from "../game/state/Frame";
import { MeshFactory } from "./loader/MeshFactory";

class World {
    /**
    * @description:
    * @param {GameDescription} gameDescription
    * @param {TeamDescription} teamDescription
     */

    constructor(leftTeamDescription, rightTeamDescription) {
        this.group = new Group();
        this.group.name = EntityName.World;

        this.leftTeamDescription = leftTeamDescription;
        this.rightTeamDescription = rightTeamDescription;

        this.ball;
        this.leftTeam;
        this.rightTeam;

        this.field;

        /**@type {Map<string, Light>} */
        this.lights = new Map();

        this.skyBox;

        //TODO: 创建world, 交由外部进行创建
    }

    createSkyBox(width, height, depth) {
        this.skyBox = MeshFactory.createSkyBox(width, height, depth);
        this.skyBox.name = EntityName.Model(this.group.name, "skybox");
        this.group.add(this.skyBox);
    }

    addLight(name, light) {
        if (!(light instanceof Light) || this.lights.has(name)) {
            return false;
        } else {
            light.name = EntityName.Model(this.group.name, name);
            this.lights.set(name, light);
            this.group.add(light);
        }
    }

    getLight(name) {
        if (this.lights.has(name)) {
            return this.lights.get(name);
        } else {
            return null;
        }
    }

    deleteLight(name) {
        if (this.lights.has(name)) {
            this.lights.delete(name);
            this.group.remove()
        }
    }

    createField() {
        let fieldParams = new Map();
        fieldParams.set("length", 105);
        fieldParams.set("width", 68);
        fieldParams.set("centerCircleRadius", 9.15);
        fieldParams.set("penaltyLength", 16.5);
        fieldParams.set("penaltyWidth", 40.3);
        fieldParams.set("penaltySpot", 11);
        fieldParams.set("goalAreaLength", 5.5);
        fieldParams.set("goalAreaWidth", 18.32);
        fieldParams.set("goalWidth", 7.32);
        fieldParams.set("goalHeight", 2.44);
        fieldParams.set("goalradius", 0.06);
        //this.goalWidth = 14.02;
        this.field = new Field(105, 68, 9.15, 16.5, 40.3, 11, 5.5,
            18.32, 7.32, 2.44, 0.06, "mainField");
        this.group.add(this.field.group);

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
    updateWorld(frame, nextFrame, t) {
        //this.ball.updatePosition(frame.ballState, nextFrame.ballState);
        this.leftTeam.updateState(frame.leftAgentStates, nextFrame.leftAgentStates, t);
        this.rightTeam.updateState(frame.rightAgentStates, nextFrame.rightAgentStates, t);
        //this.group.getObjectByName(EntityName.Ball).position = 0;
        //this.group.getObjectByName()

    }
}
