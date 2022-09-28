package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.ColorEntity;
import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<ColorEntity, Integer> {
    Optional<ColorEntity> findByName(String name);
    List<ColorEntity> findColorsByProductsId(Long productId);
    boolean existsByName(String name);
}
