package emad.TaskManager.task.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UnassignedTaskResponse {

    private String title;
    private Integer id;
}
