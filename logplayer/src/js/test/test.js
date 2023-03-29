/**
* @FilePath /src/js/test/test.js
* @Description 
* @Author wangxin
* @Date 2023-03-24 10:07:25
* @LastEditTime 2023-03-29 14:10:02
 */
export { }

import { TeamDescription } from "@/js/game/description/TeamDescription.js";
import { EntityName, TeamSide } from "@/js/util/Constants.js";

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

let radius = 16;
let thetaSegments = 8 * Math.pow(2, Math.floor(Math.log2(radius)));
console.log(thetaSegments);