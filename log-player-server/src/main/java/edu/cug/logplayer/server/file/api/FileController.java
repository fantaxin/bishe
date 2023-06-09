package edu.cug.logplayer.server.file.api;

import edu.cug.logplayer.server.file.application.LogFileService;
import edu.cug.logplayer.server.file.domain.FileMgr;
import edu.cug.logplayer.server.file.model.LogFile;
import edu.cug.logplayer.server.utils.LogConstant;
import edu.cug.logplayer.server.utils.LogFileUtil;

import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * edu.cug.logplayer.server.file.api.FileController
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/28]
 */
@RestController
@RequiredArgsConstructor
public class FileController {

    private final LogFileService logFileService;

    private final LogFileUtil logFileUtil;

    private final FileMgr fileMgr;

    @RequestMapping(value = "/downloadFile/**", method = RequestMethod.GET)
    public void downloadFileByUrl(HttpServletRequest request, HttpServletResponse response) {
        String url = logFileUtil.getFileUrl(request.getServletPath());
        downloadFile(response, url);
    }

    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
    public void downloadFileById(@PathParam("id") long id, HttpServletResponse response) {
        LogFile logFile = logFileService.getFileInfoById(id);
        String url = logFile.getUrl();
        downloadFile(response, url);
    }

    private void downloadFile(HttpServletResponse response, String url) {
        String filename = logFileUtil.getBaseFileName(url) + LogConstant.REPLAY_FILE_SUFFIX + LogConstant.COMPRESS_SUFFIX;
        try {
            // 获取文件输入流
            InputStream in = logFileService.getLocalFile(logFileUtil.getFileUrl(url));
            response.reset();
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            response.addHeader("Access-Control-Allow-Origin", "*");//这个必须要加
            response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
            int s = in.available();
            response.addHeader("Content-Length", ""+s);
            response.addHeader("Accept-Encoding", "");
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            fileMgr.writeStream(in, out);
            in.close();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @RequestMapping(value = "/JsonFile/**", method = RequestMethod.GET)
    public void jsonFile(HttpServletRequest request, HttpServletResponse response) {
        String url = logFileUtil.getFileUrl(request.getServletPath());
        String filename = logFileUtil.getBaseFileName(url) + LogConstant.JSON_SUFFIX + LogConstant.COMPRESS_SUFFIX;
        try {
            // 获取文件输入流
            InputStream in = logFileService.getJsonFile(url);
            response.reset();
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            fileMgr.writeStream(in, out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/playFile", method = RequestMethod.POST)
    public void playFile(@RequestParam("file") MultipartFile file, HttpServletResponse response) {
        try {
            InputStream in = logFileService.getPlayFile(file);
            response.reset();
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            response.addHeader("Content-Length", "" + file.getSize()*2);
            response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("filename", "UTF-8"));
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            fileMgr.writeStream(in, out);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 解析文件为json
        // 发送文件
    }

    @RequestMapping(value = "/fileList", method = RequestMethod.GET)
    public List<LogFile> fileList(@PathParam("id") long id) {
        return logFileService.getFileList(id);
    }
    @RequestMapping(value = "/fileListUrl", method = RequestMethod.GET)
    public List<LogFile> fileList(@PathParam("url") String url) {
        return logFileService.getFileList(url);
    }
}
