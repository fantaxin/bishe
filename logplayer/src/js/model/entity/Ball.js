/**
* @FilePath /src/js/model/entity/Ball.js
* @Description
* @Author wangxin
* @Date 2023-03-22 09:50:13
* @LastEditTime 2023-04-03 10:02:54
 */
export { Ball }

import { MovableObject } from './MovableObj.js';
import { EntityDefaultConfig, EntityName } from '../../util/Constants.js';

class Ball extends MovableObject {
    /**
    * @description:
    * @param {number} radius 球的半径
    * @return {void}
     */
    constructor(radius) {
        super(EntityName.Ball);
        this.radius = radius !== undefined ? radius : EntityDefaultConfig.Default_Ball_Radius;

        this.loadModel();
    }


    loadModel() {
        // TODO: ball model
    }

}
