package program.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.entities.*;
import program.DTO.AddProductDto;
import program.exeptions.ResourceNotFoundException;
import program.repositories.*;
import program.services.ImageService;
import javax.xml.bind.DatatypeConverter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;


@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ImageService imageService;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SizeRepository sizeRepository;

    @Autowired
    ColorRepository colorRepository;

    @GetMapping("/products/{id}") //пошук товару по ід
    public ResponseEntity<Product> getProductById(@PathVariable("id") long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + id));
        product = getProductWithImage(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/products") //відображення товарів, що містять в найменуванні значення пошуку,
                                // якщо пошук пустий - то всіх товарів
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String title) {
        List<Product> productList;
        if (title == null) {
            productList = productRepository.findAll();
            for (Product product: productList) {
                product = getProductWithImage(product);
            }
        }
        else {
            productList = productRepository.findByTitleContaining(title);
            for (Product product: productList) {
                product = getProductWithImage(product);
            }
        }
        if (productList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("categories/{categoryId}/products") // відображення всіх товарів по категорії
    public ResponseEntity<List<Product>> getProductsByCategoryId(@PathVariable(value = "categoryId") long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Not found Category with id = " + categoryId);
        }
        List<Product> productList =  productRepository.findByCategoryId(categoryId);
        for (Product product: productList) {
            product = getProductWithImage(product);
        }
        return new ResponseEntity<>(productList,HttpStatus.OK);
    }

    @PostMapping("/products/add") // додавання товару
    public ResponseEntity<Product> createProduct(@RequestBody AddProductDto addProductDto) throws IOException {
        Product product = new Product();
        Category category = new Category();
        category.setId(addProductDto.getCategoryId());
        category.setId(addProductDto.getCategoryId());
        product.setCategory(category);
        product.setTitle(addProductDto.getTitle());
        String bases64 = addProductDto.getUrlImage();
        if(!bases64.isEmpty()) {
            String name = imageService.base64ToImageFile(bases64);
            String base64ImageString = bases64.substring(bases64.indexOf(",") + 1, bases64.length());
            byte[] decodedBytes = DatatypeConverter.parseBase64Binary(base64ImageString);
            product.setUrlImage(name);
            FileOutputStream fos = new FileOutputStream("./images/" + name);
            try {
                fos.write(decodedBytes);
            } finally {
                fos.close();
            }
        }
        product.setPrice(addProductDto.getPrice());
        product.setDescription(addProductDto.getDescription());
        product.setAvailability(addProductDto.isAvailability());
        productRepository.save(product);

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}") // зміна даних по товару
    public ResponseEntity<Product> updateProducts(@PathVariable("id") long id, @RequestBody Product product) {
        Product productChange = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + id));
        Category category=categoryRepository.getById(product.getCategory().getId());
        productChange.setCategory(category);
        productChange.setTitle(product.getTitle());
        productChange.setPrice(product.getPrice());
        productChange.setDescription(product.getDescription());
        productChange.setAvailability(product.isAvailability());

        return new ResponseEntity<>(productRepository.save(productChange), HttpStatus.OK);
    }

    @DeleteMapping("/products/{id}") // видалення товару по ід
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id) {
        productRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/products") // видалення всіх товарів
    public ResponseEntity<HttpStatus> deleteAllProducts() {
        productRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private Product getProductWithImage (Product productSetImage) {
        Product product = productRepository.getById(productSetImage.getId());
        if(product.getUrlImage().contains(".")) {
            String base64 = product.getUrlImage();
            try {
                InputStream iSteamReader = new FileInputStream("./images/" + base64);
                byte[] imageBytes = IOUtils.toByteArray(iSteamReader);
                base64 = Base64.getEncoder().encodeToString(imageBytes);
                product.setUrlImage("data:image/jpeg;base64," + base64);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return product;
    }
}
