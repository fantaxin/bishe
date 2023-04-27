/**
* @FilePath /src/js/model/entity/MovableObj.js
* @Description
* @Author wangxin
* @Date 2023-03-22 10:15:44
* @LastEditTime 2023-04-04 18:14:18
 */
export { MovableObject }

import * as THREE from "three";
import { EntityName } from "@/js/util/Constants";

class MovableObject {
    /**
     * Construct
     * @param {string} name
     */
    constructor(name) {

        /** @type {THREE.Object3D} */
        this.obj = new THREE.Object3D();
        this.obj.name = name;

        //TODO: 可以选择某个对象进行特殊显示
        //this.selectObj = createSelectMesh(radius, halfLineWidth);
        //this.group.add(this.selectObj);
    }

    updateMainModel(main) {
        this.obj.add(main);
        main.name = EntityName.Main(this.obj.name);
    }

    addModel(model, name) {
        model.name = EntityName.Model(this.obj.name, name);
        this.obj.add(model);
    }

    /**
     * @param {boolean} selected}
     */
    //setSelected(selected){this.selectObj.visible = selected}

    /**
     * 更新对象的位置
     * @param {!ObjectState} state
     * @param {!ObjectState=} nextState
     * @param {number} t
     */
    updatePosition(state, nextState, t) {
        //TODO: 完成对对象坐标的更新
        this.obj.position.setX(state.x)
        this.obj.position.setZ(state.z)
        //this.obj.translateX(nextState.x - state.x);
        //this.obj.translateY(nextState.y - state.y);
        //this.obj.translateZ(nextState.z - state.z);
    }
}
