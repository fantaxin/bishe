/**
* @FilePath /src/js/model/loader/MeshFactory.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:27:13
* @LastEditTime 2023-03-30 16:32:02
 */
export { }

export { MeshFactory }

import * as THREE from 'three'
import { GeoMatFactory } from '@/js/util/GeoMatFactory'
import { EntityDefaultConfig } from '@/js/util/Constants'
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
        mesh2.name = "toword";

        group.add(mesh);
        group.add(mesh2);

        return group;
    }

    static createFieldMain(length, width) {

        let geometry = new THREE.PlaneGeometry(length, width);

        //TODO: 根据不同的场地大小，调整为不同尺寸的场地贴图
        let texture = GeoMatFactory.loadTexture('field_roboviz.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.x = 10;
        //texture.repeat.y = 5;
        let material = new THREE.MeshLambertMaterial({ map: texture });

        //let material = new THREE.MeshBasicMaterial({ color: "#007732", side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;

        mesh.receiveShadow = true;

        return mesh;
    }

    static createFieldLand(length, width) {
        let borderLength = length + length / 6;
        let borderWidth = width + width / 6;

        let geometry = new THREE.PlaneGeometry(borderLength, borderWidth);
        let material = new THREE.MeshLambertMaterial({ color: "#2EB845", side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.01;
        mesh.rotation.x = -Math.PI / 2;

        mesh.receiveShadow = true;

        return mesh;

    }

    static createFieldGoal(goalWidth, goalHeight, goalradius, length = 110) {
        const geoArray = [];
        //const goalWidth = 7.32;
        //const goalHeight = 2.44;
        //const goalradius = 0.06;

        let geo1 = new THREE.CylinderGeometry(goalradius, goalradius, goalWidth + 4 * goalradius, 32);
        let geo2 = new THREE.CylinderGeometry(goalradius, goalradius, goalHeight + 2 * goalradius, 32);
        let geo3 = new THREE.CylinderGeometry(goalradius, goalradius, goalHeight + 2 * goalradius, 32);
        geo1.rotateX(Math.PI / 2);
        geo1.translate(0, goalHeight + goalradius, 0);
        geo2.translate(0, goalHeight / 2 + goalradius, -goalWidth / 2 - goalradius);
        geo3.translate(0, goalHeight / 2 + goalradius, goalWidth / 2 + goalradius);
        geoArray.push(geo1);
        geoArray.push(geo2);
        geoArray.push(geo3);

        let geo = mergeBufferGeometries(geoArray);
        let mat = new THREE.MeshLambertMaterial();

        let mesh1 = new THREE.Mesh(geo, mat);
        let mesh2 = new THREE.Mesh(geo, mat);

        mesh1.translateX(-length / 2);
        mesh2.translateX(length / 2);

        mesh1.castShadow = true;
        mesh2.castShadow = true;

        let group = new THREE.Group();
        group.add(mesh1);
        group.add(mesh2);

        group.castShadow = true;

        return group;

        /*
        var poleGeo = new THREE.BoxBufferGeometry(5, 375, 5);
        var poleMat = new THREE.MeshLambertMaterial();

        var mesh = new THREE.Mesh(poleGeo, poleMat);
        mesh.position.x = - 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);

        var mesh = new THREE.Mesh(poleGeo, poleMat);
        mesh.position.x = 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);

        var mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(255, 5, 5), poleMat);
        mesh.position.y = - 250 + (750 / 2);
        mesh.position.x = 0;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);

        var gg = new THREE.BoxBufferGeometry(10, 10, 10);
        var mesh = new THREE.Mesh(gg, poleMat);
        mesh.position.y = - 250;
        mesh.position.x = 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);

        var mesh = new THREE.Mesh(gg, poleMat);
        mesh.position.y = - 250;
        mesh.position.x = - 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        var clothTexture = GeoMatFactory.loadTexture('goalnet.png'); // 加载衣服图片或者迷宫图

        // anisotropy 沿着轴，通过具有最高纹素密度的像素的样本数。 默认情况下，这个值为1。设置一个较高的值将会产生比基本的mipmap更清晰的效果，代价是需要使用更多纹理样本
        clothTexture.anisotropy = 16;

        // 使用创建的clothTexture创建一种网格材质(一种非光泽表面的材质，没有镜面高光。)
        // map: 颜色贴图  类型为Texture
        // side: 定义将要渲染哪一面 - 正面，背面或两者
        // alpaTest: 透明度 设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。
        var clothMaterial = new THREE.MeshLambertMaterial({
            map: clothTexture,
            side: THREE.DoubleSide, // 两面都渲染
            alphaTest: 0.5
        });

        // cloth geometry

        let clothGeometry = new THREE.PlaneGeometry();

        // cloth mesh

        let object = new THREE.Mesh(clothGeometry, clothMaterial);
        object.position.set(0, 0, 0);
        object.castShadow = true;
        return object;
        */
    }

    static createFieldLines(length, width, radius, penaltySpot, penaltyLength, penaltyWidth, goalAreaLength, goalAreaWidth) {
        //const length = 110;
        //const width = 68;
        //const radius = 9.15;
        //const penaltySpot = 11;
        //const penaltyLength = 16.5;
        //const penaltyLength = 15.75;
        //const penaltyWidth = 40.3;
        //const goalAreaLength = 5.5;
        //const goalAreaLength = 5.25;
        //const goalAreaWidth = 18.32;
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, -width / 2, length + EntityDefaultConfig.DEFAULT_LINE_WIDTH, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(0, width / 2, length + EntityDefaultConfig.DEFAULT_LINE_WIDTH, true));
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength, 0, penaltyWidth + EntityDefaultConfig.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + penaltyLength / 2, -penaltyWidth / 2, penaltyLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - penaltyLength, 0, penaltyWidth + EntityDefaultConfig.DEFAULT_LINE_WIDTH, false));
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
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength, 0, goalAreaWidth + EntityDefaultConfig.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(-length / 2 + goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength, 0, goalAreaWidth + EntityDefaultConfig.DEFAULT_LINE_WIDTH, false));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, goalAreaWidth / 2, goalAreaLength, true));
        geoArray.push(GeoMatFactory.levelOrVerticalLine(length / 2 - goalAreaLength / 2, -goalAreaWidth / 2, goalAreaLength, true));
        return mergeBufferGeometries(geoArray);
    }

    static cylinderGeo(radius, width) { }

    static createFieldLines2() {

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