/**
* @FilePath /src/js/test/Entity.js
* @Description 
* @Author wangxin
* @Date 2023-03-31 01:55:00
* @LastEditTime 2023-03-31 02:35:23
 */
export { }

import { MyEventTarget } from "./MyEventTarget";

export { Entity }

class Entity extends MyEventTarget {
    constructor(name) {
        super(name);
        //this.name = name;
    }

}