import { GameDescription } from "@/js/game/description/GameDescription";

/**
* @FilePath /src/js/model/entity/Field.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:19
* @LastEditTime 2023-03-28 16:42:38
 */
import { Object3D } from "three"
import { ObjectFactory } from "../loader/MeshFactory"

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

        this.obj = new Object3D();
        this.length = 105;
        this.width = 68;
        this.centerCircleRadius = 9.15;
        this.penaltyLength = 16.5;
        this.penaltyWidth = 40.3;
        this.penaltySpot = 11;
        this.goalAreaLength = 5.5;
        this.goalAreaWidth = 18.32;
        this.goalWidth = 14.02;
    }

    loadFieldModel() {
        this.loadField();
        this.loadLine();
    }

    loadField() {
        const field = ObjectFactory.createField();
        const land = ObjectFactory.createBorder();
        this.obj.add(field);
        this.obj.add(land);
    }

    loadLine() {

        // field border and half-line and corner spot
        const fieldBorder = ObjectFactory.createFieldBorder(this.length, this.width);

        // center circle and penalty arc
        const circle = ObjectFactory.createCircle(this.radius, this.penaltySpot, this.penaltyWidth, this.length);

        // penalty area and spot
        const penaltyArea = ObjectFactory.createPenaltyArea(this.penaltyLength, this.penaltyWidth, this.penaltySpot, this.length);

        // goal area
        const goalArea = ObjectFactory.createGoalArea(this.goalAreaLength, this.goalAreaWidth, this.length);

        //goal
        const goal = ObjectFactory.createGoal(this.goalWidth, this.length);

        this.obj.add(fieldBorder);
        this.obj.add(circle);
        this.obj.add(penaltyArea);
        this.obj.add(goalArea);
        this.obj.add(goal);
    }
}