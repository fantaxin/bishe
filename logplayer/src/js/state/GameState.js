/**
* @FilePath /src/js/state/GameState.js
* @Description 
* @Author wangxin
* @Date 2023-03-22 15:50:57
* @LastEditTime 2023-03-22 15:58:28
 */
class GameState {

    /**
    * @description: 
    * @param {number} time
    * @param {string} playMode
     */
    constructor(time, playMode) {
        this.time = time;
        this.playMode = playMode;
    }
}

export { GameState };