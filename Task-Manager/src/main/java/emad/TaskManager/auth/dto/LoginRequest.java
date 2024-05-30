package emad.TaskManager.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {

    @NotEmpty(message = "email is required.")
    @Email(message = "email is not valid.")
    private String email;

    @NotEmpty(message = "Password is required.")
    @Size(min = 4, message = "Password min chars is 4.")
    private String password;
}
