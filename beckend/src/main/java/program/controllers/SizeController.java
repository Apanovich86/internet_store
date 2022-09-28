package program.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.entities.Product;
import program.entities.SizeEntity;
import program.exeptions.ResourceNotFoundException;
import program.repositories.ProductRepository;
import program.repositories.SizeRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SizeController {
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/sizes") // відображення всіх розмірів
    public ResponseEntity<List<SizeEntity>> getSizes() {
        try {
            List<SizeEntity> sizeDTOList =  sizeRepository.findAll();
            if (sizeDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
            else {
                return new ResponseEntity<>(sizeDTOList, HttpStatus.OK);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/sizes/searchByName") // пошук розміру за назвою
    public ResponseEntity<SizeEntity> searchBySizeName(@RequestParam String name){
        Optional<SizeEntity> size = sizeRepository.findByName(name);
        if (size.isPresent()) {
            return new ResponseEntity<>(size.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/sizes/{id}") // пошук розміру по id
    public ResponseEntity<SizeEntity> searchByColorId(@PathVariable int id) {
        Optional<SizeEntity> size = sizeRepository.findById(id);
        if (size.isPresent()) {
            return new ResponseEntity<>(size.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/products/{productId}/sizes") //відображення усіх розмірів по товару
    public ResponseEntity<List<SizeEntity>> getAllSizesByProductId(@PathVariable(value = "productId") Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Не знайдено товар з id = " + productId);
        }
        List<SizeEntity> sizeDTOList =  sizeRepository.findSizesByProductsId(productId);

        return new ResponseEntity<>(sizeDTOList, HttpStatus.OK);
    }

    @GetMapping("/sizes/{sizeId}/products") // відображення товарів по розміру
    public ResponseEntity<List<Product>> getAllProductsBySizeId(@PathVariable(value = "sizeId") int sizeId) {
        if (!sizeRepository.existsById(sizeId)) {
            throw new ResourceNotFoundException("Не знайдено розмір з id = " + sizeId);
        }

        List<Product> products = productRepository.findProductBySizesId(sizeId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/products/{productId}/sizes") // додавання до товару розміру
    public ResponseEntity<SizeEntity> addSizeToProduct(@PathVariable(value = "productId") Long productId,
                                                 @RequestBody SizeEntity size) {
        SizeEntity sizeEntity = productRepository.findById(productId).map(product -> {
            int sizeId = size.getId();
            // size is existed
            if (sizeId != 0) {
                SizeEntity _size = sizeRepository.findById(sizeId)
                        .orElseThrow(() -> new ResourceNotFoundException("Не знайдено розмір з id = " + sizeId));
                product.addSize(_size);
               productRepository.save(product);
                return _size;
            }
            // add and create new Size
            product.addSize(size);
            return sizeRepository.save(size);
        }).orElseThrow(() -> new ResourceNotFoundException("Не знайдено товар з id = " + productId));

        return new ResponseEntity<>(size, HttpStatus.CREATED);
    }



    @DeleteMapping("/products/{productId}/sizes/{sizeId}") // видалення розміру з картки товару
    public ResponseEntity<HttpStatus> deleteSizeFromProduct(@PathVariable(value = "productId") Long productId,
                                                                    @PathVariable(value = "sizeId") int sizeId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Не знайдено товар з id = " + productId);
        }
       Product product = productRepository.getById(productId);
            product.removeSize(sizeId);
            productRepository.save(product);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    @DeleteMapping("/sizes/{id}") // видадення розміру
    public ResponseEntity<HttpStatus> deleteSize(@PathVariable("id") int id) {
        sizeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
