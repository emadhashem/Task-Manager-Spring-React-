package emad.TaskManager.project.dto;

import emad.TaskManager.project.Project;
import emad.TaskManager.task.dto.CreateTaskResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {
    private Integer id;
    protected String name;
    private List<CreateTaskResponse> tasks;

    public static ProjectResponse toResponse(Project p) {
        return ProjectResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .tasks(p.getTasks().stream().map(CreateTaskResponse::toResponse).toList())
                .build();
    }
}

