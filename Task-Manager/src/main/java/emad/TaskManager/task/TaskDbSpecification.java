package emad.TaskManager.task;

import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor
public class TaskDbSpecification {

    public static Specification<Task> titleLike(String title) {
        return ((root, query, cb) -> cb.like(root.get("title"), "%" + title + "%"));
    }

    public static Specification<Task> categoryLike(String category) {
        return ((root, query, cb) -> cb.like(root.get("category"), "%" + category + "%"));
    }

    public static Specification<Task> byPriority(Priority priority) {
        return ((root, query, cb) -> cb.equal(root.get("priority"), priority));
    }

    public static Specification<Task> byOwner(Integer id) {
        return ((root, query, cb) -> cb.equal(root.get("owner").get("id"), id));
    }

    public static Specification<Task> byCompleted(Boolean value) {
        return ((root, query, cb) -> cb.equal(root.get("completed"), value));
    }

    public static Specification<Task> byProjectId(Integer value) {
        return ((root, query, cb) -> cb.equal(root.get("project").get("id"), value));
    }

}
