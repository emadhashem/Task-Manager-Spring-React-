package emad.TaskManager.project.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter

public class CreateProjectResponse {

    private Integer id;
    private String name;
}
