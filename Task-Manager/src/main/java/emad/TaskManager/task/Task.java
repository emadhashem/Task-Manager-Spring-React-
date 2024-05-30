package emad.TaskManager.task;

import com.fasterxml.jackson.annotation.JsonBackReference;
import emad.TaskManager.project.Project;
import emad.TaskManager.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private Priority priority;
    private String category;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "ownerId")
    private User owner;
    private Boolean completed;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;
}
