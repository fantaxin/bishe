import { EntityName } from "@/js/util/Constants";
import { Group, Light, Mesh, Object3D } from "three";
import { MeshFactory } from "../loader/MeshFactory";
import { Field } from "./Field";

/**
* @FilePath /src/js/model/environment/Environment.js
* @Description
* @Author wangxin
* @Date 2023-04-07 11:25:57
* @LastEditTime 2023-04-13 14:11:24
 */
export { Environment }

class Environment {
    constructor() {
        this.group = new Group();
        this.group.name = EntityName.Environment;

        /**@type {Map<string, THREE.Mesh>} 所有已加载的天空盒*/
        this.skyBoxes = new Map();

        /**@type {Map<string, THREE.Light>} 所有已加载的光*/
        this.lights = new Map();

        /**@type {Map<string, THREE.Mesh>} 所有已加载的球场*/
        this.stadiums = new Map();

        /**@type {Map<string, THREE.Mesh>} 所有已加载的场地*/
        this.fields = new Map();

        /**@type {Map<string, string|Set<string>>} 所有已加载的场地*/
        this.active = new Map();
        this.active.add(EntityName.BasicSkyBox, null);
        this.active.add(EntityName.BasicLight, new Set());
        this.active.add(EntityName.BasicStadium, null);
        this.active.add(EntityName.BasicField, null);
    }

    /**
     * @description: 创建环境Entity, 除第一次创建的以外, 默认不显示该Entity
     * @example createEntity(EntityName.SkyBox, xx.createSkyBox, [width, height, depth, fullName])
     * @param {string} fullName
     * @param {(obj:THREE.Object3D)=>void} func
     * @param {Array} params
     * @return {*}
     */
    createEntity(fullName, func, params) {
        if (fullName === undefined || fullName === null) {
            return false;
        }
        const basicName = EntityName.BasicName(fullName);
        if (!this.active.has(basicName)) {
            return false;
        }
        const map = this.belongToMap(fullName);
        if (map.has(fullName)) {
            return true;
        }
        func.apply(this, params);
        if (map.size() === 1) {
            this.active.set(EntityName.BasicSkyBox, fullName);
        } else {
            map.get(fullName).visible = false;
        }
    }

    /** 通过createEntity调用 */
    createSkyBox(width, height, depth, fullName) {
        let skyBox = MeshFactory.createSkyBox(width, height, depth, fullName);
        skyBox.name = fullName;

        this.group.add(skyBox);
        this.skyBoxes.set(fullName, skyBox);
    }

    //TODO: 根据需要选择不同的skybox/更换skybox的材质

    /** 通过createEntity调用 */
    createStadiums(fullName) {
        //TODO: 加载球场模型
    }

    /** 通过createEntity调用 */
    createField(length = 105, width = 68, radius = 9.15, penaltyLength = 16.5, penaltyWidth = 40.3, penaltySpot = 11,
        goalAreaLength = 5.5, goalAreaWidth = 18.32, goalWidth = 7.32, goalHeight = 2.44, goalradius = 0.06, fullName) {
        //goalWidth = 14.02;
        let field = new Field(length, width, radius, penaltyLength, penaltyWidth, penaltySpot,
            goalAreaLength, goalAreaWidth, goalWidth, goalHeight, goalradius, fullName);
        this.group.add(field.group);
        this.fields.set(fullName, field);
    }

    /**
    * @description: 在外部创建Light，通过createEntity调用本方法
    * @param {THREE.Light} light
    * @param {string} fullName
    * @return {*}
     */
    addLight(light, fullName) {
        if (!(light instanceof Light)) {
            return false;
        } else {
            light.name = fullName;
            this.group.add(light);
            this.lights.set(fullName, light);
        }
    }

    /**
    * @description:
    * @example activeOpt(fullName, xx.updateActive)
    * @param {string} fullName
    * @param {(string)=>boolean} func
    * @return {boolean}
     */
    activeOpt(fullName, func) {
        if (fullName === undefined || fullName === null) {
            return false;
        }
        const basicName = EntityName.BasicName(fullName);
        if (!this.active.has(basicName)) {
            return false;
        }
        return func.apply(this, [fullName]);
    }

    /** 通过activeOpt调用 */
    isActive(fullName) {
        const basicName = EntityName.BasicName(fullName);
        if (basicName === EntityName.BasicLight) {
            return this.active.get(basicName).has(fullName);
        }
        return this.active.get(basicName) === fullName;
    }

    /** 通过activeOpt调用 */
    updateActive(fullName) {
        const basicName = EntityName.BasicName(fullName);
        const obj = this.getObj(fullName);
        if (obj === null) {
            return false;
        }
        if (basicName === EntityName.BasicLight) {
            this.active.get(basicName).add(fullName);
        } else {
            const aobj = this.getActiveObj(basicName);
            if (aobj !== null) {
                this.getActiveObj(basicName).visible = false;
            }
            this.active.set(basicName, fullName);
        }
        obj.visible = true;
        return true;
    }

    /** 通过activeOpt调用 */
    removeActive(fullName) {
        const basicName = EntityName.BasicName(fullName);
        const aobj = this.getActiveObj(basicName);
        if (aobj !== null) {
            this.getActiveObj(basicName).visible = false;
        }
        if (basicName === EntityName.BasicLight) {
            return this.active.get(basicName).delete(fullName);
        }
        this.active.set(basicName, null);
        return true;
    }

    belongToMap(name) {
        const basicName = EntityName.BasicName(name);
        switch (basicName) {
            case EntityName.BasicSkyBox:
                return this.skyBoxes;
            case EntityName.BasicLight:
                return this.lights;
            case EntityName.BasicField:
                return this.fields;
            case EntityName.BasicStadium:
                return this.stadiums;
            default:
                return null;
        }
    }

    getActiveName(basicName) {
        return this.active.get(basicName);
    }

    getActiveObj(basicName) {
        const map = this.belongToMap(basicName);
        if (basicName === EntityName.BasicLight) {
            let lightmap = new Map();
            this.active.get(EntityName.BasicLight).forEach(
                (key) => {
                    lightmap.set(key, map.get(key));
                }
            )
            return lightmap;
        } else {
            return map.get(this.active.get(basicName));
        }
    }

    /**
     * @description:
     * @param {string} fullName
     * @return {THREE.Mesh|THREE.Light}
     */
    getObj(fullName) {
        const map = this.belongToMap(fullName);
        if (map.has(fullName)) {
            return map.get(fullName);
        }
        return null;
    }

}
