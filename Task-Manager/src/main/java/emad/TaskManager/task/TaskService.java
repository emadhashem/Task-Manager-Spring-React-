package emad.TaskManager.task;

import emad.TaskManager.project.ProjectRepository;
import emad.TaskManager.task.dto.CreateTaskRequest;
import emad.TaskManager.task.dto.UnassignedTaskResponse;
import emad.TaskManager.task.dto.UpdateTaskRequest;
import emad.TaskManager.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

import static emad.TaskManager.task.TaskDbSpecification.*;

@RequiredArgsConstructor
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public Task createTask(CreateTaskRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        var newTask = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .owner(user)
                .category(request.getCategory())
                .completed(false)
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .build();
        return taskRepository.save(newTask);
    }

    @Transactional
    public void updateTask(UpdateTaskRequest request, int taskId) {
        var task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task Not found."));
        if (request.getCategory() != null) {
            task.setCategory(request.getCategory());
        }
        if (request.getCompleted() != null) {
            task.setCompleted(request.getCompleted());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getDueDate() != null) {
            task.setDueDate(request.getDueDate());
        }
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        taskRepository.save(task);
    }

    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }


    public Page<Task> findMyTasks(String title,
                                  String priority,
                                  String category,
                                  Boolean completed,
                                  Integer projectId,
                                  Authentication connectUser,
                                  Integer pageNo,
                                  Integer pageSize
    ) {
        var user = (User) connectUser.getPrincipal();
        Specification<Task> filters = Specification.
                where(StringUtils.isBlank(title) ? null : titleLike(title))
                .and(StringUtils.isBlank(category) ? null : categoryLike(category))
                .and(StringUtils.isBlank(priority) ? null : byPriority(Priority.valueOf(priority)))
                .and(byOwner(user.getId()))
                .and(projectId == null ? null : byProjectId(projectId))
                .and(completed == null ? null : byCompleted(completed));
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return taskRepository.findAll(filters, pageable);
    }

    public void assignTasksToProject(Integer projectId, List<Integer> tasksIds) {
        var project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project Not Found"));
        List<Task> tasks = taskRepository.findAllById(tasksIds);
        tasks.forEach(task -> {
            task.setProject(project);
        });
        taskRepository.saveAll(tasks);
    }

    public List<UnassignedTaskResponse> findUnassignedTasks(Authentication connectedUser, String title) {
        var user = (User) connectedUser.getPrincipal();
        var list = taskRepository.findUnassignedTasks(user.getId(), title);
        return list.stream().map(item -> UnassignedTaskResponse.builder().id((Integer) item[1])
                .title((String) item[0])
                .build()).toList();
    }
}
