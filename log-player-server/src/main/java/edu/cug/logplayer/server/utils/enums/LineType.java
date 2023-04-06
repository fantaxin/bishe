package edu.cug.logplayer.server.enums;

/**
 * edu.cug.robo.enums.LineType
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/17]
 */
public enum LineType {

    EnvironmentParams,
    PlayerParams,
    PlayerType,
    Team,
    Server,
    Ball,
    Left,
    Right,
    UNKNOWN;

    public static LineType getType(String lineType) {
        switch (lineType) {
            case "EP":
                return EnvironmentParams;
            case "PP":
                return PlayerParams;
            case "PT":
                return PlayerType;
            case "T":
                return Team;
            // 下面四个感觉用不到
            case "S":
                return Server;
            case "B":
            case "b":
                return Ball;
            case "L":
            case "l":
                return Left;
            case "R":
            case "r":
                return Right;
            default:
                return UNKNOWN;
        }
    }

}
