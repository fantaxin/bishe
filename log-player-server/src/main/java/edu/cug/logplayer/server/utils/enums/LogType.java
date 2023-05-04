package edu.cug.logplayer.server.utils.enums;

import edu.cug.logplayer.server.utils.LogConstant;
import java.io.IOException;

/**
 * edu.cug.robo.enums.LogType
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public enum LogType {

    REPLAY,
    SERVER,
    UNKNOWN;

    public static LogType getType(String type) throws IOException {

        switch (type) {
            case "replay":
            case LogConstant.LOG_REPLAY:
                return REPLAY;
            case "rcg":
            case LogConstant.LOG_RCG:
                return SERVER;
            default:
                return UNKNOWN;
        }
    }
}
