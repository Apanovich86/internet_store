package program.controllers;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.entities.ColorEntity;
import program.entities.Product;
import program.exeptions.ResourceNotFoundException;
import program.repositories.ColorRepository;
import program.repositories.ProductRepository;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ColorController {
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/colors") // відображення всіх кольорів
    public ResponseEntity<List<ColorEntity>> getColors() {
        try {
            List<ColorEntity> colorDTOList =  colorRepository.findAll();
            if (colorDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
            else {
                return new ResponseEntity<>(colorDTOList, HttpStatus.OK);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/colors/searchByName") // пошук кольору за назвою
    public ResponseEntity<ColorEntity> searchByColorName(@RequestParam String name){
        Optional<ColorEntity> color = colorRepository.findByName(name);
        if (color.isPresent()) {
            return new ResponseEntity<>(color.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/colors/{id}") // пошук кольору по id
    public ResponseEntity<ColorEntity> searchByColorId(@PathVariable int id) {
        Optional<ColorEntity> color = colorRepository.findById(id);
        if (color.isPresent()) {
            return new ResponseEntity<>(color.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/colors/{colorId}/products") // повернення списку товарів за вибраним кольором
    public ResponseEntity<List<Product>> getAllProductsByColorId(@PathVariable(value = "colorId") int colorId) {
        if (!colorRepository.existsById(colorId)) {
            throw new ResourceNotFoundException("Not found Color  with id = " + colorId);
        }

        List<Product> products = productRepository.findProductByColorsId(colorId);
        for (Product product: products) {
            product = getProductWithImage(product);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/{productId}/colors") // повернення списку кольорів за вибраним товаром
    public ResponseEntity<List<ColorEntity>> getAllColorsByProductId(@PathVariable(value = "productId") long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Не знайдено товар з id = " + productId);
        }

        List<ColorEntity> colors = colorRepository.findColorsByProductsId(productId);
        return new ResponseEntity<>(colors, HttpStatus.OK);
    }

    @PostMapping("/colors/add") // додавання кольору
    public ResponseEntity<ColorEntity> createColor(@RequestBody ColorEntity addColor) {
        if (colorRepository.existsByName(addColor.getName())) {
            throw new ResourceNotFoundException("Колір " + addColor.getName() + " вже присутній" );
        }
        try {
            ColorEntity colorEntity = new ColorEntity();
            colorEntity.setName(addColor.getName());
            colorRepository.save(colorEntity);
            return new ResponseEntity<>(colorEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/products/{productId}/colors")// додавання кольору в картці товару
    public ResponseEntity<ColorEntity> addColor(@PathVariable(value = "productId") long productId, @RequestBody ColorEntity color) {
        ColorEntity colorEntity = productRepository.findById(productId).map(product -> {
            int colorId = color.getId();

            // color is existed - якщо колір присутній - то просто його вибрати
            if (colorId != 0) {
                ColorEntity colorEntitySearch = colorRepository.findById(colorId)
                        .orElseThrow(() -> new ResourceNotFoundException("Not found Color with id = " + colorId));
                product.addColor(colorEntitySearch);
                productRepository.save(product);
                return colorEntitySearch;
            }

            // add and create new Tag - створити і додати новий колір в товарі
            product.addColor(color);
           if (!colorRepository.existsByName(color.getName())) {
               throw new ResourceNotFoundException("Колір " + color.getName() + " вже присутній, виберіть з переліку" );
           }
            return colorRepository.save(color);
        }).orElseThrow(() -> new ResourceNotFoundException("Не знайдено товар з id = " + productId));

        return new ResponseEntity<>(color, HttpStatus.CREATED);
    }



    @PutMapping("/colors/update/{id}") // редагування кольору
    public ResponseEntity<ColorEntity> updateColor(@PathVariable("id") int id, @RequestBody ColorEntity color) {
        Optional<ColorEntity> colorUpdate = colorRepository.findById(id);
        if (!colorRepository.existsByName(color.getName())) {
            throw new ResourceNotFoundException("Колір " + color.getName() + " вже присутній" );
        }
        if (colorUpdate.isPresent()) {
            ColorEntity colorChanged = colorUpdate.get();
            colorChanged.setName(color.getName());
            return new ResponseEntity<>(colorRepository.save(colorChanged), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/colors/delete/{id}") // видалення кольору
    public ResponseEntity<HttpStatus> deleteColor(@PathVariable("id") int id) {
        try {
            colorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/products/{productId}/colors/{colorId}") // видалення кольору з картки товару
    public ResponseEntity<HttpStatus> deleteColorFromProduct(@PathVariable(value = "productId") long productId, @PathVariable(value = "colorId") int colorId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Не знайдено товар з id = " + productId));
        product.removeColor(colorId);
        productRepository.save(product);
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
