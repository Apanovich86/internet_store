package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.ResponseEntity;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ResponseRepository extends JpaRepository<ResponseEntity, Long> {
    List<ResponseEntity> findByProductId(Long productId);

    @Transactional
    void deleteByProductId(Long productId);
}