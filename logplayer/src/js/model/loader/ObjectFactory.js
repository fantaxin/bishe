/**
* @FilePath /src/js/model/loader/ObjectFactory.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:27:13
* @LastEditTime 2023-03-27 17:35:04
 */
export { }

export { ObjectFactory }

import * as THREE from 'three'
import * as SceneUtil from '@/js/util/SceneUtil'

class ObjectFactory {

    constructor() {

    }

    static geometryCache = new Map();
    static materialCache = new Map();

    static createSkyBox(width = 1024, height = 1024, depth = 1024) {
        let name = "skyBox";
        const geometry = this.geometryCache.has(name) ? this.geometryCache.get(name) : new THREE.BoxGeometry(width, height, depth);
        const material = SceneUtil.skyBoxMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        return mesh;
    }

    static createAmbientLight(name = "ambient", color = new THREE.Color("#EEEEEE"), intensity = 1) {
        let light = new THREE.AmbientLight(color, intensity);
        light.name = name;
        return light;
    }

    static createDirectonalLight(
        name = "sun",
        color = new THREE.Color("#EEEEEE"),
        intensity = 1,
        position = new THREE.Quaternion(300, 300, 300),
        castShadow = true,
        shadowWidth = 2048,
        shadowHeight = 2048
    ) {
        let light = new THREE.DirectionalLight(color, intensity);
        light.name = name;
        light.position.set(position);
        light.castShadow = castShadow;
        light.shadow.mapSize.width = shadowWidth;
        light.shadow.mapSize.height = shadowHeight;
        return light;
    }

}