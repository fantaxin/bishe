package edu.cug.logplayer.server.log;

import edu.cug.logplayer.server.enums.TeamSide;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * edu.cug.robo.log.LogTeam
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/17]
 */
@Setter
@Getter
@ToString
public class LogTeam {

    String name;
    TeamSide side;
    String color = "#FFFFFF";
    List<LogAgent> agentDescriptions = new ArrayList<>();

    public LogTeam(String name) {
        this.name = name;
    }
}
