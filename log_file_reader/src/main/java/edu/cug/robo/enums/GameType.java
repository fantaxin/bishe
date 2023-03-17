package edu.cug.robo.enums;

import java.io.IOException;

/**
 * edu.cug.robo.enums.GameType
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
public enum GameType {

    TWO_D,
    THREE_D;

    public static GameType getGameType(String gameType) throws IOException {
        switch (gameType) {
            case "2D":
                return TWO_D;
            case "3D":
                return THREE_D;
            default:
                throw new IOException("game type error!");
        }
    }
}
