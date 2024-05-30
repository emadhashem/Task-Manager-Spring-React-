package emad.TaskManager.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer>,
        JpaSpecificationExecutor<Task>,
        PagingAndSortingRepository<Task, Integer> {

    @Modifying
    @Query("""
                update Task t set t.project.id = :pId
                where t.id = :id
            """)
    void updateProjectById(@Param("id") Integer id, @Param("pId") Integer pId);

    @Query("""
                select t.title, t.id from Task t
                where t.owner.id = :ownerId
                and t.project.id is null
                and t.title like %:title%
            """)
    List<Object[]> findUnassignedTasks(@Param("ownerId") Integer ownerId, @Param("title") String title);
}
