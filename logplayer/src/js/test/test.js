/**
* @FilePath /src/js/test/test.js
* @Description 
* @Author wangxin
* @Date 2023-03-24 10:07:25
* @LastEditTime 2023-03-31 02:42:48
 */

import { TeamDescription } from "@/js/game/description/TeamDescription.js";
import { EntityName, TeamSide, AngleY } from "@/js/util/Constants.js";
import { Entity } from "./Entity.js";

export function test() {
    let entity = new Entity("123");
    entity.addEventListener("click", (
        (event) => {
            console.log(this.name + " : " + event.type + " : " + event.mag);
        })
    );
    entity.dispatchEvent({ type: "click", mag: 1 });
}

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
let x = 0;
let z = 0;
let a = AngleY(x, z);
console.log(AngleY(x, z));

if (x > 0 && z <= 0) {
    console.log(-Math.atan(z / x));
} else if (x > 0 && z >= 0) {
    console.log(2 * Math.PI - Math.atan(z / x));
} else if (x < 0) {
    console.log(Math.PI - Math.atan(z / x));
} else if (x == 0) {
    console.log(Math.PI + (z / Math.abs(z)) * (Math.PI / 2));
}

let entity = new Entity("123");

a = function (event) {
    console.log(this.name + " : " + event.type + " : " + event.msg);
}

entity.addEventListener("click", function (event) {
    console.log(this.name + " : " + event.type + " : " + event.msg);
});

entity.dispatchEvent({ type: "click", msg: 1 });
