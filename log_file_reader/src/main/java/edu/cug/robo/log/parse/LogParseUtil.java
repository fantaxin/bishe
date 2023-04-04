package edu.cug.robo.log.parse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sun.javaws.IconUtil;
import edu.cug.robo.enums.*;
import edu.cug.robo.log.*;
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

    public static String parseFileHeader(Game gameLog, BufferedReader br) throws IOException {
        String line = readValidLine("", br, false);

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
            gameLog.setOther(new String[0]);
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
            gameLog.setOther(lineSplit[3].split(" "));
        }

        return "";
    }

    // line 为 null 时，代表文件已经读取完毕
    public static String parseLogBody(Game gameLog, String line, BufferedReader br, int limit) throws IOException {
        switch (gameLog.getLogType()) {
            case REPLAY:
                return parseReplayBody(gameLog, line, br, limit);
            case SERVER:
                //return parseServerBody(gameLog, line, br, limit);
            default:
                throw new IllegalArgumentException("log type error!");
        }
    }

    //private static String parseServerBody(Game gameLog, String line, BufferedReader br, int limit) {return null;}

    // line 为 null 时，代表文件已经读取完毕
    private static String parseReplayBody(Game gameLog, String line, BufferedReader br, int limit) throws IOException {

        boolean firstParseFrame = true;
        while (limit > 0 && line != null) {
            line = readValidLine(line, br, false);

            String[] lineSplit = line.split(" ");
            LineType lineType = LineType.getType(lineSplit[0]);
            //System.out.println(limit);
            if(limit==3432){
                //System.out.println(1);
            }
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
                    line = parseReplayFrame(gameLog, line, br, firstParseFrame);
                    firstParseFrame = false;
                    limit--;
                    break;
                default:
                    throw new IllegalArgumentException("log format error!");
            }
        }
        return line;
    }

    /**
     * EP { "goal_width": 14.02, "inertia_moment": 5}
     */
    private static String parseReplayEP(Game gameLog, String line) {

        // 文件行示例：EP {"goal_width": 14.02,"team_actuator_noise": false,...}
        String[] lineSplit = line.split("\\{", 2);
        LogParams environmentParams = new LogParams(parseJsonAsMap("{" + lineSplit[1]));

        gameLog.setEnvironmentParams(environmentParams);

        return "";
    }

    private static String parseReplayPP(Game gameLog, String line) {

        String[] lineSplit = line.split("\\{", 2);
        LogParams playerParams = new LogParams(parseJsonAsMap("{" + lineSplit[1]));

        gameLog.setPlayerParams(playerParams);

        return "";
    }

    private static String parseReplayPT(Game gameLog, String line) {

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
        if (PTNum == gameLog.getPlayerTypes().size()) {
            gameLog.getPlayerTypes().add(playerType);
        } else {
            throw new IllegalArgumentException("player type error!");
        }

        return "";
    }

    private static String parseReplayTeam(Game gameLog, String line) {

        String[] lineSplit = line.split(" ");
        if (lineSplit.length == 3 || lineSplit.length == 5) {
            LogTeam leftTeam = new LogTeam(lineSplit[1]);
            LogTeam rightTeam = new LogTeam(lineSplit[2]);
            rightTeam.setSide(TeamSide.RIGHT);
            leftTeam.setSide(TeamSide.LEFT);
            if (lineSplit.length == 5) {
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
    private static String parseReplayFrame(Game gameLog, String line, BufferedReader br, boolean firstParseFrame) throws IOException {
        //line = readValidLine(line, br, true);

        // 初始化 frames
        if (gameLog.getFrames() == null) {
            //TODO: 后续实现文件倒读，获取文件行数，初始化 frames

            gameLog.setFrames(new LinkedList<>());
        }

        //TODO: 实现为一个方法
        String[] lineSplit = line.split(" ");
        LogFrame frame = new LogFrame();
        gameLog.getFrames().add(frame);

        LogScoreState scoreState = new LogScoreState();
        if (lineSplit.length == 3 || lineSplit.length >= 5) {
            frame.setTime(Double.parseDouble(lineSplit[1]));
            frame.setGameMode(PlayMode.valueOf(lineSplit[2]));
            if (lineSplit.length >= 5) {
                scoreState.setGoalsLeft(Integer.parseInt(lineSplit[3]));
                scoreState.setGoalsRight(Integer.parseInt(lineSplit[4]));
                //frame.setLeftScore(Integer.parseInt(lineSplit[3]));
                //frame.setRightScore(Integer.parseInt(lineSplit[4]));
            }
        } else {
            //TODO: 应该在哪里处理
            throw new IllegalArgumentException("frame error!");
        }
        line = "";

        //TODO: 实现为一个方法
        line = readValidLine(line, br, true);
        lineSplit = line.split(" ");
        LogBallState ballState = new LogBallState();
        frame.setBallState(ballState);
        if (lineSplit.length == 3 || lineSplit.length >= 5) {
            ballState.setX(Double.parseDouble(lineSplit[1]));
            ballState.setY(Double.parseDouble(lineSplit[2]));
            if (lineSplit.length >= 5) {
                ballState.setVx(Double.parseDouble(lineSplit[3]));
                ballState.setVy(Double.parseDouble(lineSplit[4]));
            }
        } else {
            //TODO: 应该在哪里处理
            throw new IllegalArgumentException("frame error!");
        }
        line = "";

        List<LogPlayerState> l_playerStates = new ArrayList<>();
        List<LogPlayerState> r_playerStates = new ArrayList<>();

        frame.setLeftAgentStates(l_playerStates);
        frame.setRightAgentStates(r_playerStates);

        while (true) {
            line = readValidLine(line, br, true);
            if (line == null) {
                break;
            }
            LogPlayerState playerState = new LogPlayerState();
            LineType lineType = LineType.getType(line.split(" ")[0]);
            if (lineType.equals(LineType.Left)) {
                l_playerStates.add(playerState);
            } else if (lineType.equals(LineType.Right)) {
                r_playerStates.add(playerState);
            } else {
                break;
            }
            int idx = parseReplayPlayerState(gameLog, playerState, line, firstParseFrame);
            if(idx!=-1){
                int agentNum = lineType.equals(LineType.Left)?l_playerStates.size():r_playerStates.size();
                LogAgent agent = (lineType.equals(LineType.Left)? gameLog.getLeftTeam(): gameLog.getRightTeam()).getAgentDescriptions().get(agentNum-1);
                int pre_idx = agent.getAgentTypeIdx();
                agent.setAgentTypeIdx(idx);
                frame.getAgentChange().add(lineType +"_"+agentNum+"_"+pre_idx+"_"+idx);
            }

            line = "";
        }

        return line;
    }

    private static int parseReplayPlayerState(Game gameLog, LogPlayerState playerState, String line, boolean firstParseFrame) {
        boolean version1 = gameLog.getLogVersion() == 1;

        //LogPlayerState playerState = new LogPlayerState();
        String[] lineSplit = line.split("\\(");
        String[] paramSplit = lineSplit[0].split(" ");

        int index = 0;
        int indexOffset = 0;

        LogAgent logAgent = null;

        if(firstParseFrame){
            logAgent = new LogAgent();

            logAgent.setSide(TeamSide.getTeamSide(paramSplit[index++]));
            logAgent.setNum(Integer.parseInt(paramSplit[index++]));
        }else{
            //playerState.setSide(TeamSide.getTeamSide(paramSplit[index++]));
            //playerState.setNumber(Integer.parseInt(paramSplit[index++]));
            index++;
            index++;
        }

        int playerTypeIdx = -1;
        if (version1) {
            //int playerTypeIdx = -1;
            if((paramSplit[0].equals("R") || paramSplit[0].equals("L"))){
                playerTypeIdx = Integer.parseInt(paramSplit[index+indexOffset++]);
                if(!firstParseFrame){

                }else{
                    logAgent.setAgentTypeIdx(playerTypeIdx);
                    //logAgent.setOtherAgentParam();
                    if(paramSplit[0].equals("R")){
                        gameLog.getRightTeam().getAgentDescriptions().add(logAgent);
                    }else{
                        gameLog.getLeftTeam().getAgentDescriptions().add(logAgent);
                    }
                }
            }
            playerState.setPlayerTypeIdx(playerTypeIdx);
            playerState.setFlag(Integer.decode(paramSplit[index + indexOffset++]));
        } else if (paramSplit[0].equals("R") || paramSplit[0].equals("L")) {
            // 现在还不知道这什么意思
            playerState.setFlag(0x9);
        }

        playerState.setX(Double.parseDouble(paramSplit[indexOffset+index++]));
        playerState.setY(Double.parseDouble(paramSplit[indexOffset+index++]));

        Double[] angles = playerState.getAngles();
        //List<Double> angles = new ArrayList<>();
        angles[0]=(Double.parseDouble(paramSplit[indexOffset+index++]));
        //angles.add(Double.parseDouble(paramSplit[indexOffset+index++]));
        //playerState.setHeading_angle(Double.parseDouble(paramSplit[indexOffset+index++]));

        if (version1) {
            angles[1]=(Double.parseDouble(lineSplit[1].split("\\)")[0].split(" ")[1]));
            //angles.add(0.0);
            //playerState.setJoint_angle(Double.parseDouble(lineSplit[1].split("\\)")[0].split(" ")[1]));
            playerState.setStamina(Double.parseDouble(lineSplit[2].split("\\)")[0].split(" ")[1]));
        } else {
            //angles.add(0.0);
            angles[2]=(Double.parseDouble(paramSplit[index++]));
            //playerState.setNeck_angle(Double.parseDouble(paramSplit[index++]));
            playerState.setStamina(Double.parseDouble(paramSplit[index].split("#")[1]));
        }
        //playerState.setAngles(angles);

        return firstParseFrame?-1:playerTypeIdx;
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
        return json.getInnerMap();
    }

/*
    // 如果未进行处理，则返回改行
    private static String parseLog(Game gameLog, String line, BufferedReader br) throws IOException {

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

    private static void parse2DLog(Game gameLog, BufferedReader br) throws IOException {

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

    private static void parse2DLogV0(Game gameLog, BufferedReader br) {

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

    private static void parse2DLogV1(Game gameLog, BufferedReader br) {

    }

    private static void parse3DLog(Game gameLog, BufferedReader br) throws IOException {

        throw new IOException("不支持3D游戏日志解析");
    }

*/

}
