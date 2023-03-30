/**
* @FilePath /src/js/util/GeoMatFactory.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:36:11
* @LastEditTime 2023-03-29 17:37:06
 */
export { GeoMatFactory }

import * as THREE from 'three';
import { EntityDefaultConfig } from './Constants';

let TextureLoader = null;
const TexturePath = '/textures/';

class GeoMatFactory {
    constructor() { }
    static geometryCache = new Map();
    static materialCache = new Map();
    static levelLine(x1, z1, x2, z2, mode) {
        const lineWidth = EntityDefaultConfig.DEFAULT_LINE_WIDTH;
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
        //TODO: 使用 geo cache 和 mat cache 来节约资源，在 agent 的创建中可能会有应用
        //const name = "levelOrVerticalLine_" + length + "_" + isLevel;
        //if (this.geometryCache.has(name)) {
        //    return this.geometryCache.get(name);
        //}
        const a = isLevel ? length : EntityDefaultConfig.DEFAULT_LINE_WIDTH;
        const b = isLevel ? EntityDefaultConfig.DEFAULT_LINE_WIDTH : length;
        const geo = new THREE.PlaneGeometry(a, b);
        geo.name = "levelOrVerticalLine_" + length + "_" + isLevel;
        return geo.translate(x, y, 0);
        //return geo;
    }

    static ringLine(radius, x = 0, y = 0, thetaStart = 0, thetaLength = Math.PI * 2) {
        let thetaSegments = 8 + 8 * Math.pow(2, Math.floor(Math.log2(radius)));
        const geo = new THREE.RingGeometry(radius - EntityDefaultConfig.DEFAULT_LINE_WIDTH / 2, radius + EntityDefaultConfig.DEFAULT_LINE_WIDTH / 2, thetaSegments, 1, thetaStart, thetaLength);
        return geo.translate(x, y, 0);
    }

    static circleSpot(x, y, radius = EntityDefaultConfig.DEFAULT_LINE_WIDTH * 1.2) {
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

    // left-top, right-bottom, center


    static skyBoxMaterial() {
        const texPosx = this.loadTexture('sky_posx.jpg');
        const texNegx = this.loadTexture('sky_negy.jpg');
        const texPosy = this.loadTexture('sky_posy.jpg');
        const texNegy = this.loadTexture('sky_negz.jpg');
        const texPosz = this.loadTexture('sky_posz.jpg');
        const texNegz = this.loadTexture('sky_negx.jpg');

        /*return [
            new THREE.MeshBasicMaterial({ map: texPosx, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: texNegx, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: texPosy, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: texNegy, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: texPosz, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: texNegz, side: THREE.BackSide }),
        ];*/
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

