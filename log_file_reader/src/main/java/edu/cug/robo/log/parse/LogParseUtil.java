package edu.cug.robo.log.parse;

import edu.cug.robo.LogUtil;
import edu.cug.robo.enums.GameType;
import edu.cug.robo.enums.LogType;
import edu.cug.robo.log.GameLog;
import java.io.BufferedReader;
import java.io.IOException;
import com.alibaba.fastjson.JSON;

/**
 * edu.cug.robo.log.parse.LogParseUtil
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogParseUtil {

    private static void parseLog(GameLog gameLog, BufferedReader br) throws IOException {

        String firstLine = br.readLine();
        String[] firstLineSplit = firstLine.split(" ");
        if (firstLineSplit[0].equals(LogUtil.LOG_REPLAY)) {

            gameLog.setLogType(LogType.REPLAY);

            if (firstLineSplit.length < 3) {
                throw new IOException(".replay log format error!");
            }

            gameLog.setGameType(GameType.getGameType(firstLineSplit[1]));
            gameLog.setLogVersion(Integer.parseInt(firstLineSplit[2]));

            if (firstLineSplit.length > 3) {
                gameLog.setOther(firstLineSplit[3]);
            }
        }

        switch (gameLog.getGameType()) {
            case TWO_D:
                parse2DLog(gameLog, br);
                break;
            case THREE_D:
                parse3DLog(gameLog, br);
                break;
            default:
                throw new IOException(".replay log gameType error");

        }

    }

    private static void parse2DLog(GameLog gameLog, BufferedReader br) throws IOException {

        switch (gameLog.getLogVersion()) {
            case 0:
                parse2DLogV0(gameLog, br);
                break;
            case 1:
                parse2DLogV1(gameLog, br);
                break;
            default:
                throw new IOException(".replay log logVersion error");
        }
    }

    private static void parse2DLogV0(GameLog gameLog, BufferedReader br) {

        try {
            //EP {"goal_width": 14.02,"team_actuator_noise": false,...}
            String line = br.readLine();
            String[] lineSplit = line.split("\\{", 2);
            String[] lineHeader = lineSplit[0].split(" ");
            String lineType = lineHeader[0];
            String lineBody = "{" + lineSplit[1];

            switch (lineType){
                case LogUtil.LOG_REPLAY_ENVIRONMENT_PARAM:
                    //gameLog.setEp(JSON.parseObject(lineBody, EP.class));
                    break;
                case LogUtil.LOG_REPLAY_PLAYER_PARAM:
                    //gameLog.setSp(JSON.parseObject(lineBody, SP.class));
                    break;
                case LogUtil.LOG_REPLAY_PLAYER_TYPE:
                    //gameLog.setPt(JSON.parseObject(lineBody, PT.class));
                    break;
                case LogUtil.LOG_REPLAY_TEAM:

            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void parse2DLogV1(GameLog gameLog, BufferedReader br) {

    }

    private static void parse3DLog(GameLog gameLog, BufferedReader br) throws IOException {

        throw new IOException("不支持3D游戏日志解析");
    }

}