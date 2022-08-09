package program.DTO.category;

import lombok.Data;
import program.DTO.ProductDTO;

import java.util.List;

@Data
public class CategoryDTO {
    private String name;
    private List<ProductDTO> productDTOList;
}
