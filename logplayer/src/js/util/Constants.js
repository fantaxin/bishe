import { AgentState } from "../game/state/AgentState";
import { BallState } from "../game/state/BallState";
import { Frame } from "../game/state/Frame";
import { ScoreState } from "../game/state/ScoreState";

/**
 * @enum {string}
 */
export const TeamSide = {
    LEFT: 'left',
    RIGHT: 'right',
}
/**
 * @enum {string}
 */
export const EntityName = {
    World: 'world',
    Environment: 'environment',
    Entity: 'entity',
    Ball: 'ball',
    LeftTeam: 'team_left',
    RightTeam: 'team_right',
    Team: function (teamSide) {
        if (teamSide === TeamSide.LEFT) {
            return this.LeftTeam;
        } else {
            return this.RightTeam;
        }
    },
    Agent: function (teamSide, agentNum) {
        if (teamSide === TeamSide.LEFT) {
            return this.LeftTeam + '_' + agentNum;
        } else {
            return this.RightTeam + '_' + agentNum;
        }
    },
    Field: function (fieldName) {
        return "field_" + fieldName;
    },
    Light: function (lightName) {
        return "light_" + lightName;
    },
    SkyBox: function (skyBoxName) {
        return "skybox_" + skyBoxName;
    },
    Main: function (parentName) {
        return parentName + "_main";
    },
    Model: function (parentName, modelName) {
        return parentName + "_model_" + modelName;
    }
}

/**
 * @enum {string}
 */
export const GeoMatName = {
    /**
    * @description: 
    * @param {THREE.} geoType
    * @param {*} geoParams
    * @return {*}
     */
    Geo: function (geoType, geoParams) {

    },
    Mat: function (teamSide, agentNum) {

    },
}

/**
 * @enum {number}
 */
export const EntityDefaultConfig = {
    DEFAULT_BALL_RADIUS: 0.2,
    DEFAULT_LINE_WIDTH: 0.15
}
export function AngleY(x, z) {
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

/**
 * @enum {string}
 */
export const GameType = {
    TWO_D: "2D",
    THREE_D: "3D"
}

/**
 * @enum {string}
 */
export const LogType = {
    REPLAY: "replay",
    RCG: "rcg",
    UNKNOWN: "__unknown",
    getLogType: function (type) {
        switch (type) {
            case this.REPLAY:
                return this.REPLAY;
            case this.RCG:
                return this.RCG;
            default:
                return this.UNKNOWN;
        }
    }
}

/**
 * @enum {string}
 */
export const GameMode = {
    PLAY_ON: "play_on",
    TIME_OVER: "time_over",
    OFFSIDE_L: "offside_l",
    OFFSIDE_R: "offside_r",
    KICK_OFF_L: "kick_off_l",
    KICK_OFF_R: "kick_off_r",
    FOUL_CHARGE_L: "foul_charge_l",
    FOUL_CHARGE_R: "foul_charge_r",
    FREE_KICK_L: "free_kick_l",
    FREE_KICK_R: "free_kick_r",
    CORNER_KICK_L: "corner_kick_l",
    CORNER_KICK_R: "corner_kick_r",
    KICK_IN_L: "kick_in_l",
    KICK_IN_R: "kick_in_r",
    GOAL_L: "goal_l",
    GOAL_R: "goal_r",
    GOAL_KICK_L: "goal_kick_l",
    GOAL_KICK_R: "goal_kick_r",
};

/**
 * An enum providing meaning the indices for the different elements in the agent flags bitfield for 2D games.
 * @enum {number}
 */
export const AgentFlag = {
    DISABLE: 0x00000000,// 0
    STAND: 0x00000001,// 0
    KICK: 0x00000002,// 1
    KICK_FAULT: 0x00000004,// 2
    GOALIE: 0x00000008,// 3
    CATCH: 0x00000010,// 4
    CATCH_FAULT: 0x00000020,// 5
    BALL_TO_PLAYER: 0x00000040,// 6
    PLAYER_TO_BALL: 0x00000080,// 7
    DISCARD: 0x00000100,// 8
    LOST: 0x00000200,// 9
    BALL_COLLIDE: 0x00000400,// 10
    PLAYER_COLLIDE: 0x00000800,// 11
    TACKLE: 0x00001000,// 12
    TACKLE_FAULT: 0x00002000,// 13
    BACK_PASS: 0x00004000,// 14
    FREE_KICK_FAULT: 0x00008000,// 15
    POST_COLLIDE: 0x00010000,// 16
    FOUL_CHARGED: 0x00020000,// 17
    YELLOW_CARD: 0x00040000,// 18
    RED_CARD: 0x00080000,// 19
};

export function isLeft(str) {
    if (str == 'left' || str == 'Left' || str == 'LEFT' || str == 'l' || str == 'L') {
        return true;
    }
    return false;
}

export function isRight(str) {
    if (str == 'right' || str == 'Right' || str == 'RIGHT' || str == 'r' || str == 'R') {
        return true;
    }
    return false;
}

export function frames(num = 104) {
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