package emad.TaskManager.auth;

import emad.TaskManager.auth.dto.LoginRequest;
import emad.TaskManager.auth.dto.RegisterRequest;
import emad.TaskManager.user.User;
import emad.TaskManager.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final AuthenticationManager manager;

    @Transactional
    public void register(RegisterRequest request) {
        var user = User.builder().email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
    }

    public User login(LoginRequest request) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()
        ));

        return userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
    }
}
