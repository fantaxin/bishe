import {ScoreState} from "@/js/game/state/ScoreState";
import {BallState} from "@/js/game/state/BallState";
import {AgentState} from "@/js/game/state/AgentState";
import {Frame} from "@/js/game/state/Frame";
import {GameMode} from "@/js/util/Constants";

function timeFormat(val) {
    let h = Math.floor(val / 3600);
    let m = Math.floor((val % 3600) / 60);
    let s = Math.floor(val % 60);
    let res = "";
    if (h >= 1) {
        res += numberFormat(h) + ':';
    }
    return res + numberFormat(m) + ':' + numberFormat(s);
}
function numberFormat(val) {
    if (val < 10) {
        return '0' + val;
    } else {
        return val;
    }
}
function AngleY(x, z) {
    if (x > 0 && z <= 0) {
        return -Math.atan(z / x);
    } else if (x > 0 && z >= 0) {
        return 2 * Math.PI - Math.atan(z / x);
    } else if (x < 0) {
        return Math.PI - Math.atan(z / x);
    } else if (x == 0) {
        return Math.PI + (z / Math.abs(z)) * (Math.PI / 2);
    }
}
function isLeft(str) {
    if (str == 'left' || str == 'Left' || str == 'LEFT' || str == 'l' || str == 'L') {
        return true;
    }
    return false;
}
function isRight(str) {
    if (str == 'right' || str == 'Right' || str == 'RIGHT' || str == 'r' || str == 'R') {
        return true;
    }
    return false;
}
function frames(num = 104) {
    let num2 = num / 2;
    const frames = [];
    for (let i = 0; i < num; i++) {
        const gameMode = GameMode.PLAY_ON;
        const scoreState = new ScoreState(0, 0, 0, 0, 0, 0);
        const ballState = new BallState(-num2 + i, 2, 0, 0, 0, 0, 0);
        const leftAgentStates = [];
        for (let j = 0; j < 11; j++) {
            leftAgentStates.push(new AgentState(0, -num2 + i, 2, 1 + 3 * (2 * j), 0, 0, 0, 0, [], 7000));
        }
        const rightAgentStates = [];
        for (let j = 0; j < 11; j++) {
            rightAgentStates.push(new AgentState(0, num2 - i, 2, 1 + 3 * (2 * j + 1), 0, 0, 0, 0, [], 7000));
        }
        frames.push(new Frame(i, i, gameMode, scoreState, ballState, leftAgentStates, rightAgentStates));
    }
    for (let i = 0; i < num; i++) {
        const gameMode = GameMode.PLAY_ON;
        const scoreState = new ScoreState(0, 0, 0, 0, 0, 0);
        const ballState = new BallState(num2 - i, 2, 0, 0, 0, 0, 0);
        const leftAgentStates = [];
        for (let j = 0; j < 11; j++) {
            leftAgentStates.push(new AgentState(0, num2 - i, 2, 1 + 3 * (2 * j), 0, 0, 0, 0, [], 7000));
        }
        const rightAgentStates = [];
        for (let j = 0; j < 11; j++) {
            rightAgentStates.push(new AgentState(0, -num2 + i, 2, 1 + 3 * (2 * j + 1), 0, 0, 0, 0, [], 7000));
        }
        frames.push(new Frame(i, i, gameMode, scoreState, ballState, leftAgentStates, rightAgentStates));
    }
    return frames;
}
export {timeFormat, frames, isRight, isLeft, AngleY, numberFormat}
