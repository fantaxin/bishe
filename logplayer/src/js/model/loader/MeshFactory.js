/**
* @FilePath /src/js/model/loader/MeshFactory.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:27:13
* @LastEditTime 2023-03-29 18:19:15
 */
export { }

export { MeshFactory }

import * as THREE from 'three'
import { GeoMatFactory } from '@/js/util/GeoMatFactory'
import { Entity } from '@/js/util/Constants'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

class MeshFactory {

    constructor() {

    }

    static geometryCache = new Map();
    static materialCache = new Map();

    static createSkyBox(width = 1024, height = 1024, depth = 1024) {
        let name = "skyBox";
        const geometry = this.geometryCache.has(name) ? this.geometryCache.get(name) : new THREE.BoxGeometry(width, height, depth);
        const material = GeoMatFactory.skyBoxMaterial();

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

        let texture = GeoMatFactory.loadTexture('field.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 5;
        let material = new THREE.MeshBasicMaterial({ map: texture });

        //let material = new THREE.MeshBasicMaterial({ color: "#007732", side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        return mesh;
    }

    static createFieldLine() {
        const length = 105;
        const width = 68;
        const radius = 9.15;
        const penaltySpot = 11;
        //const penaltyLength = 16.5;
        const penaltyLength = 15.75;
        const penaltyWidth = 40.3;
        //const goalAreaLength = 5.5;
        const goalAreaLength = 5.25;
        const goalAreaWidth = 18.32;
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, -width / 2, length + Entity.DEFAULT_LINE_WIDTH, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, width / 2, length + Entity.DEFAULT_LINE_WIDTH, true));
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength, 0, penaltyWidth + Entity.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, -penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - penaltyLength, 0, penaltyWidth + Entity.DEFAULT_LINE_WIDTH, false));
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength, 0, goalAreaWidth + Entity.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength, 0, goalAreaWidth + Entity.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        return mergeBufferGeometries(geoArray);
    }

    static fieldGoalGeo(goalWidth, length) {

    }

    static createFieldLines() {

        let lineWidth = 0.15;
        let fieldDimensions = new THREE.Vector2(105, 68);
        let centerRadius = 9.15;
        let goalAreaDimensions = new THREE.Vector2(5.5, 18.32);
        let penaltyAreaDimensions = new THREE.Vector3(16.5, 40.3, 11);

        let material = new THREE.MeshBasicMaterial({ name: 'lineMat', color: 0xeeeeee, side: THREE.DoubleSide });
        material.depthTest = true;
        material.polygonOffset = true;
        material.polygonOffsetFactor = -1;
        material.polygonOffsetUnits = -1;

        let geoArray = [];

        const halfLength = fieldDimensions.x / 2;
        const halfWidth = fieldDimensions.y / 2;
        const halfLineWidth = lineWidth / 2;
        const halfGoalAreaWidth = goalAreaDimensions.y / 2;
        let tempX = 0;
        const mat = new THREE.Matrix4();

        /**
        * Helper function for simple merging of geometries.
        *
        * @param {number} x the x position value
        * @param {number} y the y position value
        * @param {number=} rotZ the z rotation (if not zero)
        */
        const mergeAt = function (x, y, rotZ = 0) {
            // Set matrix rotation
            if (rotZ) {
                mat.makeRotationZ(rotZ);
            } else {
                mat.identity();
            }

            // Set matrix position
            mat.elements[12] = x;
            mat.elements[13] = y;

            let geo = tempGeometry.clone();
            geo.rotateZ(rotZ);
            //geo.position = new THREE.Vector3(x, y, 0);
            geo.translate(x, y, 0);
            geoArray.push(geo);

            // Merge geometry
            //totalGeometry.merge(tempGeometry, mat);
        };


        // ---------- Center circle geometry
        let radius = centerRadius;
        let tempGeometry = new THREE.RingGeometry(radius - halfLineWidth, radius + halfLineWidth, 64, 1);

        mergeAt(0, 0);

        // ---------- Vertical field line geometry
        tempGeometry = new THREE.PlaneGeometry(lineWidth, fieldDimensions.y);

        // Left/Right border line
        mergeAt(-halfLength, 0);
        mergeAt(halfLength, 0);

        // Center line
        mergeAt(0, 0);


        // ---------- Horizontal field line geometry
        tempGeometry = new THREE.PlaneGeometry(fieldDimensions.x + lineWidth, lineWidth);

        // Top/Bottom border line
        mergeAt(0, -halfWidth);
        mergeAt(0, halfWidth);


        // ---------- Corner circle geometry
        radius = fieldDimensions.x / 105.0;
        tempGeometry = new THREE.RingGeometry(radius - halfLineWidth, radius + halfLineWidth, 8, 1, 0, Math.PI / 2);

        // Top left corner circle
        mergeAt(-halfLength, -halfWidth);

        // Top right corner circle
        mergeAt(halfLength, -halfWidth, Math.PI / 2);

        // Bottom right corner circle
        mergeAt(halfLength, halfWidth, Math.PI);

        // Bottom left corner circle
        mergeAt(-halfLength, halfWidth, -Math.PI / 2);


        // ---------- Center spot geometry
        tempGeometry = new THREE.CircleGeometry(lineWidth * 1.2, 16);
        mergeAt(0, 0);


        // Penalty area
        if (penaltyAreaDimensions !== null) {
            const halfPenaltyWidth = penaltyAreaDimensions.y / 2;
            tempX = halfLength - penaltyAreaDimensions.z;

            // Left/Right penalty kick spot
            mergeAt(-tempX, 0);
            mergeAt(tempX, 0);


            // ---------- Vertical penalty area line geometry
            tempGeometry = new THREE.PlaneGeometry(lineWidth, penaltyAreaDimensions.y + lineWidth);
            tempX = halfLength - penaltyAreaDimensions.x;

            // Left/Right penalty area front line
            mergeAt(-tempX, 0);
            mergeAt(tempX, 0);


            // ---------- Horizontal penalty area line geometry
            tempGeometry = new THREE.PlaneGeometry(penaltyAreaDimensions.x, lineWidth);
            tempX = halfLength - penaltyAreaDimensions.x / 2;

            // Left/Right penalty area top line
            mergeAt(-tempX, -halfPenaltyWidth);
            mergeAt(tempX, -halfPenaltyWidth);

            // Left/Right penalty area bottom line
            mergeAt(-tempX, halfPenaltyWidth);
            mergeAt(tempX, halfPenaltyWidth);


            // ---------- Penalty area arcs geometry
            const diffAngle = Math.acos((penaltyAreaDimensions.x - penaltyAreaDimensions.z) / centerRadius);
            tempGeometry = new THREE.RingGeometry(centerRadius - halfLineWidth, centerRadius + halfLineWidth, 32, 1, diffAngle, -2 * diffAngle);
            tempX = halfLength - penaltyAreaDimensions.z;

            // Left/Right penalty area arc
            mergeAt(-tempX, 0);
            mergeAt(tempX, 0, Math.PI);
        }


        // ---------- Vertical goal area lines geometry
        tempGeometry = new THREE.PlaneGeometry(lineWidth, goalAreaDimensions.y + lineWidth);
        tempX = halfLength - goalAreaDimensions.x;

        // Left/Right goal area front line
        mergeAt(-tempX, 0);
        mergeAt(tempX, 0);


        // ---------- Horizontal goal area lines geometry
        tempGeometry = new THREE.PlaneGeometry(goalAreaDimensions.x, lineWidth);
        tempX = halfLength - goalAreaDimensions.x / 2;

        // Left/Right goal area top line
        mergeAt(-tempX, -halfGoalAreaWidth);
        mergeAt(tempX, -halfGoalAreaWidth);

        // Left/Right goal area bottom line
        mergeAt(-tempX, halfGoalAreaWidth);
        mergeAt(tempX, halfGoalAreaWidth);


        // Create final buffer geometry from total geometry
        //const geometry = new THREE.BufferGeometry();
        //geometry.name = 'fieldLinesGeo';
        //geometry.(totalGeometry);

        let geometry = mergeBufferGeometries(geoArray)

        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x += Math.PI / 2;
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