export const PlayState = {
    NOTUSED: 0,
    CHANGED: 1,
    LOADING: 2,
    PAUSE: 3,
    PLAYING: 4,
    END: 5
}
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
    BasicField: 'field',
    BasicLight: 'light',
    BasicSkyBox: 'skybox',
    BasicStadium: 'stadium',
    Field: function (fieldName) {
        return this.BasicField + "_" + fieldName;
    },
    Light: function (lightName) {
        return this.BasicLight + "_" + lightName;
    },
    SkyBox: function (skyBoxName) {
        return this.BasicSkyBox + "_" + skyBoxName;
    },
    Main: function (parentName) {
        return parentName + "_main";
    },
    Model: function (parentName, modelName) {
        return parentName + "_model_" + modelName;
    },
    BasicName: function (name) {
        return name.split("_", 1)[0];
    }
}

/**
 * @enum {string}
 */
export const GeoMatName = {
    Mat_default: "mat_default",
    Mat_Skybox_blueCloud: "mat_skybox_blueCloud",
    Mat_Field_default: "mat_field_default"
}

/**
 * @enum {number}
 */
export const EntityDefaultConfig = {
    Default_Ball_Radius: 0.2,
    Default_Line_Width: 0.15
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
 * @enum {number}
 */
export const AgentFlag = {
    DISABLE: 0x00000000,// 00
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
    get: function (flag) {
        const res = new Array();
        if (flag === this.DISABLE) {
            res.push(this.DISABLE);
            return res;
        }
        let val = 1;
        let i = 0;
        do {
            if (flag & 1) {
                res.push(val << i);
            }
            flag = flag >> 1;
            i++;
        } while (flag > 0)
        return res;
    }
};

