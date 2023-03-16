package edu.cug.robo.log;

import java.util.HashMap;

/**
 * edu.cug.robo.log.LogParams
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogParams {

    private final HashMap<String, String> params = new HashMap<>();

    public void addParam(String key, String value) {
        params.put(key, value);
    }

    public String getParam(String key) {
        return params.get(key);
    }
}

