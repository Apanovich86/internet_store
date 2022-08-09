package program.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import program.entities.ImageEntity;
import program.exeptions.FileNotFoundException;
import program.exeptions.FileStorageException;
import program.repositories.ImageRepository;
import java.io.IOException;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public ImageEntity storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            ImageEntity dbFile = new ImageEntity(fileName, file.getContentType(), file.getBytes());

            return imageRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public ImageEntity getFile(String fileId) {
        return imageRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileId));
    }
}

