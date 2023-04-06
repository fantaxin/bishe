package edu.cug.logplayer.server.enums;

import edu.cug.logplayer.server.LogUtil;
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
            case LogUtil.LOG_REPLAY:
                return REPLAY;
            case "rcg":
            case LogUtil.LOG_RCG:
                return SERVER;
            default:
                return UNKNOWN;
        }
    }
}
