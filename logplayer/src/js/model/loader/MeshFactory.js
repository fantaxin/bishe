/**
* @FilePath /src/js/model/loader/MeshFactory.js
* @Description
* @Author wangxin
* @Date 2023-03-27 16:27:13
* @LastEditTime 2023-04-13 14:39:22
 */

export { MeshFactory }

import * as THREE from 'three'
import { GeoMatFactory } from '@/js/model/loader/GeoMatFactory'
import {EntityDefaultConfig, EntityName, GeoMatName} from '@/js/util/Constants'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { b64_md5 } from '@/js/util/MD5';

class MeshFactory {

    /** @type {Map<String, THREE.BufferGeometry|THREE.Material>} 用于缓存Mesh级别的Geo和Mat*/
    static Cache = new Map();

    static createSkyBox(width = 1024, height = 1024, depth = 1024, name = GeoMatName.Mat_default) {
        const geometry = this.getGeoMat(THREE.BoxGeometry, [width, height, depth]);
        //TODO: 选择不同的材质
        let matName;
        matName = GeoMatName.Mat_Skybox_blueCloud;
        const material = this.getMultiGeoMat(GeoMatFactory.skyBoxMat, [matName]);

        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    static createAgent() {
        const redius = 0.6;
        const topredius = Math.sqrt(3) / 2 * redius;
        const bottomredius = 2 * topredius;
        const height = 3 / 2 * redius;
        const group = new THREE.Group();
        const geo1 = new THREE.CylinderGeometry(topredius, bottomredius, height, 32, 32);
        const geo2 = new THREE.SphereGeometry(redius, 32, 32);
        geo1.translate(0, 3 / 4 * redius, 0);
        geo2.translate(0, redius, 0);

        const arr = new Array();
        arr.push(geo1);
        arr.push(geo2);


        const geo = mergeBufferGeometries(arr);

        const mat = new THREE.MeshMatcapMaterial({ color: "#C5DEF7" });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = "main";


        const geo3 = new THREE.CylinderGeometry(topredius, topredius, height, 3, 32);
        geo3.rotateY(Math.PI / 2);
        geo3.translate((Math.sqrt(3) + 3) / 6 * redius, 3 / 4 * redius, 0);
        const mesh2 = new THREE.Mesh(geo3, new THREE.MeshMatcapMaterial({ color: "#436780" }));
        mesh2.name = "toward";

        group.add(mesh);
        group.add(mesh2);

        return group;
    }

    static createFieldMain(length, width) {
        let geometry = this.getGeoMat(THREE.PlaneGeometry, [length, width]);
        let material = this.getMultiGeoMat(GeoMatFactory.fieldMainMat, [length, width, GeoMatName.Mat_Field_default])

        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        return mesh;
    }

    static createFieldLand(length, width) {
        let borderLength = length + length / 6;
        let borderWidth = width + width / 6;

        let geometry = this.getGeoMat(THREE.PlaneGeometry, [borderLength, borderWidth]);
        let material = this.getGeoMat(THREE.MeshLambertMaterial, [{ color: "#2EB845", side: THREE.DoubleSide }]);

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.01;
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        return mesh;

    }

    static createFieldGoal(goalWidth, goalHeight, goalRadius, length = 110) {
        let geometry = this.getMultiGeoMat(GeoMatFactory.fieldGoalGeo, [goalWidth, goalHeight, goalRadius]);
        let material = this.getGeoMat(THREE.MeshLambertMaterial, [{ }]);

        let mesh1 = new THREE.Mesh(geometry, material);
        let mesh2 = new THREE.Mesh(geometry, material);

        mesh1.name = "goal_left";
        mesh2.name = "goal_right";
        mesh1.translateX(-length / 2);
        mesh2.translateX(length / 2);
        mesh1.castShadow = true;
        mesh2.castShadow = true;

        let group = new THREE.Group();
        group.add(mesh1);
        group.add(mesh2);

        group.castShadow = true;

        return group;
    }

    static createFieldLines(length, width, radius, penaltySpot, penaltyLength, penaltyWidth, goalAreaLength, goalAreaWidth) {
        const geoArray = [];
        geoArray.push(this.fieldBorderGeo(length, width));
        geoArray.push(this.fieldCirclePenaltyGeo(radius, penaltySpot, penaltyLength, penaltyWidth, length));
        geoArray.push(this.fieldGoalAreaGeo(goalAreaLength, goalAreaWidth, length));
        const geo = mergeBufferGeometries(geoArray);

        let material = new THREE.MeshBasicMaterial({ name: 'lineMat', color: 0xeeeeee, side: THREE.DoubleSide });
        material.depthTest = true;
        material.polygonOffset = true;
        material.polygonOffsetFactor = -1;
        material.polygonOffsetUnits = -1;

        const mesh = new THREE.Mesh(geo, material);
        mesh.rotation.x += Math.PI / 2;

        mesh.receiveShadow = true;
        return mesh;
    }

    // field border and half-line and corner spot
    static fieldBorderGeo(length, width) {
        const geoArray = [];
        // 底线
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2, 0, width, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2, 0, width, false));
        // 中线
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, 0, width, false));
        // 边线
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, -width / 2, length + EntityDefaultConfig.Default_Line_Width, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, width / 2, length + EntityDefaultConfig.Default_Line_Width, true));
        // 角球区
        geoArray.push(GeoMatFactory.ringLine(1, -length / 2, -width / 2, 0, Math.PI / 2));
        geoArray.push(GeoMatFactory.ringLine(1, -length / 2, width / 2, 3 * Math.PI / 2, Math.PI / 2));
        geoArray.push(GeoMatFactory.ringLine(1, length / 2, -width / 2, Math.PI / 2, Math.PI / 2));
        geoArray.push(GeoMatFactory.ringLine(1, length / 2, width / 2, Math.PI, Math.PI / 2));
        return mergeBufferGeometries(geoArray);
    }
    // center circle and penalty arc and penaltySpot and centerSpot
    static fieldCirclePenaltyGeo(radius, penaltySpot, penaltyLength, penaltyWidth, length) {
        const geoArray = [];
        // 禁区
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength, 0, penaltyWidth + EntityDefaultConfig.Default_Line_Width, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, -penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - penaltyLength, 0, penaltyWidth + EntityDefaultConfig.Default_Line_Width, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - penaltyLength / 2, penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - penaltyLength / 2, -penaltyWidth / 2, penaltyLength, true));

        // 中圈
        geoArray.push(GeoMatFactory.ringLine(radius));
        geoArray.push(GeoMatFactory.circleSpot(0, 0));

        const thetaLength = Math.acos((penaltyLength - penaltySpot) / radius) * 2;
        const thetaStart = Math.PI / 2 - thetaLength / 2;
        // 罚球弧
        geoArray.push(GeoMatFactory.ringLine(radius, -length / 2 + penaltySpot, 0, - thetaLength / 2, thetaLength));
        geoArray.push(GeoMatFactory.ringLine(radius, length / 2 - penaltySpot, 0, Math.PI / 2 + thetaStart, thetaLength));

        // 点球点
        geoArray.push(GeoMatFactory.circleSpot(-length / 2 + penaltySpot, 0));
        geoArray.push(GeoMatFactory.circleSpot(length / 2 - penaltySpot, 0));

        return mergeBufferGeometries(geoArray);
    }

    static fieldGoalAreaGeo(goalAreaLength, goalAreaWidth, length) {
        const geoArray = [];
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength, 0, goalAreaWidth + EntityDefaultConfig.Default_Line_Width, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength, 0, goalAreaWidth + EntityDefaultConfig.Default_Line_Width, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        return mergeBufferGeometries(geoArray);
    }

    static cylinderGeo(radius, width) { }

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

    /**
    * @description: 直接从构造函数创建的简单GeoMat
    * @param {(...param) => THREE.BufferGeometry|THREE.Material} type
    * @param {[]} params
    * @return {THREE.BufferGeometry|THREE.Material}
     */
    static getGeoMat(type, params) {
        const key = b64_md5(type.name + params.toString());
        if (!this.Cache.has(key)) {
            this.Cache.set(key, Reflect.construct(type, params));
        }
        return this.Cache.get(key);
    }

    /**
    * @description: 从GeoMatFactory中创建的复杂GeoMat
    * @param {(...param) => THREE.BufferGeometry|THREE.Material} func
    * @param {[]} params
    * @return {THREE.BufferGeometry|THREE.Material}
     */
    static getMultiGeoMat(func, params) {
        const key = b64_md5(func.toString() + params.toString());
        if (!this.Cache.has(key)) {
            this.Cache.set(key, func.apply(undefined, params));
        }
        return this.Cache.get(key);
    }

}
