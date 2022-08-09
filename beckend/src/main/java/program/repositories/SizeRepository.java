package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import program.entities.ERole;
import program.entities.ESizeEntity;
import program.entities.Role;
import program.entities.SizeEntity;

import java.util.Optional;

public interface SizeRepository extends JpaRepository<SizeEntity, Integer> {
    Optional<SizeEntity> findByName(ESizeEntity name);
}