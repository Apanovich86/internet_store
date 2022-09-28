package program.DTO;

import lombok.Data;


@Data
public class AddProductDto {
    private long categoryId;
    private String title;
    private String urlImage;
    private Double price;
    private String description;
    private boolean availability;

}
