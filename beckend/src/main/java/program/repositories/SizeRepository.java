package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.SizeEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
@Repository
public interface SizeRepository extends JpaRepository<SizeEntity, Integer> {

    Optional<SizeEntity> findByName( String name);
    List<SizeEntity> findSizesByProductsId(Long productId);

}
