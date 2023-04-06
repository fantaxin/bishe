package edu.cug.logplayer.server.log;

import java.util.HashMap;
import java.util.Map;

/**
 * edu.cug.robo.log.ParamsMap
 *
 * @author wangxin
 * @version [1.0.0, 2023/03/16]
 */
public class ParamsMap extends HashMap<String, Object> {

    public ParamsMap(){
        super();
    }

    public ParamsMap(Map<String, Object> map){
        super(map);
    }

    public <T> T get(String key, Class<T> clazz) {

        if (!this.containsKey(key)) {
            return null;
        }
        if(!clazz.isInstance(this.get(key))) {
            return null;
        }
        return clazz.cast(this.get(key));
    }

}

