/**
* @FilePath /src/js/game/description/AgentDescription.js
* @Description 
* @Author wangxin
* @Date 2023-03-24 10:43:13
* @LastEditTime 2023-04-06 16:24:59
 */

export { AgentDescription }

class AgentDescription {
    /**
    * @description: 
    * @param {number} num
    * @param {TeamSide} side
    * @param {number} agentTypeIdx
    * @param {Map<string, number|string>} otherAgentParam
     */
    //TODO: 所有的Param都改为自定义Map
    constructor(num, side, agentTypeIdx, otherAgentParam) {

        /**@type {number} */
        this.num = num;

        /**@type {TeamSide} */
        this.side = side;

        /**@type {number} */
        this.agentTypeIdx = agentTypeIdx;
        
        /**@type {Map<string, number|string>} */
        this.otherAgentParam = otherAgentParam;
    }
}