<template>
  <div class="wrap">
  </div>
</template>
<script>
import * as THREE from "three";
//import { reactive } from 'vue';
import { toRaw } from 'vue';
//const scenel = reactive({ count: 0 })
import { Player } from "../js/player.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let controls;
export default {
  name: "ThreeTest",
  data() {
    return {
      // 三维场景
      scene: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null,
      // 灯光
      light: null,
      //
      cube: null,

    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.load();
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      //scenel =this.scene;
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10);
      //this.camera = new THREE.OrthographicCamera( -window.innerWidth/50, window.innerWidth/50, window.innerHeight/50, -window.innerHeight/50, 0.1, 100 )
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);
      //this.$refs.container.appendChild(this.renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const x = new THREE.MeshBasicMaterial({ color: "rgb(255, 0, 0)" });
      const y = new THREE.MeshBasicMaterial({ color: "rgb(0, 255, 0)" });
      const z = new THREE.MeshBasicMaterial({ color: "rgb(0, 0, 255)" });
      this.cube = new THREE.Mesh(geometry, material);
      this.cube.position.set(0, 0, 0);
      //cube = this.cube;
      //cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);


      let p = new Player(1, 0x00ff00, 2, 2, 0);
      let p2 = new Player(1, 0x00ff00, 2, 0, 2);
      let p3 = new Player(1, 0x00ff00, 0, 2, 2);
      this.scene.add(p.playerModel);
      this.scene.add(p2.playerModel);
      this.scene.add(p3.playerModel);

      let o = new Float32Array([0, 0, 0,]);
      let a = new Float32Array([0, 0, 0, 10, 0, 0]);
      let b = new Float32Array([0, 0, 0, 0, 10, 0]);
      let c = new Float32Array([0, 0, 0, 0, 0, 10]);

      var line1 = new THREE.BufferGeometry();
      //line1.setAttribute("position", new THREE.BufferAttribute(o, 3));
      line1.setAttribute("position", new THREE.BufferAttribute(a, 3));
      var line2 = new THREE.BufferGeometry();
      //line2.setAttribute("position", new THREE.BufferAttribute(o, 3));
      line2.setAttribute("position", new THREE.BufferAttribute(b, 3));
      var line3 = new THREE.BufferGeometry();
      //line3.setAttribute("position", new THREE.BufferAttribute(o, 3));
      line3.setAttribute("position", new THREE.BufferAttribute(c, 3));

      var linea = new THREE.Line(line1, x);
      var lineb = new THREE.Line(line2, y);
      var linec = new THREE.Line(line3, z);

      this.scene.add(linea);
      this.scene.add(lineb);
      this.scene.add(linec);

      controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.camera.position.z = 5;
      this.camera.position.x = 5;
      this.camera.position.y = 5;
      controls.enableRotate = true; //启用旋转
      controls.enablePan = true; //启用平移
      controls.enableZoom = true;//启用缩放//是否自动旋转 
      controls.autoRotate = true;
      controls.update();

    },
    load() {

      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      //const loader = new THREE.ObjectLoader();
      //let scene = loader.parse(this.scene.toJSON())
      //let cube = loader.parse(this.cube.toJSON())

      //this.cube.rotation.x += 0.01;
      //this.cube.rotation.y += 0.01;
      let scene = toRaw(this.scene);
      let cube = toRaw(this.cube);
      /*      cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;*/
      //cube.rotation.z -= 0.001;
      //const loader = new THREE.ObjectLoader();
      // object 指 场景中的某个模型对象
      //loader.parse(this.scene.toJSON())
      controls.update();
      this.renderer.render(scene, this.camera);
    }
  }
};

</script>
<style>
.wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

#container {
  height: 100%;
}

.label {
  margin-top: -20px;
  color: #fff;
  font-size: 12px;
  border: 1px solid #dbeca4;
  padding: 3px 5px;
  background: rgba(0, 0, 0, 0.6);
  min-width: 80px;
}

.pressure {
  width: 115px;
}

.text_Num {
  color: red;
  margin-right: 5px;
}
</style>
