package program.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.exeptions.ResourceNotFoundException;
import program.repositories.ProductRepository;
import program.repositories.ResponseRepository;
import program.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ResponseController {
    @Autowired
    ResponseRepository responseRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("products/{productId}/responses") // відображення всіх відгуків по товару
    public ResponseEntity<List<program.entities.ResponseEntity>> getResponsesByProductId(@PathVariable(value = "productId") Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Not found Product with id = " + productId);
        }
            List<program.entities.ResponseEntity> responseDTOList =  responseRepository.findByProductId(productId);
            return new ResponseEntity<>(responseDTOList,HttpStatus.OK);
        }

    @GetMapping("/responses/{id}") // пошук відгуку про товар по id
    public ResponseEntity<program.entities.ResponseEntity> searchByResponseId(@PathVariable long id) {
        Optional<program.entities.ResponseEntity> response = responseRepository.findById(id);
        if (response.isPresent()) {
            return new ResponseEntity<>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("products/{productId}/{userId}/add") // додавання відгуку про товар юзером
    public ResponseEntity<program.entities.ResponseEntity> createResponse(@PathVariable(value = "productId") Long productId,
                                                                          @PathVariable(value = "userId") Long userId,
                                                                          @RequestBody program.entities.ResponseEntity addResponse) {
        try {
            program.entities.ResponseEntity responseEntity = new program.entities.ResponseEntity();
            responseEntity.setComment(addResponse.getComment());
            responseEntity.setProduct(productRepository.findById(productId).get());
            responseEntity.setUser(userRepository.findById(userId).get());
            responseEntity.setRating(addResponse.getRating());
            responseRepository.save(responseEntity);
            return new ResponseEntity<>(responseEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/responses/update/{id}") // редагування відгуку про товар
    public ResponseEntity<program.entities.ResponseEntity> updateResponse(@PathVariable("id") long id, @RequestBody program.entities.ResponseEntity responseEntity) {
        Optional<program.entities.ResponseEntity> responseUpdate = responseRepository.findById(id);
        if (responseUpdate.isPresent()) {
            program.entities.ResponseEntity responseChanged = responseUpdate.get();
            responseChanged.setComment(responseEntity.getComment());
            responseChanged.setRating(responseEntity.getRating());
            return new ResponseEntity<>(responseRepository.save(responseChanged), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/responses/delete/{id}")// видалення відгуку по ід
    public ResponseEntity<HttpStatus> deleteColor(@PathVariable("id") long id) {
        try {
            responseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/products/{productId}/delete")// видалення усіх відгуків за товаром
    public ResponseEntity<List<ResponseEntity>> deleteAllResponsesOfProduct(@PathVariable(value = "productId") Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Not found Tutorial with id = " + productId);
        }
        responseRepository.deleteByProductId(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
