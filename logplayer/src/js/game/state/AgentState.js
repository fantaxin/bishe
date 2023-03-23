/**
* @FilePath /src/js/game/state/AgentState.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:50:06
* @LastEditTime 2023-03-23 17:32:07
 */
export { AgentState }

import { ObjState } from "./ObjState";

class AgentState extends ObjState {
    /**
    * @description: 
    * @param {number} flag 球员状态
    * @param {number} x 
    * @param {number} y
    * @param {number} z
    * @param {number} qx
    * @param {number} qy
    * @param {number} qz
    * @param {number} qw
    * @param {!Array<number>} angles 角度，heading_angle, neck_angle, joint_angle
    * @param {number} stamina 耐力值
     */
    constructor(flag = 0, x = 0, y = 0, z = 0, qx = 0, qy = 0, qz = 0, qw = 0, angles, stamina = 0) {
        super(x, y, z, qx, qy, qz, qw);
        this.flag = flag;
        this.angles = angles;
        this.stamina = stamina;
    }

}