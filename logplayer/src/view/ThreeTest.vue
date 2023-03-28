<template>
  <div>
    123
  </div>
</template>
<script>
import * as THREE from "three";
//import { reactive } from 'vue';
import { toRaw } from 'vue';
//const scenel = reactive({ count: 0 })
import { Player } from "../js/player.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TeamDescription } from "@/js/game/description/TeamDescription.js";
import { EntityName, TeamSide } from "@/js/util/Constants.js";
import { ObjectFactory } from "@/js/model/loader/ObjectFactory";

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
    this.test();
  },
  methods: {
    test() {
      let map1 = new Map();
      map1.set(1.1, "string1");
      map1.set(2.1, "string2");
      map1.set(3.1, "string3");
      map1.forEach(element => {
        console.log(element);
      });

      let world = EntityName.World;
      console.log(world);

      let agent = EntityName.Agent(TeamSide.LEFT, "10");
      console.log(agent);

      let teamDescription = new TeamDescription("team1", "team2", "team3");
      console.log(teamDescription.color);
    },
    init() {
      this.scene = new THREE.Scene();

      //scenel =this.scene;
      //this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 5000)
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

      this.camera.position.set(20, 15, 15);
      this.camera.lookAt(new THREE.Vector3());
      //this.camera.updateMatrix();
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

      this.scene.add(ObjectFactory.createSkyBox(512, 512, 512));
      this.scene.add(ObjectFactory.createAmbientLight("light", new THREE.Color("#FFFFFF")));
      this.scene.add(ObjectFactory.createDirectonalLight("sun", new THREE.Color("#FFFFFF")));
      this.scene.add(ObjectFactory.createField());
      this.scene.add(ObjectFactory.createBorder());

      controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.camera.position.z = 5;
      this.camera.position.x = 5;
      this.camera.position.y = 5;
      controls.enableRotate = true; //启用旋转
      controls.enablePan = true; //启用平移
      controls.enableZoom = true;//启用缩放
      controls.autoRotate = false;//是否自动旋转 
      controls.update();

      this.scene.background = new THREE.Color("skyblue")

    },
    load() {

      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      let scene = toRaw(this.scene);
      controls.update();
      let cube = toRaw(this.cube);
      cube.rotation.x += 0.01;
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
