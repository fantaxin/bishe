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
    Field: 'field',
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
    Main: function (parentName) {
        return parentName + "_main";
    },
    Model: function (parentName, modelName) {
        return parentName + "_model_" + modelName;
    }
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
    RCG: "rcg"
}

/**
 * @enum {string}
 */
export const PlayMode = {
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
    DISABLE: 0x00000000,
    STAND: 0x00000001,
    KICK: 0x00000002,
    KICK_FAULT: 0x00000004,
    GOALIE: 0x00000008,
    CATCH: 0x00000010,
    CATCH_FAULT: 0x00000020,
    BALL_TO_PLAYER: 0x00000040,
    PLAYER_TO_BALL: 0x00000080,
    DISCARD: 0x00000100,
    LOST: 0x00000200,
    BALL_COLLIDE: 0x00000400,
    PLAYER_COLLIDE: 0x00000800,
    TACKLE: 0x00001000,
    TACKLE_FAULT: 0x00002000,
    BACK_PASS: 0x00004000,
    FREE_KICK_FAULT: 0x00008000,
    POST_COLLIDE: 0x00010000,
    FOUL_CHARGED: 0x00020000,
    YELLOW_CARD: 0x00040000,
    RED_CARD: 0x00080000,
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