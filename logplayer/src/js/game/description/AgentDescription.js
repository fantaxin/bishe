/**
* @FilePath /src/js/game/description/AgentDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-24 10:43:13
* @LastEditTime 2023-03-24 10:43:28
 */

export { AgentDescription }

class AgentDescription {
    /**
    * @description: 
    * @param {number} num
    * @param {TeamSide} side
    * @param {Map<string, number|string>} agentParam
     */
    constructor(num, side, agentParam) {
        this.num = num;
        this.side = side;
        this.agentParam = agentParam;
    }
}