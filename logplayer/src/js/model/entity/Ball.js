/**
* @FilePath /src/js/model/entity/Ball.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:50:13
* @LastEditTime 2023-03-22 17:01:35
 */
export { Ball }

import { MovableObject } from './MovableObj.js';
import { Entity } from '../../util/Constants.js';

class Ball extends MovableObject {
    /**
    * @description: 
    * @param {number} radius 球的半径
    * @return {void}
     */
    constructor(radius) {
        super('ball');
        this.radius = radius !== undefined ? radius : Entity.DEFAULT_BALL_RADIUS;

        //默认的球的半径是1，现在半径为r，相当于缩放为原来的r倍
        this.group.scale.setScalar(this.radius);
    }

    setRadius(radius) {
        if (this.radius !== radius) {
            this.radius = radius;
            this.group.scale.setScalar(this.radius);
        }
    }

}