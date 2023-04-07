import { EntityName } from "@/js/util/Constants";
import { Group } from "three";
import { MeshFactory } from "../loader/MeshFactory";

/**
* @FilePath /src/js/model/environment/Environment.js
* @Description 
* @Author wangxin
* @Date 2023-04-07 11:25:57
* @LastEditTime 2023-04-07 11:31:10
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

        /**@type {Map<string, THREE.Mesh>} 所有已加载的场地*/
        this.fields = new Map();

        /**@type {string} 正在活动的天空盒*/
        this.activeSkyBox;

        /**@type {Array<string>} 正在活动的光的集合*/
        this.activeLights = new Array();

        /**@type {string>} 正在活动的场地*/
        this.activeField;
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
}
