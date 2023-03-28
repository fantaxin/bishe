/**
* @FilePath /src/js/util/SceneUtil.js
* @Description 
* @Author wangxin
* @Date 2023-03-27 16:36:11
* @LastEditTime 2023-03-28 17:52:41
 */
export { }

import * as THREE from 'three';
import { Entity } from './Constants';

let TextureLoader = null;
const TexturePath = '/textures/';

export function loadTexture(path) {
    if (TextureLoader === null) {
        TextureLoader = new THREE.TextureLoader();
    }

    return TextureLoader.load(TexturePath + path);
}

// left-top, right-bottom, center
export function levelLine(x1, z1, x2, z2, mode) {
    const lineWidth = Entity.DEFAULT_LINE_WIDTH;
    const length = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((z1 - z2), 2));
    const regularX = (x2 -x1)/length;
    const regularZ = (z2 -z1)/length;
    //TODO: 计算该点与x轴的夹角，并将该line旋转到正确角度
    const geometry = new THREE.PlaneGeometry(length, lineWidth);
    geometry.rotateX(Math.PI / 2);

    const material = new THREE.MeshBasicMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z += mode * lineWidth / 2;
    mesh.position.x += x1;
    mesh.position.z += z1;
}

export function skyBoxMaterial() {
    const texPosx = loadTexture('sky_posx.jpg');
    const texNegx = loadTexture('sky_negy.jpg');
    const texPosy = loadTexture('sky_posy.jpg');
    const texNegy = loadTexture('sky_negz.jpg');
    const texPosz = loadTexture('sky_posz.jpg');
    const texNegz = loadTexture('sky_negx.jpg');

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