java opengl框架:
LWJGL
processing

three.js 项目地址:
https://gitlab.com/robocup-sim/JaSMIn

日志文件地址:
http://archive.robocup.info/

RoBoCup网站地址:
http://chaosscripting.net/

RoBoCup介绍文档:
https://rcsoccersim.readthedocs.io/

参数的C++描述:
https://github.com/rcsoccersim/rcssserver/blob/master/src/types.h

future：
- 支持replay和rcg日志文件
- 播放2D比赛
- 显示当前比赛状态，比分
- 可以暂停、快进、进度条播放
- 球员的属性定义
- 球队的旗帜，作为球员的边框
- 每个球员显示其体力值和进球、犯规数
- 比赛列表（同一个文件夹下/文件树列表）
- 比赛数据分析，射正率、传球准确率等，球员评分

- 实现侧上方视角播放
- 镜头跟随球移动
- 进球时刻、越位时刻、犯规回放..
- 进球、犯规等时刻处播放
- 客户端与后端分离
- 玩家控制一个球员与AI进行比赛并记录

- 使用sprite完成球员属性标签

使用 Processing 进行开发：
- 图形能不能分层来处理，可以绘制背景
- 嵌入图片
- 平移旋转
- 客户端的panel，web端不用考虑
- 多线程

- 标志球员的视野范围
- 后端存储日志文件，前端接收json数据并进行解析，在网络传输时首先传输文件描述信息，
frame信息需要从当前播放时间开始进行传输，这需要后端在第一次接收该文件的传输请求时，
将该文件转换为json文件，并设置索引（json文件中第几行是第几个frame）
- 前端可以播放本地日志文件，也可以下载后端的日志文件，或者直接在网页上面进行播放

- 切换场景，白天/黑夜

- processing/java -> P5.js
	http://jonathan.dahlberg.media/processing2js/
	

https://github.com/xdlumia/vue3-video-play
https://github.com/darkylmnx/vue-youtube-iframe-api
https://github.com/py-kkh/bilibili-ui
https://github.com/edu-fedorae/vuetify-components
https://github.com/algoz098/vue-player
https://github.com/core-player/vue-core-video-player
https://github.com/vmllab-js/vue-frame-player

[Three.js指定路径漫游（站走切换、路径动画、展示路线、开始、暂停、继续、退出、镜头跟随）_threejs路径漫游_-道不虚行只在人-的博客-CSDN博客](https://blog.csdn.net/u010657801/article/details/129754337)

https://www.cnblogs.com/zdz8207/p/vue-ui-framework.html



**p5.js** **creat.js** three.js **two.js** fabric.js 
javafx jfoenix jxbrowser 
fxgl lwjgl 

- 可以绘制背景，图片
- 可以方便地移动、旋转图形
- 图形与图形最好能够方便地组合
- 可以插入汉字
- 可以插入控件（或者绘制，或者在web中显示）

three.js
- https://threejs.org/docs/index.html#api/zh
- http://www.webgl3d.cn/pages/1c3a1a/
- https://discoverthreejs.com/zh/#main

javascript
- https://www.runoob.com/js/js-tutorial.html
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference

model
- https://www.aigei.com/
- https://sketchfab.com/search?type=models
- https://www.om.cn/
- https://3d.znzmo.com/
- https://www.3dxia.com/

vscode: 
- JavaScript (ES6) code snippets
- koroFileHeader
- Tabnine AI Autocomplete for Javascript
- --TODO Highlight--
- Todo Tree
- Vue 3 Snippets
- Vue Language Features (Volar)
- quokka

npm install vue
npm install three

``` json
{
    "tabnine.experimentalAutoImports": true,
    "git.confirmSync": false,
    "fileheader.customMade": {
        "FilePath": "no item name", // 设置后，默认生成文件相对于项目的路径
        "Description": "",
        "Author": "wangxin",
        "Date": "Do not edit",
        "LastEditTime": "Do not edit", // 设置后，保存文件更改默认更新最后编辑时间
    },
    "fileheader.configObj": {
        "createFileTime": true,
        "language": {
            "js": {
                "head": "/**",
                "middle": "* @",
                "end": " */",
            },
            "languagetest": {
                "head": "/$$",
                "middle": " $ @",
                "end": " $/",
                "functionSymbol": {
                    "head": "/** ",
                    "middle": " * @",
                    "end": " */"
                },
                "functionParams": ""
            }
        },
        "autoAdd": true,
        "autoAddLine": 3,
        "autoAlready": true,
        "annotationStr": {
            "head": "/*",
            "middle": " * @",
            "end": " */",
            "use": false
        },
        "headInsertLine": {
            "php": 2,
            "sh": 2
        },
        "beforeAnnotation": {
            //"js": "123"
        },
        "afterAnnotation": {
            "文件后缀": "该文件后缀的头部注释之后添加某些内容",
            "js": "export {} \n"
        },
        "specialOptions": {
            "特殊字段": "自定义比如LastEditTime/LastEditors"
        },
        "switch": {
            "newlineAddAnnotation": true
        },
        "supportAutoLanguage": [
            "js"
        ],
        "prohibitAutoAdd": [
            "json"
        ],
        "folderBlacklist": [
            "node_modules",
            "文件夹禁止自动添加头部注释"
        ],
        "prohibitItemAutoAdd": [
            "项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"
        ],
        "moveCursor": true,
        "dateFormat": "YYYY-MM-DD HH:mm:ss",
        "atSymbol": [
            " ",
            "@"
        ],
        "atSymbolObj": {
            "文件后缀": [
                "头部注释@符号",
                "函数注释@符号"
            ]
        },
        "colon": [
            " ",
            ": "
        ],
        "colonObj": {
            "文件后缀": [
                "头部注释冒号",
                "函数注释冒号"
            ]
        },
        "filePathColon": "/",
        "showErrorMessage": false,
        "writeLog": false,
        "wideSame": false,
        "wideNum": 13,
        "functionWideNum": 0,
        "CheckFileChange": false,
        "createHeader": false,
        "useWorker": false,
        "designAddHead": false,
        "headDesignName": "random",
        "headDesign": false,
        "cursorModeInternalAll": {},
        "openFunctionParamsCheck": true,
        "functionParamsShape": [
            "{",
            "}"
        ],
        "functionBlankSpaceAll": {},
        "functionTypeSymbol": "*",
        "typeParamOrder": "type param",
        "customHasHeadEnd": {},
        "throttleTime": 60000,
        "functionParamAddStr": "",
        "NoMatchParams": "no show param"
    },
    "editor.formatOnSave": true,
    "todohighlight.isEnable": false,
    "todohighlight.keywords": [
        {
            "text": "TODO:",
            "color": "#eeee00",
            "backgroundColor": "#000000",
        }
    ],
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "foreground": "#A8C023",
            "opacity": 0,
            "type": "line"
        },
    },
}
```

```
<script src="//unpkg.com/vue@2/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.13/lib/index.js"></script>
<div id="app">
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-slider v-model="value"
               :marks="marks"
               :min="min"
               :max="max"
               :format-tooltip="formatTooltip">
               </el-slider>
               <i id="football" class="el-icon-football"  @click="click1"></i>
  </div>
</template>
</div>

var Main = {
    data() {
      return {
        value: 10,
        min:0,
        max:3600,
        marks: {
          1137: {
            style: {
              color: '#000000',
            },
          },
          2500: {
            style: {
              color: '#000000',
            },
            label: this.$createElement('i',{ class: 'el-icon-football', onclick:"click1()"})
          }
        }
      }
    },
    methods: {
      formatTooltip(val) {
        let h = Math.floor(val/3600);
        let m = Math.floor((val%3600)/60);
        let s = Math.floor(val%60);
        return h+':'+m+':'+s;
      },
      click1(){
        console.log("000")
        this.value = 0;
        this.marks["1137"] = { style: { color: "#000000" }, label: this.$createElement('i',{class: 'el-icon-football'})}
        this.$getElementsByClass("el-icon-football")[1].addEventListener('click',function() {
		        alert('绑定事件监听函数')
	      })
        console.log("000")
}
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

```

