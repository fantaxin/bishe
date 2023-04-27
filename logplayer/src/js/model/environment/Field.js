/**
* @FilePath /src/js/model/environment/Field.js
* @Description
* @Author wangxin
* @Date 2023-03-22 09:50:19
* @LastEditTime 2023-04-13 10:57:51
 */
import { Group, Object3D } from "three"
import { MeshFactory } from "../loader/MeshFactory"
import { EntityName } from "@/js/util/Constants";

export { Field }

class Field {
    /**
     * @description:
     * @param {number} length 球场长（边线）
     * @param {number} width 球场宽（底线）
     * @param {number} radius 中圈和罚球弧的半径
     * @param {number} penaltyLength 禁区长（与边线平行）
     * @param {number} penaltyWidth 禁区宽（与底线平行）
     * @param {number} penaltySpot 点球点距底线距离
     * @param {number} goalAreaLength 球门区长（与边线平行）
     * @param {number} goalAreaWidth 球门区宽（与底线平行）
     * @param {number} goalWidth 球门宽
     * @param {number} goalHeight 球门高
     * @param {number} goalradius 球门柱半径
     * @param {string} name fullName
     * @return {number}
     */
    constructor(length , width, radius, penaltyLength, penaltyWidth, penaltySpot,
                goalAreaLength, goalAreaWidth, goalWidth, goalHeight, goalradius, name) {
        this.group = new Group();
        this.group.name = EntityName.Field(name);
        this.length = length;
        this.width = width;
        this.radius = radius;
        this.penaltyLength = penaltyLength;
        this.penaltyWidth = penaltyWidth;
        this.penaltySpot = penaltySpot;
        this.goalAreaLength = goalAreaLength;
        this.goalAreaWidth = goalAreaWidth;
        this.goalWidth = goalWidth;
        this.goalHeight = goalHeight;
        this.goalradius = goalradius;
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
