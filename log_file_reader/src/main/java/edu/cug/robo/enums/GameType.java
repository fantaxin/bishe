package edu.cug.robo.enums;

/**
 * edu.cug.robo.enums.GameType
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public enum GameType {
    /**
     * 2D game type.
     */
    TWO_D,

    /**
     * 3D game type.
     */
    THREE_D;

    public static GameType getGameType(String gameType) {
        switch (gameType) {
            case "2D":
                return TWO_D;
            case "3D":
                return THREE_D;
            default:
                return null;
        }
    }
}
