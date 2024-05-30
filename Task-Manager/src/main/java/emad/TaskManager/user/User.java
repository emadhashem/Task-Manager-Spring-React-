package emad.TaskManager.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import emad.TaskManager.project.Project;
import emad.TaskManager.task.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "_user")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String email;

    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Task> tasks;
    @JsonManagedReference
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Project> projects;

    @Override
    public String getName() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
