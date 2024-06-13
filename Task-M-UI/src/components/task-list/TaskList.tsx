import Grid from "@mui/material/Grid";
import {Divider, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import TaskFilterForm from "../task-filter-form/TaskFilterForm.tsx";
import {useEffect, useState} from "react";
import {CreateTaskResponse, TaskApi} from "../../Api/generated";
import useApiConfiguration from "../../common/hooks/useApiConfiguration.tsx";
import Button from "@mui/material/Button";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import reactToastConfig from "../../common/helper/react-toast-config.ts";

const TaskList = ({newTask}: { newTask: CreateTaskResponse | null }) => {
    const [tasks, setTasks] = useState<CreateTaskResponse[]>([])
    const config = useApiConfiguration();
    const taskApi = new TaskApi(config);
    useEffect(() => {
        if (newTask)
            setTasks(arr => arr.concat(newTask));
    }, [newTask])

    function onFetch(newTasks: any[]) {
        setTasks(newTasks);
    }

    async function completeTask(taskId: number) {
        try {
            await taskApi.updateTask(taskId, {
                completed: !tasks.filter(item => item.id == taskId)[0].completed
            })
            setTasks(tasks.map((task: CreateTaskResponse) => {
                if (task.id == taskId) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task;
            }))
            toast('Task updated successfully', reactToastConfig('info'))
        } catch (e: any) {
            let code = 0;
            if (e instanceof AxiosError) {
                code = e.response!.status
            }
            if (code == 403 || code == 401) {
                toast('Please login again', reactToastConfig('error'))
            } else {
                toast(e.response.data.error, reactToastConfig('error'))
            }
        }
    }

    async function onDelete(taskId: number) {
        await taskApi.deleteTask(taskId);
        setTasks(arr => arr.filter(item => item.id !== taskId))
    }

    return (<>
            <Grid container spacing={2} sx={{paddingY: '10px', paddingX: '50px'}}>
                <Grid item xs={12}>
                    <TaskFilterForm onFetch={onFetch} onSort={(f: any) => f}/>
                </Grid>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Paper
                            onClick={() => completeTask(task.id!)}
                            elevation={3}
                            sx={{
                                p: 2,
                                backgroundColor: task.completed ? "#07f379" : "",
                                cursor: "pointer"
                            }}>
                            <Typography variant="h6" gutterBottom>
                                {task.title}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Description: {task.description}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Due Date: {task.dueDate}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Priority: {task.priority}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Category: {task.category}
                            </Typography>
                            <Divider/>
                            <Button
                                sx={{marginY: 1}}
                                onClick={e => {
                                    e.stopPropagation()
                                    onDelete(task.id!)
                                        .then(r => r)
                                }}>
                                Delete
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </>
    );
};
export default TaskList