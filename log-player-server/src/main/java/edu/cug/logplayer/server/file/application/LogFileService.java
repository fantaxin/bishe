package edu.cug.logplayer.server.file.application;

import cn.hutool.core.compress.Gzip;
import edu.cug.logplayer.server.file.domain.FileMgr;
import edu.cug.logplayer.server.file.model.LogFile;
import edu.cug.logplayer.server.utils.LogConstant;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import edu.cug.logplayer.server.file.domain.LogMgr;
import edu.cug.logplayer.server.utils.LogFileUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * edu.cug.logplayer.server.file.application.LogFileService
 *
 * @author wangxin
 * @version [1.0.0, 2023/04/28]
 */
@Service
public class LogFileService {

    @Value("${file.base-local-url}")
    private String baseUrl;

    @Value("${file.base-net-url}")
    private String baseNetUrl;

    @Value("${file.base-net-url-root}")
    private String baseNetUrlRoot;

    @Resource
    private LogMgr logMgr;

    @Resource
    private FileMgr fileMgr;

    @Resource
    private LogFileUtil logFileUtil;

    public List<LogFile> getFileList(long id){
        return logMgr.getChildren(id);
    }

    public InputStream getJsonFile(String url) throws IOException {
        String fileUrl = url + LogConstant.JSON_SUFFIX;
        InputStream in = fileMgr.getLocalFile(fileUrl);
        if(in == null){
            InputStream fileIn = getLocalFile(url);
            GZIPInputStream gzipIn = new GZIPInputStream(fileIn);
            String json = fileMgr.parse2Json(gzipIn, logFileUtil.getFileName(url) + LogConstant.REPLAY_FILE_SUFFIX);
            fileMgr.save2LocalWithZip(fileUrl, new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8)));
            in = fileMgr.getLocalFile(fileUrl);
            gzipIn.close();
        }
        return in;
    }

    public InputStream getLocalFile(String url) throws IOException {
        String fileUrl = url + LogConstant.REPLAY_FILE_SUFFIX;
        InputStream in = fileMgr.getLocalFile(fileUrl);
        if(in == null){
            in = getNetFile(url);
            fileMgr.save2Local(fileUrl + LogConstant.COMPRESS_SUFFIX, in);
            in = fileMgr.getLocalFile(fileUrl);
        }
        return in;
    }

    public InputStream getNetFile(String url) throws IOException {
        InputStream in = fileMgr.getNetFile(url);
        if(in == null){
            throw new FileNotFoundException();
        }
        return in;
    }

    public InputStream getPlayFile(MultipartFile file) throws IOException {
        // 将上传的文件转为json
        InputStream in = file.getInputStream();
        String json = fileMgr.parse2Json(in, file.getOriginalFilename());
        in.close();
        // 压缩json数据
        GZIPOutputStream gzipOut = new GZIPOutputStream(new ByteArrayOutputStream());
        gzipOut.write(json.getBytes(StandardCharsets.UTF_8));
        gzipOut.close();
        // 返回输入流
        return new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8));
    }

    public void downloadFile(String fileName, HttpServletResponse response){
        String url = baseUrl + fileName;
        try {
            File file = new File(url);
            if(file.exists()){
                //logFileMgr.getLocalFile();
            }else{
                //logFileMgr.getNetFile();
            }
            // 获取文件名
            String filename = file.getName();
            // 获取文件后缀名
            String ext = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

            // 将文件写入输入流
            FileInputStream fileInputStream = new FileInputStream(file);
            InputStream fis = new BufferedInputStream(fileInputStream);
            byte[] buffer = new byte[fis.available()];
            int size = fis.read(buffer);
            fis.close();

            // 清空response
            response.reset();
            // 设置response的Header
            response.setCharacterEncoding("UTF-8");
            //Content-Disposition的作用：告知浏览器以何种方式显示响应返回的文件，用浏览器打开还是以附件的形式下载到本地保存
            //attachment表示以附件方式下载   inline表示在线打开   "Content-Disposition: inline; filename=文件名.mp3"
            // filename表示文件的默认名称，因为网络传输只支持URL编码的相关支付，因此需要将文件名URL编码后进行传输,前端收到后需要反编码才能获取到真正的名称
            response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
            // 告知浏览器文件的大小
            response.addHeader("Content-Length", "" + file.length());
            OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            outputStream.write(buffer);
            outputStream.flush();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
