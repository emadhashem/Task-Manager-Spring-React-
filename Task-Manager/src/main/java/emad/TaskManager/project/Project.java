package emad.TaskManager.project;

import emad.TaskManager.task.Task;
import emad.TaskManager.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    @OneToMany(mappedBy = "project", fetch = FetchType.EAGER)
    private List<Task> tasks;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private User owner;

    @Override
    public String toString() {
        return this.getName();
    }
}
