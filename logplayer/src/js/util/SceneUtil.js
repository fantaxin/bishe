import * as THREE from 'three';

let TextureLoader = null;
const TexturePath = '/textures/';

export function loadTexture(path) {
    if (TextureLoader === null) {
        TextureLoader = new THREE.TextureLoader();
    }

    return TextureLoader.load(TexturePath + path);
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