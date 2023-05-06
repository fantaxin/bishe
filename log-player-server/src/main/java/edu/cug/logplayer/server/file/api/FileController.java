package edu.cug.logplayer.server.file.api;

import edu.cug.logplayer.server.file.application.LogFileService;
import edu.cug.logplayer.server.file.domain.FileMgr;
import edu.cug.logplayer.server.utils.LogConstant;
import edu.cug.logplayer.server.utils.LogFileUtil;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/DownloadFile/**", method = RequestMethod.GET)
    public void downloadFile(HttpServletRequest request, HttpServletResponse response) {
        String url = logFileUtil.getFileUrl(request.getServletPath());
        String filename = logFileUtil.getBaseFileName(url) + LogConstant.REPLAY_FILE_SUFFIX + LogConstant.COMPRESS_SUFFIX;
        try {
            // 获取文件输入流
            InputStream in = logFileService.getLocalFile(url);
            response.reset();
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/octet-stream");
            response.addHeader("Access-Control-Allow-Origin", "*");//这个必须要加
            response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            fileMgr.writeStream(in, out);
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

    @RequestMapping("/b")
    public void fileList() {
        //todo: return json.gz/zip file by file url

    }
}
