package emad.TaskManager.project.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectRequest {

    @NotEmpty(message = "Name Is required")
    private String name;

}
