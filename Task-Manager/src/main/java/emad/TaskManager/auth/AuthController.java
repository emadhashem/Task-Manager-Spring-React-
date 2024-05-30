package emad.TaskManager.auth;

import emad.TaskManager.auth.dto.LoginRequest;
import emad.TaskManager.auth.dto.LoginResponse;
import emad.TaskManager.auth.dto.RegisterRequest;
import emad.TaskManager.auth.dto.RegisterResponse;
import emad.TaskManager.security.JwtService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        authService.register(request);
        return ResponseEntity.ok(RegisterResponse.builder()
                .message("Account created successfully.")
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        var user = authService.login(request);
        return ResponseEntity.ok(LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .accessToken(jwtService.generateToken(user))
                .build());
    }
}
