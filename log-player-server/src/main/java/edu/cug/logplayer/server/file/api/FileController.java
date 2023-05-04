package edu.cug.logplayer.server.file.api;

import edu.cug.logplayer.server.file.application.LogFileService;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    /**
     * @param fileName     想要下载的文件的路径
     * @param response
     * @功能描述 下载文件:
     */
    @RequestMapping(value = "/downloadFile/{fileName}", method = RequestMethod.GET)
    public void downloadFile(@PathVariable("fileName") String fileName, HttpServletResponse response) {
        logFileService.downloadLocalFile();
        //异常处理
        try {
            String urlHead = "D:/a11406/project2/bishe/log/";
            String path = urlHead + fileName;
            // path是指想要下载的文件的路径
            File file = new File(path);
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


    @RequestMapping("/a")
    public void playFile(){
        //todo: return json.gz/zip file by file url
        // 根据url获取json文件
        //todo: 转化为实际的url
        logFileService.downloadJsonFile();
        // 异常处理
    }

    @RequestMapping("/b")
    public void fileList(){
        //todo: return json.gz/zip file by file url

    }

    public void playUploadFile(){
        // todo 接收上传的文件
        // 解析文件为json
        // 发送文件
    }
}
