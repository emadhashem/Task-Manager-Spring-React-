package emad.TaskManager.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer>,
        JpaSpecificationExecutor<Project>,
        PagingAndSortingRepository<Project, Integer> {

    List<Project> findAllByOwnerId(Integer id);

}
