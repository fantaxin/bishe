/**
* @FilePath /src/js/model/loader/ObjectFactory.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:27:13
* @LastEditTime 2023-03-28 16:23:57
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

    static createField() {
        let size = new THREE.Vector2(105, 68);
        //let centerRadius = 9.15;
        //let goalSize = new THREE.Vector3(1.2, 14.64, 1.5);
        //let goalAreaSize = new THREE.Vector2(5.5, 18.32);//球门区
        //let penaltyAreaSize = new THREE.Vector3(16.5, 40.3, 11);//禁区

        let geometry = new THREE.PlaneGeometry(size.x, size.y);
        let material = new THREE.MeshBasicMaterial({ color: "#007732", side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        return mesh;
    }

    static createBorder() {
        let size = new THREE.Vector2(105, 68);
        let length = size.x + size.x / 6;
        let weigth = size.y + size.x / 6;

        let geometry = new THREE.PlaneGeometry(length, weigth);
        let material = new THREE.MeshBasicMaterial({ color: "#2EB845", side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.1;
        mesh.rotation.x = -Math.PI / 2;
        return mesh;

    }
    lineWidth = 0.15;

    // field border and half-line and corner spot
    static createFieldBorder(length, width) {

    }
    static createCircle(radius, penaltySpot, penaltyWidth, length) {

    }
    static createPenaltyArea(penaltyLength, penaltyWidth, penaltySpot, length) {

    }
    static createGoalArea(goalAreaLength, goalAreaWidth, length) {

    }
    static createGoal(goalWidth, length) {

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