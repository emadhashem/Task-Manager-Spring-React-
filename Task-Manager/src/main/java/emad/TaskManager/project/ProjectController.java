package emad.TaskManager.project;

import emad.TaskManager.common.dto.PageResponse;
import emad.TaskManager.project.dto.AssignTasksToProjectResponse;
import emad.TaskManager.project.dto.CreateProjectRequest;
import emad.TaskManager.project.dto.CreateProjectResponse;
import emad.TaskManager.project.dto.ProjectResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("project")
@RequiredArgsConstructor
@Tag(name = "Project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<CreateProjectResponse> createProject(
            @Valid
            @RequestBody CreateProjectRequest request,
            Authentication connectedUser
    ) {
        var project = projectService.createProject(request, connectedUser);
        return ResponseEntity.ok(
                CreateProjectResponse.builder()
                        .name(project.getName())
                        .id(project.getId())
                        .build()
        );
    }

    @GetMapping("/my-projects")
    public ResponseEntity<PageResponse<ProjectResponse>> myProjects(
            Authentication connectedUser,
            @RequestParam(value = "name", defaultValue = "", required = false)
            String name,
            @RequestParam(value = "pageNo", defaultValue = "1", required = false)
            Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false)
            Integer pageSize
    ) {
        var page = projectService.myProjects(name, connectedUser, Math.max(0, pageNo - 1), pageSize);
        var response = page.getContent().stream().map(ProjectResponse::toResponse).toList();
        return ResponseEntity.ok(
                new PageResponse<>(response, pageNo, pageSize, page.getTotalElements(), page.getTotalPages())
        );
    }


}
