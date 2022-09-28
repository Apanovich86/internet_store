package program.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import program.repositories.ProductRepository;

import java.util.Random;


@Service
public class ImageService {

    @Autowired
    ProductRepository productRepository;
    public String base64ToImageFile(String bases64){
        Random random=new Random();
        String ext = ".jpg";
        String name = String.format("%s%s",System.currentTimeMillis(),random.nextInt(100)+ext);
        return name;
    }
}

