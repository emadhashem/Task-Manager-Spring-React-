package emad.TaskManager.task;

public enum Priority {

    HIGH("high"),
    MEDIUM("medium"),
    LOW("low");
    final String value;

    Priority(String value) {
        this.value = value;
    }
}
