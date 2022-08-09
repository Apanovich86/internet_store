package program.mapper;

import org.mapstruct.Mapper;
import program.DTO.category.AddCategoryDTO;
import program.DTO.category.CategoryDTO;
import program.DTO.color.AddColorDTO;
import program.DTO.color.ColorDTO;
import program.entities.Category;
import program.entities.ColorEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApplicationMapper {
    CategoryDTO categoryToCategoryDTO(Category category);
    List<CategoryDTO> listCategoryToListCategoryDTO(List<Category> categories);
    Category addCategoryDTOToCategory(AddCategoryDTO addCategoryDTO);

    List<ColorDTO> listColorToListColorDTO(List<ColorEntity> colors);

    ColorEntity addColorEntityDTOToColorEntity(AddColorDTO addColorDTO);
}

