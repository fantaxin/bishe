<template>
    <div id="video">
        123
    </div>
</template>
<script>
import * as THREE from "three";
//import { reactive } from 'vue';
import { toRaw } from "vue";
//const scenel = reactive({ count: 0 })
import { Player } from "../js/player.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TeamDescription } from "@/js/game/description/TeamDescription.js";
import { GameType, EntityName, TeamSide, frames, PlayState } from "@/js/util/Constants.js";
import { MeshFactory } from "@/js/model/loader/MeshFactory";
import { World } from "@/js/model/World";
import { GameDescription } from "@/js/game/description/GameDescription";
import { AgentDescription } from "@/js/game/description/AgentDescription";
import { test } from "@/js/test/test";
import { request } from "@/js/test/request";

let controls;
let geometry;
let n = 0.1;
let i = 0.1;
let frameIdx = 0;
let startFrameTime;
let lastFrameTime;
let callNum = 0;
let freshTime = 0;//距离上一次更新frame到现在的有效时间差

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
            /**@type {World} */
            world: null,

            frames: null,

            log: null
        };
    },
    created() {
        this.glinit();
        this.worldinit();
        this.scene.add(this.world.group);
        request.get('eee.json', {}).then(res => {
            this.log = res.data;
            this.$store.state.maxTime = this.log.frames[this.log.frames.length - 1].time;
        })
    },
    mounted() {
        document.getElementById("video").appendChild(this.renderer.domElement);
        this.animate();
    },
    methods: {
        worldinit() {
            let gameDes = new GameDescription(GameType.TWO_D, {}, {}, []);
            let agentDesArr1 = [];
            let agentDesArr2 = [];
            for (let i = 0; i < 11; i++) {
                agentDesArr1.push(new AgentDescription(i + 1, TeamSide.LEFT));
            }
            for (let i = 0; i < 11; i++) {
                agentDesArr2.push(new AgentDescription(i + 1, TeamSide.RIGHT));
            }
            let leftteam = new TeamDescription(
                "ll",
                TeamSide.LEFT,
                new THREE.Color("#00B7FF"),
                agentDesArr1
            );
            let rightteam = new TeamDescription(
                "rr",
                TeamSide.RIGHT,
                new THREE.Color("#AC3B3B"),
                agentDesArr2
            );
            this.world = new World(leftteam, rightteam);

            this.world.createSkyBox();
            this.world.createField();
            this.world.createTeams();

            let ambientLight = MeshFactory.createAmbientLight(
                "light",
                new THREE.Color("#FFFFFF"),
                1.5
            );
            let directionalLight = new THREE.DirectionalLight("#FFFFFF");
            // 平行光配置
            directionalLight.position.set(-40, 60, -10);
            directionalLight.castShadow = true;
            directionalLight.shadow.camera.near = 2;
            directionalLight.shadow.camera.far = 200;
            directionalLight.shadow.camera.left = -50;
            directionalLight.shadow.camera.right = 50;
            directionalLight.shadow.camera.top = 50;
            directionalLight.shadow.camera.bottom = -50;
            // 距离和强度
            directionalLight.distance = 1;
            directionalLight.intensity = 1.5;
            // 设置阴影的分辨率
            directionalLight.shadow.mapSize.width = 1024;
            directionalLight.shadow.mapSize.height = 1024;

            this.world.addLight("am", ambientLight);
            this.world.addLight("sun", directionalLight);
            //let r = 5;
            //let cube = new THREE.Mesh(new THREE.BoxGeometry(r, r, r), new THREE.MeshBasicMaterial({ color: "#0E7728" }))
            //cube.rotateY(0.2);

            //cube.setRotationFromAxisAngle();
            //this.world.group.add(cube);
            //this.scene.add(cube);
        },
        glinit() {
            this.scene = new THREE.Scene();
            //this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 5000)
            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                5000
            );
            this.camera.position.set(0, 50, 70);
            this.camera.lookAt(new THREE.Vector3(0, 0, -30));
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.gammaOutput = true;
            this.renderer.gammaFactor = 2.2;
            this.renderer.autoClear = false;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.shadowMapSoft = true;
            this.renderer.shadowMapAutoUpdate = true;
            this.renderer.sortObjects = false;
            this.renderer.localClippingEnabled = true;
            this.renderer.physicallyCorrectLights = true;
            this.renderer.setClearColor(new THREE.Color(0x000000), 0);
            //this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            //this.renderer.toneMappingExposure = 1.25;
            //this.renderer.toneMappingWhitePoint = 1.0;

            document.body.appendChild(this.renderer.domElement);

            const x = new THREE.MeshBasicMaterial({ color: "rgb(255, 0, 0)" });
            const y = new THREE.MeshBasicMaterial({ color: "rgb(0, 255, 0)" });
            const z = new THREE.MeshBasicMaterial({ color: "rgb(0, 0, 255)" });
            let a = new Float32Array([0, 0, 0, 10, 0, 0]);
            let b = new Float32Array([0, 0, 0, 0, 10, 0]);
            let c = new Float32Array([0, 0, 0, 0, 0, 10]);
            var line1 = new THREE.BufferGeometry();
            line1.setAttribute("position", new THREE.BufferAttribute(a, 3));
            var line2 = new THREE.BufferGeometry();
            line2.setAttribute("position", new THREE.BufferAttribute(b, 3));
            var line3 = new THREE.BufferGeometry();
            line3.setAttribute("position", new THREE.BufferAttribute(c, 3));
            var linea = new THREE.Line(line1, x);
            var lineb = new THREE.Line(line2, y);
            var linec = new THREE.Line(line3, z);
            this.scene.add(linea);
            this.scene.add(lineb);
            this.scene.add(linec);

            controls = new OrbitControls(this.camera, this.renderer.domElement);
            controls.enableRotate = true; //启用旋转
            controls.enablePan = true; //启用平移
            controls.enableZoom = true;//启用缩放
            controls.autoRotate = false;//是否自动旋转
            controls.update();

            this.scene.background = new THREE.Color("skyblue")
        },
        animate() {
            requestAnimationFrame(this.animate);
            controls.update();

            this.updateFrameNum();

            let scene = toRaw(this.scene);
            let world = toRaw(this.world);
            if (this.log !== null) {
                // i += 0.2;
                // let j = Math.ceil(i);
                // let frame = this.log.frames[j];
                // let nextFrame;
                // //j = 0.1;
                // if (j >= this.log.frames.length) {
                //     nextFrame = frame;
                // } else {
                //     nextFrame = this.log.frames[j];
                // }
                this.updateFrameIdx();
                let frame = this.log.frames[frameIdx];
                let nextFrame = this.log.frames[frameIdx + 1];
                this.updateTime(frame);
                world.updateWorld(frame, nextFrame);
            }
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.render(scene, this.camera);
        },
        updateFrameIdx() {
            if (this.$store.state.playState !== PlayState.PLAYING) {
                return frameIdx;
            }
            freshTime += 1000 / this.$store.state.frameNum;
            const millSecPerUpdate = 100 / this.$store.state.speed;
            if (freshTime >= millSecPerUpdate) {
                let addFrameIdx = Math.round(freshTime / millSecPerUpdate);
                frameIdx += addFrameIdx;
                freshTime -= addFrameIdx * millSecPerUpdate;
            }
            // frameIdx++;
        },
        updateFrameNum() {
            if (this.$store.state.playState === PlayState.NOTUSED || this.$store.state.playState === PlayState.CHANGED) {
                startFrameTime = Date.now();
                lastFrameTime = Date.now();
                this.$store.state.playState = PlayState.LOADING;
            }
            callNum++;
            let nowFrameTime = Date.now();
            if (nowFrameTime - startFrameTime < 1000) {
                this.$store.state.frameNum = (callNum * 1000 / (nowFrameTime - startFrameTime)).toFixed(1);
            } else if (nowFrameTime - lastFrameTime >= 1000) {
                this.$store.state.frameNum = (callNum * 1000 / (nowFrameTime - lastFrameTime)).toFixed(1);
                callNum = 0;
                lastFrameTime = nowFrameTime;
            }
        },
        updateTime(frame) {
            this.$store.state.time = frame.time;
        }

    },
    computed: {
        playState() {
            return this.$store.state.playState;
        }
    },
    watch: {
        playState(newData, oldData) {
            if (newData === oldData) {
                return;
            }
            if (newData) {

            }
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
