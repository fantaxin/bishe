package edu.cug.logplayer.server.enums;

/**
 * edu.cug.robo.enums.TeamSide
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public enum TeamSide {

    LEFT,
    RIGHT,
    NEUTRAL;


    /**
     * 根据 String or LineType 获取 TeamSide
     *
     * @param teamSide String or LineType
     * @return TeamSide
     */
    public static TeamSide getTeamSide(Object teamSide) {

        if (teamSide instanceof String) {
            switch ((String) teamSide) {
                case "l":
                case "L":
                    return LEFT;
                case "r":
                case "R":
                    return RIGHT;
                case "n":
                case "N":
                    return NEUTRAL;
                default:
                    return null;
            }
        } else if (teamSide instanceof LineType) {
            switch ((LineType) teamSide) {
                case Left:
                    return LEFT;
                case Right:
                    return RIGHT;
                default:
                    return NEUTRAL;
            }
        }
        return null;
    }
}
