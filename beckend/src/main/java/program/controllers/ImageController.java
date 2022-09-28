package program.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import program.repositories.ProductRepository;
import program.services.ImageService;
import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ImageController {

    /*@Autowired
    private ImageService imageService;

    @Autowired
    ProductRepository productRepository;
*/
    /*@PostMapping("/images/{productId}/uploadFile")
    public ImageEntity uploadFile(@PathVariable(value = "productId") Long productId, @RequestParam("file") MultipartFile file) {
        ImageEntity fileName = imageService.storeFile(productId, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName.getFileName())
                .toUriString();
        fileName.setProduct(productRepository.getById(productId));

        return fileName;
    }
//fix image
    @PostMapping("products/{productId}/uploadMultipleFiles")
    public List< ImageEntity > uploadMultipleFiles(@PathVariable(value = "productId") Long productId, @RequestParam("files") MultipartFile[] files) {
       return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(productId,file))
                .collect(Collectors.toList());
    }

*/
    /*@GetMapping("/images/downloadFile/{fileName:.+}")
    public ResponseEntity< Resource > downloadFile(@PathVariable String fileName,HttpServletRequest request) {
        // Load file as Resource
        ImageEntity dbFile = imageService.getFile(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }*/

    /*@GetMapping("products/{productId}/downloadFiles")
    public ResponseEntity <List<Resource >> downloadFiles(@PathVariable(value = "productId") Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Not found Product with id = " + productId);
        }
        Product product = productRepository.getById(productId);
        List<ImageEntity> files = product.getImages();
        List<Resource> resourceList = null;
        for (ImageEntity dbFile : files
        ) {
            resourceList =
                    (List<Resource>) ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                            .body(new ByteArrayResource(dbFile.getData()));
        }
        return ResponseEntity.ok(resourceList);
    }*/

}
