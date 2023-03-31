package edu.cug.robo.other;

import edu.cug.robo.entity.Team;
import edu.cug.robo.enums.TeamSide;
import java.util.HashMap;
import java.util.Map;

/**
 * edu.cug.robo.other.Game
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class GameLog {
    /**
     * The log file url.
     * @type {?string}
     */
    String url = null;

    /**
     * The game type (2D or 3D).
     * 1=2d 2=3d
     * @type {!GameType}
     */
    int type = 1;

    /**
     * The state update frequency of the game log.
     * 状态更新频率
     * @type {number}
     */
    int frequency = 1;

    /**
     * The list of server/simulation environment parameters.
     * 服务器模拟环境参数列表
     * @type {!ParameterMap}
     */
    Map environmentParams = new HashMap();

    /**
     * The list of player parameters.
     * 球员参数列表
     * @type {!ParameterMap}
     */
    Map playerParams = new HashMap();

    /**
     * The list of player type parameters.
     * 球员类型参数列表
     * @type {!Array<!ParameterMap>}
     */
    Map[] playerTypes;

    /**
     * The description of the left team.
     * @type {!TeamDescription}
     */
    Team leftTeam = new Team("Left Team", "0xffff00", TeamSide.LEFT, null);

    /**
     * The description of the right team.
     * @type {!TeamDescription}
     */
    Team rightTeam = new Team("Right Team", "0xff0000", TeamSide.RIGHT, null);

    /**
     * The list of all world states.
     * @type {!Array<!WorldState>}
     */
    WorldState[] states;

    /**
     * The time value of the first state.
     * @type {number}
     */
    int startTime;

    /**
     * The time value of the last state.
     * @type {number}
     */
    int endTime;

    /**
     * The duration of the game log.
     * @type {number}
     */
    int duration;

    /**
     * A list of game states over time.
     * @type {!Array<!GameState>}
     */
    //this.gameStateList = [];

    /**
     * A list of game scores over time.
     * @type {!Array<!GameScore>}
     */
    //this.gameScoreList = [];

    /**
     * Indicator if the game log is fully loaded.
     * @type {boolean}
     */
    boolean fullyLoaded = false;

    /**
     * The callback function to call when this game log instance is refreshed
     * @type {!Function | undefined}
     */
    //this.onChange = undefined;

}
