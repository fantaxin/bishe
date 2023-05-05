package edu.cug.logplayer.server.utils.enums;

/**
 * edu.cug.robo.enums.GameMode
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/15]
 */
//@ToString
public enum GameMode {
    PM_Null, PM_BeforeKickOff, PM_TimeOver, PM_PlayOn, PM_KickOff_Left, PM_KickOff_Right, PM_KickIn_Left, PM_KickIn_Right, PM_FreeKick_Left,
    PM_FreeKick_Right, PM_CornerKick_Left, PM_CornerKick_Right, PM_GoalKick_Left, PM_GoalKick_Right, PM_AfterGoal_Left, PM_AfterGoal_Right,
    PM_Drop_Ball, PM_OffSide_Left, PM_OffSide_Right, PM_PK_Left, PM_PK_Right, PM_FirstHalfOver, PM_Pause, PM_Human, PM_Foul_Charge_Left,
    PM_Foul_Charge_Right, PM_Foul_Push_Left, PM_Foul_Push_Right, PM_Foul_MultipleAttacker_Left, PM_Foul_MultipleAttacker_Right,
    PM_Foul_BallOut_Left, PM_Foul_BallOut_Right, PM_Back_Pass_Left, PM_Back_Pass_Right, PM_Free_Kick_Fault_Left, PM_Free_Kick_Fault_Right,
    PM_CatchFault_Left, PM_CatchFault_Right, PM_IndFreeKick_Left, PM_IndFreeKick_Right, PM_PenaltySetup_Left, PM_PenaltySetup_Right,
    PM_PenaltyReady_Left, PM_PenaltyReady_Right, PM_PenaltyTaken_Left, PM_PenaltyTaken_Right, PM_PenaltyMiss_Left, PM_PenaltyMiss_Right,
    PM_PenaltyScore_Left, PM_PenaltyScore_Right, PM_Illegal_Defense_Left, PM_Illegal_Defense_Right, PM_MAX,

    play_on, offside, offside_l, offside_r, time_over,
    kick_off_r, foul_charge_r, free_kick_r, kick_in_r, goal_r, corner_kick_l, goal_kick_r,
    kick_off_l, foul_charge_l, free_kick_l, kick_in_l, goal_l, corner_kick_r, goal_kick_l,
    PLAY_ON, OFFSIDE, OFFSIDE_L, OFFSIDE_R, TIME_OVER,
    KICK_OFF_L, FOUL_CHARGE_L, FREE_KICK_L, KICK_IN_L, GOAL_L, CORNER_KICK_L, GOAL_KICK_L,
    KICK_OFF_R, FOUL_CHARGE_R, FREE_KICK_R, KICK_IN_R, GOAL_R, CORNER_KICK_R, GOAL_KICK_R,

    indirect_free_kick_r, indirect_free_kick_l;


    public GameMode getPlayMode(String str) {
        switch (str) {
            case "play_on":
                return PLAY_ON;
            case "offside_l":
                return OFFSIDE_L;
            case "offside_r":
                return OFFSIDE_R;
            case "time_over":
                return TIME_OVER;
            case "kick_off_l":
                return KICK_OFF_L;
            case "kick_off_r":
                return KICK_OFF_R;
            case "foul_charge_l":
                return FOUL_CHARGE_L;
            case "foul_charge_r":
                return FOUL_CHARGE_R;
            case "free_kick_l":
                return FREE_KICK_L;
            case "free_kick_r":
                return FREE_KICK_R;
            case "kick_in_l":
                return KICK_IN_L;
            case "kick_in_r":
                return KICK_IN_R;
            case "goal_l":
                return GOAL_L;
            case "goal_r":
                return GOAL_R;
            case "corner_kick_l":
                return CORNER_KICK_L;
            case "corner_kick_r":
                return CORNER_KICK_R;
            case "goal_kick_l":
                return GOAL_KICK_L;
            case "goal_kick_r":
                return GOAL_KICK_R;
            default:
                return PM_Null;
        }
    }


}
