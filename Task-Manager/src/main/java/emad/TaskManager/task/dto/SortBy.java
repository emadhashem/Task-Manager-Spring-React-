package emad.TaskManager.task.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SortBy {
    title("title"),
    category("category");
    private final String value;
}
