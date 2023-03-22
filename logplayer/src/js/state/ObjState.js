/**
* @FilePath /src/js/state/ObjState.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 16:16:29
* @LastEditTime 2023-03-22 16:59:21
 */
export { ObjState };

class ObjState {
    /**
    * @description: 
    * @param {number} x 
    * @param {number} y
    * @param {number} z
    * @param {number} qx
    * @param {number} qy
    * @param {number} qz
    * @param {number} qw
    */
    constructor(x = 0, y = 0, z = 0, qx = 0, qy = 0, qz = 0, qw = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.qx = qx;
        this.qy = qy;
        this.qz = qz;
        this.qw = qw;
    }

    get position() {
        return new THREE.Vector3(this.x, this.y, this.z);
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }

    get quaternion() {
        return new THREE.Quaternion(this.qx, this.qy, this.qz, this.qw);
    }

    set quaternion(quat) {
        this.qx = quat.qx;
        this.qy = quat.qy;
        this.qz = quat.qz;
        this.qw = quat.qw;
    }
}