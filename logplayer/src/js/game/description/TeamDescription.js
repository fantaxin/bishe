/**
* @FilePath /src/js/game/description/TeamDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 14:16:52
* @LastEditTime 2023-03-23 18:27:38
 */
//export { TeamDescription }

import { TeamSide } from "@/js/util/Constants.js";

export class TeamDescription {
    /**
    * @description: 
    * @param {string} name
    * @param {TeamSide} side
    * @param {THREE.Color} color
     */
    constructor(name, side, color) {
        this.name = name;
        this.side = side;
        this.color = color;
    }

}