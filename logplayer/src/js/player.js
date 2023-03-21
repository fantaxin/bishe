import * as THREE from "three";

class Player {
    constructor(size, color, x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.size = size;
        this.playerModel = new THREE.Group();
        this.createModel()
    }

    createModel(){
        const geometry = new THREE.CircleGeometry( this.size, 32 );
        const material = new THREE.MeshBasicMaterial( { color: this.color ,side:THREE.DoubleSide} );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set( this.x, this.y, this.z );
        this.playerModel.add( circle );
        /*let positions = new Float32Array([
            -10, 0, 0, // 0
            10, 0, 0,  // 1
            0, 10, 0   // 2
        ]);

        const triangle = new THREE.BufferGeometry();
        let arr = new THREE.BufferAttribute();
        arr.addAttribute( "position", )
        triangle.addAttribute();*/
    }

    update() {
        this.position = 2;
    }
}

export {Player}
