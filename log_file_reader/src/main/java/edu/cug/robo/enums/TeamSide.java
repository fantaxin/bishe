package edu.cug.robo.enums;

import lombok.ToString;

/**
 * edu.cug.robo.enums.TeamSide
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/14]
 */
@ToString()
public enum TeamSide {
    /**
     * Left team side.
     */
    LEFT{
        @Override
        public String toString() {
            return "L";
        }
    },

    /**
     * Right team side.
     */
    RIGHT{
        @Override
        public String toString() {
            return "R";
        }
    },

    /**
     * Neutral team side.
     */
    NEUTRAL {
        @Override
        public String toString() {
            return "N";
        }
    }
}
