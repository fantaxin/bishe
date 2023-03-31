/**
* @FilePath /src/js/CameraController.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 09:07:07
* @LastEditTime 2023-03-22 17:00:52
 */
export { CameraController }

import { Vector3 } from "three";

class CameraController {
    /**
    * @description: 
    * @param {THREE.Camera} camera
    * @param {THREE.Renderer} canvas
    * @return {CameraController}
     */
    constructor(camera, canvas) {
        this.camera = camera;
        this.canvas = canvas;
        const scope = this;
        this.targetPos = new Vector3(0, 105, 0);
    }

}