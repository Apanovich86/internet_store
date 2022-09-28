package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Category;
import program.entities.Product;
import program.entities.ResponseEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByTitle(String title);
    List<Product> findProductByColorsId(int colorId);

    List<Product> findProductBySizesId(int sizeId);
    List<Product> findByTitleContaining(String title);
    List<Product> findByCategoryId(long categoryId);


}