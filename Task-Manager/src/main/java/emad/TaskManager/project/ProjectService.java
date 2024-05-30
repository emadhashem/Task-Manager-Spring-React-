package emad.TaskManager.project;

import emad.TaskManager.project.dto.CreateProjectRequest;
import emad.TaskManager.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import static emad.TaskManager.project.ProjectDbSpecification.*;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(
            CreateProjectRequest request,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        Project project = Project.builder()
                .name(request.getName())
                .owner(user)
                .build();
        return projectRepository.save(project);
    }

    public Page<Project> myProjects(String name, Authentication connectedUser, Integer pageNo, Integer pageSize) {
        User user = (User) (connectedUser.getPrincipal());
        Specification<Project> filter = Specification
                .where(StringUtils.isBlank(name) ? null : byName(name))
                .and(byOwnerId(user.getId()));

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return projectRepository.findAll(filter, pageable);
    }

}
