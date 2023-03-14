package edu.cug.robo.entity;

import edu.cug.robo.state.GameScore;
import edu.cug.robo.state.GameState;
import edu.cug.robo.state.State;
import java.util.List;
import java.util.Map;

/**
 * edu.cug.robo.entity.Game
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public class Game {

    /**
     * 1=2d 2=3d
     */
    int type = 1;

    // 播放频率
    int frequency;

    // 比分改变时刻
    List<GameScore> gameScoreList;

    // 比赛状态改变时刻
    List<GameState> gameStateList;

    // 比赛时刻
    List<State> stateList;

    // 比赛队伍
    Team leftTeam;
    // 比赛队伍
    Team rightTeam;

    // 比赛持续时间
    int duration;
    // 比赛开始时间
    int startTime;
    // 比赛结束时间
    int endTime;


    Map[] environmentParams;
    boolean fullyLoaded;

    /**
     * map{player_types: 1}
     */
    Map playerParams;

    /**
     * map{player_size: 0.3}
     */
    Map playerTypes;

}
