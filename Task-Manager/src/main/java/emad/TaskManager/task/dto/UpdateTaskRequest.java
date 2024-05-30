package emad.TaskManager.task.dto;

import emad.TaskManager.task.Priority;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UpdateTaskRequest {
    private Boolean Completed;
    private LocalDateTime dueDate;
    private String description;
    private Priority priority;
    private String category;
}
