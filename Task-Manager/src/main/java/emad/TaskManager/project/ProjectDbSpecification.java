package emad.TaskManager.project;

import org.springframework.data.jpa.domain.Specification;

public class ProjectDbSpecification {

    public static Specification<Project> byName(String name) {
        return ((root, query, cb) -> cb.like(root.get("name"), "%" + name + "%"));
    }

    public static Specification<Project> byOwnerId(Integer id) {
        return ((root, query, cb) -> cb.equal(root.get("owner").get("id"), id));
    }

}
