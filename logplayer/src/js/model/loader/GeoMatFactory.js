/**
* @FilePath /src/js/model/loader/GeoMatFactory.js
* @Description
* @Author wangxin
* @Date 2023-03-27 16:36:11
* @LastEditTime 2023-04-07 16:00:52
 */
export { GeoMatFactory }

import * as THREE from 'three';
import {EntityDefaultConfig, EntityName, GeoMatName} from '../../util/Constants';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

let TextureLoader = null;
const TexturePath = '/textures/';

class GeoMatFactory {

    static fieldGoalGeo(goalWidth, goalHeight, goalRadius){
        const geoArray = [];

        let geo1 = new THREE.CylinderGeometry(goalRadius, goalRadius, goalWidth + 4 * goalRadius, 32);
        let geo2 = new THREE.CylinderGeometry(goalRadius, goalRadius, goalHeight + 2 * goalRadius, 32);
        let geo3 = new THREE.CylinderGeometry(goalRadius, goalRadius, goalHeight + 2 * goalRadius, 32);
        geo1.rotateX(Math.PI / 2);
        geo1.translate(0, goalHeight + goalRadius, 0);
        geo2.translate(0, goalHeight / 2 + goalRadius, -goalWidth / 2 - goalRadius);
        geo3.translate(0, goalHeight / 2 + goalRadius, goalWidth / 2 + goalRadius);
        geoArray.push(geo1);
        geoArray.push(geo2);
        geoArray.push(geo3);

        return mergeBufferGeometries(geoArray);


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

    static fieldMainMat(length, width, fieldMatName){
        let texture;
        switch(fieldMatName){
            case GeoMatName.Mat_Field_default:{
                texture = GeoMatFactory.loadTexture('field_roboviz.jpg');
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = Math.floor(length/10.5);
                texture.repeat.y = Math.round(width/13.5);
                return new THREE.MeshLambertMaterial({ map: texture });
            }
            default:{
                return new THREE.MeshBasicMaterial({ color: "#007732", side: THREE.DoubleSide });
            }
        }
    }

    static skyBoxMat(skyBoxMatName) {
        switch(skyBoxMatName){
            case GeoMatName.Mat_Skybox_blueCloud:{
                const texPosx = GeoMatFactory.loadTexture('sky_posx.jpg');
                const texNegx = GeoMatFactory.loadTexture('sky_negy.jpg');
                const texPosy = GeoMatFactory.loadTexture('sky_posy.jpg');
                const texNegy = GeoMatFactory.loadTexture('sky_negz.jpg');
                const texPosz = GeoMatFactory.loadTexture('sky_posz.jpg');
                const texNegz = GeoMatFactory.loadTexture('sky_negx.jpg');
                return [
                    new THREE.MeshBasicMaterial({ map: texPosx, side: THREE.BackSide }),
                    new THREE.MeshBasicMaterial({ map: texNegx, side: THREE.BackSide }),
                    new THREE.MeshBasicMaterial({ map: texPosy, side: THREE.BackSide }),
                    new THREE.MeshBasicMaterial({ map: texNegy, side: THREE.BackSide }),
                    new THREE.MeshBasicMaterial({ map: texPosz, side: THREE.BackSide }),
                    new THREE.MeshBasicMaterial({ map: texNegz, side: THREE.BackSide }),
                ];
            }
            default:{
                return [
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide }),
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide }),
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide }),
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide }),
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide }),
                    new THREE.MeshMatcapMaterial({ color: "#4CC2A8", side: THREE.DoubleSide })
                ];
            }
        }
    }

    static levelLine(x1, z1, x2, z2, mode) {
        const lineWidth = EntityDefaultConfig.Default_Line_Width;
        const length = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((z1 - z2), 2));
        const regularX = (x2 - x1) / length;
        const regularZ = (z2 - z1) / length;
        //TODO: 计算该点与x轴的夹角，并将该line旋转到正确角度
        const geometry = new THREE.PlaneGeometry(length, lineWidth);
        geometry.rotateX(Math.PI / 2);

        const material = new THREE.MeshBasicMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z += mode * lineWidth / 2;
        mesh.position.x += x1;
        mesh.position.z += z1;
    }
    static geoTranslate(geo, x, y, z = 0) {
        const geocopy = geo.copy();
        geocopy.translate(x, y, z);
        return geo;
    }

    /**
    * @description:
    * @param {*} x
    * @param {*} y
    * @param {*} length
    * @param {*} isLevel
    * @return {THREE.PlaneGeometry}
     */
    static levelOrVerticalLine(x, y, length, isLevel) {
        const a = isLevel ? length : EntityDefaultConfig.Default_Line_Width;
        const b = isLevel ? EntityDefaultConfig.Default_Line_Width : length;
        const geo = new THREE.PlaneGeometry(a, b);
        geo.name = "levelOrVerticalLine_" + length + "_" + isLevel;
        return geo.translate(x, y, 0);
    }

    static ringLine(radius, x = 0, y = 0, thetaStart = 0, thetaLength = Math.PI * 2) {
        let thetaSegments = 8 + 8 * Math.pow(2, Math.floor(Math.log2(radius)));
        const geo = new THREE.RingGeometry(radius - EntityDefaultConfig.Default_Line_Width / 2, radius + EntityDefaultConfig.Default_Line_Width / 2, thetaSegments, 1, thetaStart, thetaLength);
        return geo.translate(x, y, 0);
    }

    static circleSpot(x, y, radius = EntityDefaultConfig.Default_Line_Width * 1.2) {
        let segments = 16 + 8 * Math.pow(2, Math.floor(Math.log2(radius)));
        const geo = new THREE.CircleGeometry(radius, segments);
        return geo.translate(x, y, 0);
    }

    static loadTexture(path) {
        if (TextureLoader === null) {
            TextureLoader = new THREE.TextureLoader();
        }
        return TextureLoader.load(TexturePath + path);
    }
}

