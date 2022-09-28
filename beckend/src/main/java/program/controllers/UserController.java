package program.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import program.entities.UserEntity;
import program.exeptions.ResourceNotFoundException;
import program.repositories.ProductRepository;
import program.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;


    @GetMapping("/users/{id}") //пошук юзера по ід
    public org.springframework.http.ResponseEntity<UserEntity> getUserById(@PathVariable("id") long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + id));
        return new org.springframework.http.ResponseEntity<>(user, HttpStatus.OK);
    }
}