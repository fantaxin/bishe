package edu.cug.robo.log;

import edu.cug.robo.enums.GameType;
import edu.cug.robo.enums.LogType;
import java.util.LinkedList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.GameLog
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */

@Getter
@Setter
@ToString
public class GameLog {

    private String logPath;

    /**
     * RPL 2D 1 5 (日志文件格式, 比赛类型, 版本号, 不知道)
     */
    private LogType logType;
    private GameType gameType;
    private int logVersion = 0;
    private String other;

    /**
     * T HELIOS2012 WrightEagle (T, leftTeamName, rightTeamName)
     * T "iiiOfAFZ_MarliK" "Gliders2012"
     */
    String[] teamNames = new String[2];

    private LogHeader header;

    private List<LogFrame> frames = new LinkedList<>();

    public GameLog(String logPath) {
        this.logPath = logPath;
    }

}
