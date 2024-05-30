package emad.TaskManager.task;

import emad.TaskManager.common.dto.PageResponse;
import emad.TaskManager.project.dto.AssignTasksToProjectResponse;
import emad.TaskManager.task.dto.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("task")
@RequiredArgsConstructor
@Tag(name = "Task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<CreateTaskResponse> createTask(
            @Valid @RequestBody CreateTaskRequest request,
            Authentication connectedUser
    ) {
        var task = taskService.createTask(request, connectedUser);
        return ResponseEntity.ok(CreateTaskResponse
                .builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.getCompleted())
                .category(task.getCategory())
                .dueDate(task.getDueDate())
                .priority(task.getPriority())
                .build()
        );
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<UpdateTaskResponse> updateTask(
            @Valid @RequestBody UpdateTaskRequest request,
            @PathVariable(name = "taskId") int taskId
    ) {
        taskService.updateTask(request, taskId);
        return ResponseEntity.ok(UpdateTaskResponse
                .builder()
                .message("Task Updated Successfully")
                .build()
        );
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<UpdateTaskResponse> deleteTask(
            @PathVariable(name = "taskId") int taskId
    ) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok(UpdateTaskResponse
                .builder()
                .message("Task Deleted Successfully")
                .build()
        );
    }


    @GetMapping
    public ResponseEntity<PageResponse<CreateTaskResponse>> getMyTasks(
            Authentication connectUser,
            @RequestParam(value = "title", required = false, defaultValue = "") String title,
            @RequestParam(value = "priority", required = false, defaultValue = "") String priority,
            @RequestParam(value = "category", required = false, defaultValue = "") String category,
            @RequestParam(value = "completed", required = false, defaultValue = "") Boolean completed,
            @RequestParam(value = "projectId", required = false, defaultValue = "") Integer projectId,
            @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize

    ) {
        var page = taskService.findMyTasks(
                title,
                priority,
                category,
                completed,
                projectId,
                connectUser,
                Math.max(pageNo - 1, 0),
                pageSize
        );
        var tasks = page.getContent().stream().map(CreateTaskResponse::toResponse).toList();

        return ResponseEntity.ok(
                new PageResponse<>(
                        tasks,
                        page.getNumber() + 1,
                        page.getSize(),
                        page.getTotalElements(),
                        page.getTotalPages()
                ));
    }

    @PatchMapping("/assign-tasks-to/{projectId}")
    public ResponseEntity<AssignTasksToProjectResponse> assignTasksToProject(
            @RequestBody List<Integer> tasksIds,
            @PathVariable("projectId") Integer projectId
    ) {
        taskService.assignTasksToProject(projectId, tasksIds);
        return ResponseEntity
                .ok(AssignTasksToProjectResponse
                        .builder()
                        .message("Tasks Assigned successfully")
                        .build());
    }

    @GetMapping("/unassigned-tasks")
    public ResponseEntity<List<UnassignedTaskResponse>> findUnassignedTasks(
            Authentication connectedUser,
            @RequestParam(name = "title", defaultValue = "") String title
    ) {
        return ResponseEntity.ok(taskService.findUnassignedTasks(connectedUser, title));
    }
}
