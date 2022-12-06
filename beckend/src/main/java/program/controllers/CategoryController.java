package program.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.entities.Category;
import program.exeptions.ResourceNotFoundException;
import program.repositories.CategoryRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryController {
    @Autowired
     CategoryRepository categoryRepository;



    @GetMapping("/categories") // відображення всіх категорій
    public ResponseEntity<List<Category>> getCategories() {
        try {
            List<Category> categories =new ArrayList<Category>();
            categories.addAll(categoryRepository.findAll());
                if (categories.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
                else {
                return new ResponseEntity<>(categories, HttpStatus.OK);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/categories/add") // додавання категорії
    public ResponseEntity<Category> createCategory(@RequestBody Category addCategory) {

        if (categoryRepository.existsByName(addCategory.getName())) {
            throw new ResourceNotFoundException("Категорія " + addCategory.getName() + " вже присутня" );
        }
        try {
            Category category = new Category();
            category.setName(addCategory.getName());
            categoryRepository.save(category);
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @GetMapping("/categories/searchByName") // пошук категорії за ім'ям
    public ResponseEntity<Category> searchByCategoryName (@RequestParam String name){
        Optional<Category> category = categoryRepository.findByName(name);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

            @GetMapping("/categories/{id}") // пошук категорії по id
            public ResponseEntity<Category> searchByCategoryId ( @PathVariable long id){
                Optional<Category> category = categoryRepository.findById(id);
                if (category.isPresent()) {
                    return new ResponseEntity<>(category.get(), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }

            @PutMapping("/categories/update/{id}") // редагування категорії
            public ResponseEntity<Category> updateCategory ( @PathVariable("id") long id, @RequestBody Category category)
            {
                if (categoryRepository.existsByName(category.getName())) {
                    throw new ResourceNotFoundException("Категорія " + category.getName() + " вже присутня" );
                }
                Optional<Category> categoryUpdate = categoryRepository.findById(id);
                if (categoryUpdate.isPresent()) {
                    Category categoryChanged = categoryUpdate.get();
                    categoryChanged.setName(category.getName());
                    //categoryChanged.setProducts(category.getProducts());
                    return new ResponseEntity<>(categoryRepository.save(categoryChanged), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }

            @DeleteMapping("/categories/delete/{id}")
            public ResponseEntity<HttpStatus> deleteCategory ( @PathVariable("id") long id){
                try {
                    categoryRepository.deleteById(id);
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

}
