import { EntityName } from "@/js/util/Constants";
import { Group, Light } from "three";
import { MeshFactory } from "../loader/MeshFactory";
import { Field } from "./Field";

/**
* @FilePath /src/js/model/environment/Environment.js
* @Description 
* @Author wangxin
* @Date 2023-04-07 11:25:57
* @LastEditTime 2023-04-12 18:28:14
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

        /**@type {string} 正在活动的天空盒*/
        this.activeSkyBox;

        /**@type {Set<string>} 正在活动的光的集合*/
        this.activeLights = new Set();

        /**@type {string>} 正在活动的场地*/
        this.activeField;

        /**@type {string>} 正在活动的球场*/
        this.activeStadium;
    }

    createSkyBox(width, height, depth, skyBoxName) {
        let name = EntityName.SkyBox(skyBoxName);
        if (this.skyBoxes.has(name)) {
            return true;
        }
        let skyBox = MeshFactory.createSkyBox(width, height, depth, name);
        if (skyBox === undefined) {

        }
        skyBox.name = name;
        this.group.add(skyBox);
        if (this.skyBoxes.size() === 1) {
            this.activeSkyBox = name
        }
    }

    setActiveSkyBox(skyBoxName) {
        if (this.activeSkyBox === undefined) {

        }
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

    addActiveLight(name) {
        this.lights.get()
    }

    removeActiveObj(name) {
        const obj = this.getObj(name);
        const activeName = EntityName.BasicName(name);
        if (obj !== null) {
            obj.visible = false;
            if (activeName === EntityName.BasicLight) {
                this.active.get(activeName).delete(name);
            } else {
                this.active.get(activeName)
            }
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
        this.field = new Field(this.gameDescription);
        this.group.add(this.field.group);

    }

    getObj(name) {
        const map = this.belongToMap(name);
        if (map.has(name)) {
            return map.get(name);
        }
        return null;
    }

    isActive(name) {
        if (name === null) {
            return false;
        }
        const basicName = EntityName.getBasicName(name);
        if (!this.active.has(basicName)) {
            return false;
        }
        if (basicName === EntityName.BasicLight) {
            return this.active.get(basicName).has(name);

        }
        return this.active.get(basicName) === name;
    }

    addActive(name) {
        if (name === null) {
            return false;
        }
        const basicName = EntityName.getBasicName(name);
        if (!this.active.has(basicName)) {
            return false;
        }
        if (basicName === EntityName.BasicLight) {
            this.active.get(basicName).add(name);
        }
        this.active.set(basicName, name);
        return true;
    }

    removeActive(name) {
        if (name === null) {
            return false;
        }
        const basicName = EntityName.getBasicName(name);
        if (!this.active.has(basicName)) {
            return false;
        }
        if (basicName === EntityName.BasicLight) {
            return this.active.get(basicName).delete(name);
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

    /**
    * @description: 
    * @param {string} name
    * @param {(obj:THREE.Object3D)} func
    * @param {Array} params
    * @return {*}
     */
    getAndOperate(name, func, params) {
        if (!this.map.has(name)) {
            return;
        }
        return func.apply(this, params);
    }
}
