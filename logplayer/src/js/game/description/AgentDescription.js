/**
* @FilePath /src/js/game/description/AgentDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-24 10:43:13
* @LastEditTime 2023-03-28 10:50:09
 */

export { AgentDescription }

class AgentDescription {
    /**
    * @description: 
    * @param {number} num
    * @param {TeamSide} side
    * @param {Map<string, number|string>} otherAgentParam
     */
    constructor(num, side, agentTypeIdx, otherAgentParam) {
        this.num = num;
        this.side = side;
        this.agentTypeIdx = agentTypeIdx;
        this.otherAgentParam = otherAgentParam;
    }
}