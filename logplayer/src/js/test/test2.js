/**
* @FilePath /src/js/test/test2.js
* @Description 
* @Author wangxin
* @Date 2023-04-07 11:54:04
* @LastEditTime 2023-04-07 15:31:46
 */

import * as THREE from 'three';
//import * as T from './test'
import { b64_md5, hex_md5 } from '../util/MD5';
import { GeoMatFactory } from '../model/loader/GeoMatFactory';
import { AAA } from "./test"
class BBB {
    constructor() {

    }
    static abc() {
        return "bbb";
    }
}

let type = THREE.BoxGeometry;
let type2 = BBB.abc;
console.log(type.toString())
let params = [100, 100, 100]
let md5 = b64_md5(type.name + params.toString)
type.toString
let md52 = b64_md5(type2.toString + params.toString)
console.log(md5);
console.log(md52);
//const geometry = Reflect.construct(type, params);
let func = GeoMatFactory.levelOrVerticalLine;
let aaa = Reflect.apply(func, undefined, [1, 2, 3, true])