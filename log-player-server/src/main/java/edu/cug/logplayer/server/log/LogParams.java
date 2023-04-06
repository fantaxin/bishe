package edu.cug.logplayer.server.log;

import java.util.Map;

/**
 * edu.cug.robo.log.LogParams
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class LogParams {

    private final Map<String, Object> params;

    public LogParams(Map<String, Object> params) {
        this.params = params;
    }

    public void addParam(String key, Object value) {
        params.put(key, value);
    }

    public Object getParam(String key) {

        if (!params.containsKey(key)) {
            return null;
        }
        return params.get(key);
    }

    public <T> T getParam(String key, Class<T> clazz) {

        if (!params.containsKey(key)) {
            return null;
        }
        if(!clazz.isInstance(params.get(key))) {
            return null;
        }
        return clazz.cast(params.get(key));
    }

}

