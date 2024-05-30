package emad.TaskManager.task.dto;

import emad.TaskManager.task.Priority;
import emad.TaskManager.task.Task;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateTaskResponse {
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private Priority priority;
    private String category;
    private Boolean completed;

    public static CreateTaskResponse toResponse(Task task) {
        return CreateTaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.getCompleted())
                .category(task.getCategory())
                .dueDate(task.getDueDate())
                .priority(task.getPriority())
                .build();
    }
}
