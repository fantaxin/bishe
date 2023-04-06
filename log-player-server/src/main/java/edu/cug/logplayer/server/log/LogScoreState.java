package edu.cug.logplayer.server.log;

import lombok.Getter;
import lombok.Setter;

/**
 * edu.cug.robo.log.LogScoreState
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/31]
 */
@Setter
@Getter
public class LogScoreState {
    int goalsLeft;
    int goalsRight;
    int penScoreLeft = 0;
    int penScoreRight = 0;
    int penMissLeft = 0;
    int penMissRight = 0;
}
