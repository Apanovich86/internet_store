package program.DTO;

import lombok.Data;
import program.DTO.color.ColorDTO;
import program.DTO.image.ImageDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class ProductDTO {
    private LocalDateTime created;
    private Long categoryId;
    private String title;
    private List<ImageDTO> imageDTOList;
    private Double price;
    private String description;
    private Set<SizeDTO> sizeDTOSet;
    private Set<ColorDTO> colorDTOSet;
    private List<ResponseDTO> responseDTOList;
    private boolean availability;

}
