/**
* @FilePath /src/js/model/World.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 13:32:13
* @LastEditTime 2023-03-23 17:29:13
 */
export { World }

import { Group } from "three"
import { GameDescription } from "../game/description/GameDescription";
import { TeamDescription } from "../game/description/TeamDescription";
import { EntityName } from "../util/Constants.js";
import { Ball } from "./entity/Ball";
import { Field } from "./entity/Field";
import { Team } from "./entity/Team";
import { Frame } from "../game/state/Frame";

class World {
    /**
    * @description: 
    * @param {GameDescription} gameDescription
    * @param {TeamDescription} teamDescription
     */
    constructor(gameDescription, teamDescription) {
        this.group = new Group();
        this.group.name = EntityName.World;
        this.gameDescription = gameDescription;
        this.teamDescription = teamDescription;

        //TODO: 创建world
        this.addField();
        this.addBall();
        this.addTeam();
        this.addTeam(EntityName.Agent());
    }

    addField() {
        const field = new Field();
        this.group.add(field);
    }

    addBall() {
        const ball = new Ball();
        this.group.add(ball);
    }

    addTeam() {
        const team = new Team();
        this.group.add(team);
    }

    //TODO: 对world进行状态更新
    updateWorld(frame) {
        this.group.getObjectByName(EntityName.Ball).position = 0;

    }
}