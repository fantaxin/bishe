/**
* @FilePath /src/js/model/entity/Agent.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:05
* @LastEditTime 2023-03-22 17:00:45
 */
export { Agent }

import { ObjState } from "@/js/game/state/ObjState";
import { MovableObject } from "./MovableObj";

class Agent extends MovableObject {
    constructor(name, num, side, stamina) {
        super(name);
        this.num = num;
        this.side = side;
        this.stamina = stamina;
    }



}