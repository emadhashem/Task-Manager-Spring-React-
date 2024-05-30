package emad.TaskManager.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String email;
    private Integer id;
    private String accessToken;
}
