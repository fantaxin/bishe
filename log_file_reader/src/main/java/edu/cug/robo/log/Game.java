package edu.cug.robo.log;

import static edu.cug.robo.LogUtil.RCG_VERSION_MAX;
import static edu.cug.robo.LogUtil.REPLAY_VERSION_MAX;

import edu.cug.robo.enums.GameType;
import edu.cug.robo.enums.LogType;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.Game
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */

@Getter
@Setter
@ToString
public class Game {

    private String logPath;

    /**
     * RPL 2D 1 5 (日志文件格式, 比赛类型, 版本号, 不知道)
     */
    private LogType logType;
    private int logVersion = 0;
    private int frequency = 10;
    private String[] other;


    private GameType gameType;
    // 系统环境参数
    private LogParams environmentParams;

    // 球员参数
    private LogParams playerParams;

    // 球员类型 size = playerParams.getParam("player_types")
    private List<LogParams> playerTypes;


    /**
     * T HELIOS2012 WrightEagle (T, leftTeamName, rightTeamName, #leftColor, #rightColor)
     * T "iiiOfAFZ_MarliK" "Gliders2012"
     */
    LogTeam leftTeam;
    LogTeam rightTeam;

    //TODO: 后续需要分块读取以节省内存，还需要实现边读取，边解析，解析完成的Log帧可以丢弃
    private List<LogFrame> frames;

    public Game(String logPath) {
        this.logPath = logPath;
    }

    public void setLogVersion(int logVersion) {
        int maxVersion;
        switch (logType) {
            case REPLAY:
                maxVersion = REPLAY_VERSION_MAX;
                break;
            case SERVER:
                maxVersion = RCG_VERSION_MAX;
                break;
            default:
                throw new IllegalArgumentException("log type error!");
        }
        if(logVersion < 0 || logVersion > maxVersion)
            throw new IllegalArgumentException("log version must be 0 or 1");
        this.logVersion = logVersion;
    }

}
