package edu.cug.robo.log;

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
    String color;

    public LogTeam(String name) {
        this.name = name;
    }
}