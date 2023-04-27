<template>
  <div class="player">
    <div class="ctrl player-top">
      <!-- 此处做一个渐变暗的效果 -->
    </div>
    <div class="player-mid" id="player-mid">
      <div class="game-msg">
        <!-- 当前的比赛时间，比赛状态，比分等 -->
        <i>{{ frameNum }}HZ</i>
      </div>
      <!-- loading... -->
      <div class="">
      </div>
    </div>
    <div class="ctrl player-bottom">
      <!-- 此处做一个渐变暗的效果 -->
      <div class="ctrl-bar">

        <div class="bar-left">
          <div class="player-state">
            <!-- 小的播放状态图标 -->
            <div v-if="playState === PlayState.PLAYING" class="btn-pause" @click="changePlayState(PlayState.PAUSE)">
              <!-- <i class="iconfont icon-kaishi"></i> -->
              <i>pa</i>
            </div>
            <div v-else class="btn-play" @click="changePlayState(PlayState.PLAYING)">
              <i>pl</i>
            </div>
          </div>
          <!-- 跳转（下一个进球点） -->
          <div class="pre-goal" @click="getGoalTime(false)">
            <i>p</i>
          </div>
          <div class="next-goal" @click="getGoalTime(true)">
            <i>n</i>
          </div>
          <div class="left player-time">
            <!-- 当前时间 -->
            <span class="time-current">{{ timeFormat(playTime) }}</span>
          </div>
        </div>

        <div class="bar-mid">
          <el-slider v-model="playTime" :min="minTime" :max="maxTime" :marks="marks" :format-tooltip="timeFormat" size="small"
                     style="color: #222222" @input="sliderInput" @change="sliderChange"/>
        </div>

        <div class="bar-right">
          <!-- 倍速 -->
          <div class="player-speed">
            <el-dropdown trigger="click">
              <i>bs</i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="changePlaySpeed(2)">2.0</el-dropdown-item>
                  <el-dropdown-item @click="changePlaySpeed(1.5)">1.5</el-dropdown-item>
                  <el-dropdown-item @click="changePlaySpeed(1)">1.0</el-dropdown-item>
                  <el-dropdown-item @click="changePlaySpeed(0.5)">0.5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- 全屏 -->
          <div class="player-full">
            <i>qp</i>
          </div>
          <div class="right player-time">
            <!-- 总时长 -->
            <span class="time-duration">{{ timeFormat(maxTime) }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import * as THREE from "three";
import {h} from 'vue'
import {toRaw} from "vue";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {World} from "@/js/model/World";
import {MeshFactory} from "@/js/model/loader/MeshFactory";
import {GameDescription} from "@/js/game/description/GameDescription";
import {TeamDescription} from "@/js/game/description/TeamDescription.js";
import {AgentDescription} from "@/js/game/description/AgentDescription";
import {request} from "@/js/test/request";
import {GameType, TeamSide, PlayState, GameMode} from "@/js/util/Constants.js";
import {timeFormat} from "@/js/util/util.js"

let sliderBtn;
let controls;
let geometry;
let n = 0.1;
let i = 0.1;
let frameIdx = 0;
let startFrameTime;
let lastFrameTime;
let callNum = 0;
let freshTime = 0;//距离上一次更新frame到现在的有效时间差
let player_mid;

export default {
  name: "ThreeTest",
  data() {
    return {
      log: null,
      renderer: null,
      scene: null,
      camera: null,
      world: null,
      frames: null,

      playTime: 0, // 播放器时间
      minTime: 0, // 播放器最小时间
      maxTime: 3000, // 播放器总时间
      marks: {}, // 进球时间点标记
      frameNum: 60.0, // 画面帧率
      playSpeed: 1, // 播放速度
      gameTime: 0, // 比赛内时间
      gameMode: "", // 比赛状态
      gameScore: "", // 比分
      PlayState: PlayState, // 播放状态常量
      timeFormat: timeFormat,
    };
  },
  created() {
    this.glinit();
    this.worldInit();
    this.scene.add(this.world.group);
    request.get('eee.json', {}).then(res => {
      this.log = res.data;
      this.maxTime = this.log.frames[this.log.frames.length - 1].time;
      let gamemode = "";
      this.log.frames.forEach((frame, idx)=>{
        if(gamemode === GameMode.GOAL_L || gamemode === GameMode.GOAL_R){
          return;
        }
        if(frame.gameMode === GameMode.GOAL_L || frame.gameMode === GameMode.GOAL_R){
          Object.assign(this.marks, { [Math.floor(idx/10)]: {}});
          this.createSliderLabel(Math.floor(idx/10));
          gamemode = frame.gameMode;
        }
      });
    })
  },
  mounted() {
    player_mid = document.getElementById("player-mid");
    player_mid.appendChild(this.renderer.domElement);
    //this.createSliderLabel(100);
    this.changeSliderBtnStyle();
    this.animate();
  },
  methods: {
    worldInit() {
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
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
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

      const x = new THREE.MeshBasicMaterial({color: "rgb(255, 0, 0)"});
      const y = new THREE.MeshBasicMaterial({color: "rgb(0, 255, 0)"});
      const z = new THREE.MeshBasicMaterial({color: "rgb(0, 0, 255)"});
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
      // 画面控制更新
      controls.update();
      // 更新画面帧率
      this.updateFrameNum();
      let scene = toRaw(this.scene);
      let world = toRaw(this.world);
      if (this.log !== null) {
        // 获取下一帧序号
        this.updateFrameIdx();
        let frame = this.log.frames[frameIdx];
        let nextFrame = this.log.frames[frameIdx + 1];
        // 更新播放器时间
        this.updatePlayTime(Math.floor(frameIdx / 10));
        // 更新实体
        world.updateWorld(frame, nextFrame,this.playTime);
      }
      // 更新画面大小
      this.renderer.setSize(player_mid.offsetWidth,player_mid.offsetHeight);
      // 更新摄像机画面比例
      this.camera.aspect = player_mid.clientWidth / player_mid.clientHeight;
      this.camera.updateProjectionMatrix();
      // 更新画面
      this.renderer.render(scene, this.camera);
    },
    updateFrameIdx() {
      if (this.playState !== PlayState.PLAYING) {
        return;
      }
      freshTime += 1000 / this.frameNum;
      const millSecPerUpdate = 100 / this.playSpeed;
      if (freshTime >= millSecPerUpdate) {
        let addFrameIdx = Math.round(freshTime / millSecPerUpdate);
        frameIdx += addFrameIdx;
        freshTime -= addFrameIdx * millSecPerUpdate;
      }
    },
    updateFrameNum() {
      if (this.playState === PlayState.NOTUSED || this.playState === PlayState.CHANGED) {
        startFrameTime = Date.now();
        lastFrameTime = Date.now();
        this.changePlayState(PlayState.LOADING);
      }
      callNum++;
      let nowFrameTime = Date.now();
      if (nowFrameTime - startFrameTime < 1000) {
        this.frameNum = (callNum * 1000 / (nowFrameTime - startFrameTime)).toFixed(1);
      } else if (nowFrameTime - lastFrameTime >= 1000) {
        this.frameNum = (callNum * 1000 / (nowFrameTime - lastFrameTime)).toFixed(1);
        callNum = 0;
        lastFrameTime = nowFrameTime;
      }
    },
    updatePlayTime(time) {
      this.playTime = time;
    },
    // 跳转
    changePlayTime(time) {
      this.updatePlayTime(time);
      frameIdx = time * 10;
      freshTime = 0;
    },
    changePlayState(playState) {
      this.$store.commit('changePlayState', playState);
    },
    playerTimeChange() {

    },
    changePlaySpeed(newSpeed) {
      this.playSpeed = newSpeed;
    },
    playerFull() {

    },
    sliderInput(newTime) {
      sliderBtn.style.opacity = 1;
      this.changePlayTime(newTime);
    },
    sliderChange(newTime) {
      sliderBtn.style.opacity = 0;
    },
    createSliderLabel(key) {
      Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu'})});
      // Object.keys(this.marks).forEach(key => {
      //   Object.assign(this.marks[key], { label: h('i', { class: 'iconfont icon-yundongzuqiu', onClick: () => { this.changePlayTime(Number.parseInt(key)) } }) });
      // })
    },
    changeSliderBtnStyle() {
      sliderBtn = document.getElementsByClassName("el-slider__button")[0];
      sliderBtn.style.opacity = 0;
      sliderBtn.style.width = "10px";
      sliderBtn.style.height = "10px";
      sliderBtn.style.borderColor = "#9b4e4e"
    },
    getGoalTime(isNext) {
      let firstGoal = this.max;
      let lastGoal = this.min;
      let preGoal = this.min;
      let nextGoal = this.max;
      Object.keys(this.marks).forEach(key => {
        let time = Number.parseInt(key);
        if (this.value < time) {
          nextGoal = nextGoal < time ? nextGoal : time;
        } else if (this.value > time) {
          preGoal = preGoal > time ? preGoal : time;
        }
        firstGoal = firstGoal < time ? firstGoal : time;
        lastGoal = lastGoal > time ? lastGoal : time;
      })
      nextGoal = nextGoal === this.max ? firstGoal : nextGoal;
      preGoal = preGoal === this.min ? lastGoal : preGoal;
      if (isNext) {
        this.changePlayTime(nextGoal);
      } else {
        this.changePlayTime(preGoal);
      }
    },

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

.player {
  width: 90vw;
  height: 90vh;
  display: inline-flex;
  border-style: solid;
  position: relative;
}
.game-msg {
  position:absolute;
  z-index: 10;
}
.player-top {
  /*position:relative;*/
  /*z-index: 10;*/
}
.player-mid {
  /*position:relative;*/
  z-index: 0;
  width: inherit;
  height: inherit;
}
.player-bottom {
  background: linear-gradient(transparent, rgba(77, 77, 77, 1));
  position: absolute;
  width: inherit;
  height: 50px;
  bottom: 0;
}

.ctrl-bar {
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  grid-gap: 5px;
  position: relative;
}

.bar-left {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  grid-template-rows: 60% 40%;
  grid-gap: 1px;
  position: relative;
}

.player-state {
  grid-row: 1 / 2;
  grid-column: 1;
}

.pre-goal {
  grid-row: 1;
  grid-column: 2;
}

.next-goal {
  grid-row: 1;
  grid-column: 3;
}

.left.player-time {
  grid-row: 2;
  grid-column: 2 / 3;
}

.bar-right {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 60% 40%;
  grid-gap: 1px;
  position: relative;
}

.player-speed {
  grid-row: 1;
  grid-column: 1;
}

.player-full {
  grid-row: 1;
  grid-column: 2;
}
.right.player-time {
  grid-row: 2;
  grid-column: 1 / 2;
}
.player-time {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/deep/ .el-slider__bar {
  background-color: #ff4bba;
}
</style>
