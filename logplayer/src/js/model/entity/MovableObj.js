/**
* @FilePath /src/js/model/entity/MovableObj.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 10:15:44
* @LastEditTime 2023-03-28 11:10:09
 */
export { MovableObject }

import * as THREE from "three";

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
    }
}