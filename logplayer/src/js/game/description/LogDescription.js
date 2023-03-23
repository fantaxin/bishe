/**
* @FilePath /src/js/game/description/logDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-23 16:06:14
* @LastEditTime 2023-03-23 16:19:52
 */
export { LogDescription }

import { LogType } from "@/js/util/Constants.js";

class LogDescription {
    constructor(logPath, logType, logVersion, frequency, other = undefined) {

        this.logPath = logPath;

        /**@type {LogType} */
        this.logType = logType;

        /**@type {int} */
        this.logVersion = logVersion;

        /**@type {number} 播放的速度，每秒多少frame*/
        this.frequency = frequency;

        /**@type {Array<string>} */
        this.other = other;
    }
}