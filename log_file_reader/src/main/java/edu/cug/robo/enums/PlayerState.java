package edu.cug.robo.enums;

/**
 * edu.cug.robo.enums.PlayerState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/15]
 */
public enum PlayerState {
    DISABLE,
    STAND,
    KICK,
    KICK_FAULT,
    GOALIE,
    CATCH,
    CATCH_FAULT,
    BALL_TO_PLAYER,
    PLAYER_TO_BALL,
    DISCARD,
    LOST,               // [I.Noda:00/05/13] added for 3D viewer/commentator/small league
    BALL_COLLIDE,       // player collided with the ball
    PLAYER_COLLIDE,     // player collided with another player
    TACKLE,
    TACKLE_FAULT,
    BACK_PASS,
    FREE_KICK_FAULT,
    POST_COLLIDE,       // player collided with goal posts
    FOUL_CHARGED,       // player is frozen by intentional tackle foul
    YELLOW_CARD,
    RED_CARD,
    ILLEGAL_DEFENSE,
}
