package emad.TaskManager.task.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import emad.TaskManager.task.Priority;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Builder
@Setter
@Getter
public class CreateTaskRequest {

    @NotEmpty(message = "Title Is Required")
    private String title;
    private String description;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    @NotNull(message = "Due Date Is Required")
    private LocalDateTime dueDate;
    @NotNull(message = "Due Date Is Required")
    private Priority priority;
    @NotEmpty(message = "Category Is Required")
    private String category;

}
