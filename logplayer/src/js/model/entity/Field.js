import { GameDescription } from "@/js/game/description/GameDescription";

/**
* @FilePath /src/js/model/entity/Field.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:19
* @LastEditTime 2023-03-30 17:41:32
 */
import { Group, Object3D } from "three"
import { MeshFactory } from "../loader/MeshFactory"
import { EntityName } from "@/js/util/Constants";

export { Field }

class Field {
    /**
    * @description: 
    * @param {GameDescription} gameDescription
     */
    constructor(gameDescription) {
        //let centerRadius = 9.15;
        //let goalSize = new THREE.Vector3(1.2, 14.64, 1.5);
        //let goalAreaSize = new THREE.Vector2(5.5, 18.32);//球门区
        //let penaltyAreaSize = new THREE.Vector3(16.5, 40.3, 11);//禁区

        this.group = new Group();
        this.group.name = EntityName.Field;
        this.length = 105;
        this.width = 68;
        this.centerCircleRadius = 9.15;
        this.penaltyLength = 16.5;
        this.penaltyWidth = 40.3;
        this.penaltySpot = 11;
        this.goalAreaLength = 5.5;
        this.goalAreaWidth = 18.32;
        this.goalWidth = 7.32;
        //this.goalWidth = 14.02;
        this.goalHeight = 2.44;
        this.goalradius = 0.06;
        this.loadModel();
    }

    loadModel() {
        const main = MeshFactory.createFieldMain(this.length, this.width);
        const land = MeshFactory.createFieldLand(this.length, this.width);
        const goal = MeshFactory.createFieldGoal(this.goalWidth, this.goalHeight, this.goalradius, this.length);
        const lines = MeshFactory.createFieldLines(this.length, this.width, this.radius, this.penaltySpot, this.penaltyLength, this.penaltyWidth, this.goalAreaLength, this.goalAreaWidth);

        main.name = EntityName.Main(this.group.name);
        land.name = EntityName.Model(this.group.name, "land");
        goal.name = EntityName.Model(this.group.name, "goal");
        lines.name = EntityName.Model(this.group.name, "lines");

        this.group.add(main);
        this.group.add(land);
        this.group.add(goal);
        this.group.add(lines);
    }
}