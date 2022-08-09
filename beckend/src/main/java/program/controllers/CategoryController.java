package program.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.DTO.category.AddCategoryDTO;
import program.DTO.category.CategoryDTO;
import program.entities.Category;
import program.mapper.ApplicationMapper;
import program.repositories.CategoryRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
     CategoryRepository categoryRepository;
    @Autowired
     ApplicationMapper applicationMapper;



    @GetMapping("/get") // відображення всіх категорій
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        try {
            List<CategoryDTO> categoryDTOList =  applicationMapper
                    .listCategoryToListCategoryDTO(categoryRepository.findAll());
                if (categoryDTOList.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
                else {
                return new ResponseEntity<>(categoryDTOList, HttpStatus.OK);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/add") // додавання категорії
    public ResponseEntity<Category> createCategory(@RequestBody AddCategoryDTO addCategoryDTO) {
        try {
            Category category = applicationMapper.addCategoryDTOToCategory(addCategoryDTO);
            category.setName(addCategoryDTO.getName());
            categoryRepository.save(category);
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchByName") // пошук категорії за ім'ям
    public ResponseEntity<Category> searchByCategoryName(@RequestParam String name){
        Optional<Category> category = categoryRepository.findByName(name);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}") // пошук категорії по id
    public ResponseEntity<Category> searchByCategoryId(@PathVariable long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}") // редагування категорії
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id, @RequestBody Category category) {
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") long id) {
        try {
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
