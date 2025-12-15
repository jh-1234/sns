package com.example.study.service;

import com.example.study.common.CommonUtils;
import com.example.study.dto.FileDTO;
import com.example.study.entity.File;
import com.example.study.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FileService {

    @Value("${image.upload.path}")
    private String imageUploadDir;

    @Value("${image.load.path}")
    private String imageLoadPath;

    private final FileRepository fileRepository;

    private static final Map<String, String> MODULE_PATH_MAP = Map.of("test1", "test2"
    );

    public void uploadImage(List<MultipartFile> images, String moduleType, Long moduleId) {
        if (!images.isEmpty()) {
            Path savePath;
            Path loadPath;
            String originalFilename;
            String uploadFilename;
            String filename;
            String ext;
            File file;
            int pos;
            String modulePath = MODULE_PATH_MAP.get(moduleType);

            if (!StringUtils.hasText(modulePath)) {
                throw new IllegalArgumentException();
            }

            Path dir = Path.of(imageUploadDir, modulePath);

            if (Files.notExists(dir)) {
                try {
                    Files.createDirectories(dir);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            try {
                for (MultipartFile image : images) {
                    if (image == null) {
                        continue;
                    }

                    originalFilename = image.getOriginalFilename();

                    if (!StringUtils.hasText(originalFilename) || !originalFilename.contains(".")) {
                        throw new IllegalArgumentException();
                    }

                    pos = originalFilename.lastIndexOf(".");
                    filename = originalFilename.substring(0, pos);
                    ext = Objects.requireNonNull(originalFilename).substring(pos);

                    if (!CommonUtils.imageTypeCheck(image.getContentType()) || !CommonUtils.imageExtCheck(ext.toLowerCase())) {
                        throw new IllegalArgumentException();
                    }

                    uploadFilename = UUID.randomUUID().toString().concat(ext);
                    savePath = Path.of(imageUploadDir, modulePath, uploadFilename);
                    loadPath = Path.of(imageLoadPath, modulePath, uploadFilename);

                    file = new File();
                    file.setOriginalName(originalFilename);
                    file.setUploadName(uploadFilename);
                    file.setBasename(filename);
                    file.setFileExt(ext);
                    file.setFileSize(image.getSize());
                    file.setFilePath(savePath.toString());
                    file.setFileLoadPath(loadPath.toString());
                    file.setModuleType(moduleType);
                    file.setModuleId(moduleId);

                    image.transferTo(savePath);

                    fileRepository.save(file);
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public List<FileDTO> getImages(String moduleType, Long moduleId) {
        return findByModuleTypeAndModuleId(moduleType, moduleId).stream().map(image -> new FileDTO(image.getFileId(), image.getBasename(), image.getFileLoadPath())).toList();
    }

    private List<File> findByModuleTypeAndModuleId(String moduleType, Long moduleId) {
        return fileRepository.findAllByModuleTypeAndModuleIdAndDelYn(moduleType, moduleId, "N");
    }

    public void remove(Long fileId) {
        fileRepository.remove(fileId);
    }

    public void fileRemove(Long fileId) {
        fileRepository.fileRemove(fileId);
    }

    public List<File> getRemoveTargetList() {
        return fileRepository.findAllByDelYn("Y");
    }
}
