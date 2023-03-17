package edu.cug.robo.log.parse;

import static edu.cug.robo.LogUtil.LOG_REPLAY_ENVIRONMENT_PARAM;
import static edu.cug.robo.LogUtil.LOG_REPLAY_PLAYER_PARAM;
import static edu.cug.robo.LogUtil.LOG_REPLAY_PLAYER_TYPE;
import static edu.cug.robo.LogUtil.LOG_REPLAY_TEAM;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import edu.cug.robo.LogUtil;
import edu.cug.robo.enums.GameType;
import edu.cug.robo.enums.LineType;
import edu.cug.robo.enums.LogType;
import edu.cug.robo.enums.PlayMode;
import edu.cug.robo.log.GameLog;
import edu.cug.robo.log.LogBallState;
import edu.cug.robo.log.LogFrame;
import edu.cug.robo.log.LogTeam;
import edu.cug.robo.log.LogParams;
import edu.cug.robo.state.Frame;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * edu.cug.robo.log.parse.LogParseUtil
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogParseUtil {

    public static String parseFileHeader(GameLog gameLog, String line, BufferedReader br) throws IOException {
        line = readValidLine(line, br, false);

        // 第3部分之后的数据，不需要进行解析，全部存入other中(包含空格)
        String[] lineSplit = line.split(" ", 4);

        LogType logType = LogType.getType(lineSplit[0]);
        String[] logPathSplit = gameLog.getLogPath().split("\\.");
        LogType fileLogType = LogType.getType(logPathSplit[logPathSplit.length - 1]);

        // 默认，如果未知类型，使用文件后缀名
        if (logType == LogType.UNKNOWN) {
            gameLog.setLogType(fileLogType);
            gameLog.setGameType(GameType.TWO_D);
            gameLog.setLogVersion(0);
            gameLog.setOther("");
            // 该行数据应在下一部分进行处理
            return line;
        } else if (logType != fileLogType) {
            // 如果类型不一致，抛出异常
            throw new IllegalArgumentException("log type error!");
        }

        if (lineSplit.length < 2) {
            throw new IllegalArgumentException("log file header error!");
        }

        gameLog.setLogType(logType);
        gameLog.setGameType(GameType.getGameType(lineSplit[1]));
        if (lineSplit.length > 2) {
            gameLog.setLogVersion(Integer.parseInt(lineSplit[2]));
        }
        // 剩余信息
        if (lineSplit.length > 3) {
            gameLog.setOther(lineSplit[3]);
        }

        return "";
    }

    // line 为 null 时，代表文件已经读取完毕
    public static String parseLogBody(GameLog gameLog, String line, BufferedReader br, int limit) throws IOException {
        switch (gameLog.getLogType()) {
            case REPLAY:
                return parseReplayBody(gameLog, line, br, limit);
            case SERVER:
                //return parseServerBody(gameLog, line, br, limit);
            default:
                throw new IllegalArgumentException("log type error!");
        }
    }

    //private static String parseServerBody(GameLog gameLog, String line, BufferedReader br, int limit) {return null;}

    // line 为 null 时，代表文件已经读取完毕
    public static String parseReplayBody(GameLog gameLog, String line, BufferedReader br, int limit) throws IOException {

        while (limit > 0) {
            line = readValidLine(line, br, false);

            String[] lineSplit = line.split(" ");
            LineType lineType = LineType.getType(lineSplit[0]);

            switch (lineType) {
                case EnvironmentParams:
                    line = parseReplayEP(gameLog, line);
                    break;
                case PlayerParams:
                    line = parseReplayPP(gameLog, line);
                    break;
                case PlayerType:
                    line = parseReplayPT(gameLog, line);
                    break;
                case Team:
                    line = parseReplayTeam(gameLog, line);
                    break;
                case Server:
                    line = parseReplayFrame(gameLog, line, br);
                    limit--;
                    break;
                default:
                    throw new IllegalArgumentException("log format error!");
            }
        }
        return "";
    }

    /**
     * EP { "goal_width": 14.02, "inertia_moment": 5}
     */
    private static String parseReplayEP(GameLog gameLog, String line) {

        // 文件行示例：EP {"goal_width": 14.02,"team_actuator_noise": false,...}
        String[] lineSplit = line.split("\\{", 2);
        LogParams environmentParams = new LogParams(parseJsonAsMap("{" + lineSplit[1]));

        gameLog.setEnvironmentParams(environmentParams);

        return "";
    }

    private static String parseReplayPP(GameLog gameLog, String line) {

        String[] lineSplit = line.split("\\{", 2);
        LogParams playerParams = new LogParams(parseJsonAsMap("{" + lineSplit[1]));

        gameLog.setPlayerParams(playerParams);

        return "";
    }

    private static String parseReplayPT(GameLog gameLog, String line) {

        // 初始化 playerTypes
        if (gameLog.getPlayerTypes() == null) {
            Integer initialCapacity = gameLog.getEnvironmentParams().getParam("player_types", Integer.class);
            ArrayList<LogParams> playerTypes = new ArrayList<>(initialCapacity == null ? 10 : initialCapacity);
            gameLog.setPlayerTypes(playerTypes);
        }

        String[] lineSplit = line.split("\\{", 2);
        String[] lineHeader = lineSplit[0].split(" ");

        LogParams playerType = new LogParams(parseJsonAsMap("{" + lineSplit[1]));

        int PTNum = Integer.parseInt(lineHeader[1]);
        if(PTNum == gameLog.getPlayerTypes().size()) {
            gameLog.getPlayerTypes().add(playerType);
        }else{
            throw new IllegalArgumentException("player type error!");
        }

        return "";
    }

    private static String parseReplayTeam(GameLog gameLog, String line) {

        String[] lineSplit = line.split(" ");
        if(lineSplit.length == 3 || lineSplit.length == 5){
            LogTeam leftTeam = new LogTeam(lineSplit[1]);
            LogTeam rightTeam = new LogTeam(lineSplit[2]);
            if(lineSplit.length == 5){
                leftTeam.setColor(lineSplit[3]);
                rightTeam.setColor(lineSplit[4]);
            }
            gameLog.setLeftTeam(leftTeam);
            gameLog.setRightTeam(rightTeam);
        }

        //TODO: 不等于3或5的情况，应在解析GameLog时进行异常处理

        return "";
    }

    //S 0.1 kick_off_l 0 0
    //b 0 0
    //b 0 0 0 0
    //   L        1    -20  0        165           -105        #8000
    //{l|L|r|R} <unum> <x> <y> <heading-angle>[ <neck-angle> <stamina>]
    //L 1 0 0x9 -52 0 1.46 (j 0) (s 8000)
    private static String parseReplayFrame(GameLog gameLog, String line, BufferedReader br) throws IOException {
        line = readValidLine(line, br, true);

        // 初始化 frames
        if (gameLog.getFrames() == null) {
            //TODO: 后续实现文件倒读，获取文件行数，初始化 frames

            List<LogFrame> frames = new LinkedList<>();
        }

        //TODO: 实现为一个方法
        String[] lineSplit = line.split(" ");
        LogFrame frame = new LogFrame();
        gameLog.getFrames().add(frame);
        if(lineSplit.length == 3 || lineSplit.length >= 5){
            frame.setTime(Double.parseDouble(lineSplit[1]));
            frame.setGameState(PlayMode.valueOf(lineSplit[2]));
            if(lineSplit.length >= 5){
                frame.setLeftScore(Integer.parseInt(lineSplit[3]));
                frame.setRightScore(Integer.parseInt(lineSplit[4]));
            }
        }else{
            //TODO: 应该在哪里处理
            throw new IllegalArgumentException("frame error!");
        }

        //TODO: 实现为一个方法
        line = readValidLine("", br, true);
        lineSplit = line.split(" ");
        LogBallState ballState = new LogBallState();
        frame.setBallState(ballState);
        if(lineSplit.length == 3 || lineSplit.length >= 5){
            ballState.setX(Double.parseDouble(lineSplit[1]));
            ballState.setY(Double.parseDouble(lineSplit[2]));
            if(lineSplit.length >= 5){
                ballState.setVx(Double.parseDouble(lineSplit[3]));
                ballState.setVy(Double.parseDouble(lineSplit[4]));
            }
        }else{
            //TODO: 应该在哪里处理
            throw new IllegalArgumentException("frame error!");
        }

/*        while(true) {

            line = parseReplayPlayerState(gameLog, line, br);
        }*/

        return line;
    }

    private static String parseReplayPlayerState(GameLog gameLog, String line, BufferedReader br) throws IOException {
        line = readValidLine(line, br, true);
        return line;
    }

    /**
     * 读取有效行, 为 Null 代表文件结束
     */
    private static String readValidLine(String line, BufferedReader br, boolean allowEnd) throws IOException {
        // 如果为空代表上一阶段已经处理结束，读取下一行
        while (line != null && line.isEmpty()) {
            line = br.readLine();
        }
        if (!allowEnd && line == null) {
            throw new IOException("Missing log content!");
        }
        return line;
    }

    private static Map<String, Object> parseJsonAsMap(String jsonStr) {
        JSONObject json = JSON.parseObject(jsonStr);
        Map<String, Object> map = json.getInnerMap();
        return map;
    }


    // 如果未进行处理，则返回改行
    private static String parseLog(GameLog gameLog, String line, BufferedReader br) throws IOException {

        if (line.isEmpty()) {
            line = br.readLine();
        }
        line = br.readLine();
        String[] lineSplit = line.split(" ");
        if (lineSplit[0].equals(LogUtil.LOG_REPLAY)) {

            gameLog.setLogType(LogType.REPLAY);

            if (lineSplit.length < 3) {
                throw new IOException(".replay log format error!");
            }

            gameLog.setGameType(GameType.getGameType(lineSplit[1]));
            gameLog.setLogVersion(Integer.parseInt(lineSplit[2]));

            if (lineSplit.length > 3) {
                gameLog.setOther(lineSplit[3]);
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
        return line;
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

            switch (lineType) {
                case LOG_REPLAY_ENVIRONMENT_PARAM:
                    //gameLog.setEp(JSON.parseObject(lineBody, EP.class));
                    break;
                case LOG_REPLAY_PLAYER_PARAM:
                    //gameLog.setSp(JSON.parseObject(lineBody, SP.class));
                    break;
                case LOG_REPLAY_PLAYER_TYPE:
                    //gameLog.setPt(JSON.parseObject(lineBody, PT.class));
                    break;
                case LOG_REPLAY_TEAM:

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