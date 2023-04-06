/**
* @FilePath /src/js/game/state/ObjState.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 16:16:29
* @LastEditTime 2023-04-06 16:34:59
 */
export { ObjState };

import { Vector3, Quaternion } from "three";

class ObjState {

    constructor() {
        /**@type {number} */
        this.x;
        /**@type {number} */
        this.y;
        /**@type {number} */
        this.z;
        /**@type {number} */
        this.vx;
        /**@type {number} */
        this.vy;
        /**@type {number} */
        this.vz;
        /**@type {number} */
        this.qx;
        /**@type {number} */
        this.qy;
        /**@type {number} */
        this.qz;
        /**@type {number} */
        this.qw;
    }

    get position() {
        return new Vector3(this.x, this.y, this.z);
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }

    get quaternion() {
        return new Quaternion(this.qx, this.qy, this.qz, this.qw);
    }

    set quaternion(quat) {
        this.qx = quat.qx;
        this.qy = quat.qy;
        this.qz = quat.qz;
        this.qw = quat.qw;
    }
}