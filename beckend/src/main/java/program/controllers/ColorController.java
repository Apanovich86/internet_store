package program.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.DTO.color.AddColorDTO;
import program.DTO.color.ColorDTO;
import program.entities.ColorEntity;
import program.mapper.ApplicationMapper;
import program.repositories.ColorRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/color")
public class ColorController {
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    ApplicationMapper applicationMapper;

    @GetMapping("/get") // відображення всіх кольорів
    public ResponseEntity<List<ColorDTO>> getColors() {
        try {
            List<ColorDTO> colorDTOList =  applicationMapper
                    .listColorToListColorDTO(colorRepository.findAll());
            if (colorDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
            else {
                return new ResponseEntity<>(colorDTOList, HttpStatus.OK);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add") // додавання кольору
    public ResponseEntity<ColorEntity> createColor(@RequestBody AddColorDTO addColorDTO) {
        try {
            ColorEntity colorEntity = applicationMapper.addColorEntityDTOToColorEntity(addColorDTO);
            colorEntity.setName(addColorDTO.getName());
            colorRepository.save(colorEntity);
            return new ResponseEntity<>(colorEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchByName") // пошук кольору за назвою
    public ResponseEntity<ColorEntity> searchByColorName(@RequestParam String name){
        Optional<ColorEntity> color = colorRepository.findByName(name);
        if (color.isPresent()) {
            return new ResponseEntity<>(color.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}") // пошук кольору по id
    public ResponseEntity<ColorEntity> searchByColorId(@PathVariable long id) {
        Optional<ColorEntity> color = colorRepository.findById(id);
        if (color.isPresent()) {
            return new ResponseEntity<>(color.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}") // редагування кольору
    public ResponseEntity<ColorEntity> updateColor(@PathVariable("id") long id, @RequestBody ColorEntity color) {
        Optional<ColorEntity> colorUpdate = colorRepository.findById(id);
        if (colorUpdate.isPresent()) {
            ColorEntity colorChanged = colorUpdate.get();
            colorChanged.setName(color.getName());
            return new ResponseEntity<>(colorRepository.save(colorChanged), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteColor(@PathVariable("id") long id) {
        try {
            colorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
