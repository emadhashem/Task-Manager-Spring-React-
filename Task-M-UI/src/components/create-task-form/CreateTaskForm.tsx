import {useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {CreateTaskRequestPriorityEnum, CreateTaskResponse, TaskApi} from "../../Api/generated";
import useApiConfiguration from "../../common/hooks/useApiConfiguration.tsx";
import reactToastConfig from "../../common/helper/react-toast-config.ts";
import {toast} from "react-toastify";

interface Props {
    onAddTask: (t: CreateTaskResponse) => void
}

const CreateTaskForm = ({onAddTask}: Props) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const config = useApiConfiguration();
    const taskApi = new TaskApi(config)
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (taskTitle.trim() && description.trim() && priority.trim() && category.trim()) {
                const {data} = await taskApi.createTask({
                    category: category,
                    dueDate: new Date(dueDate).toISOString(),
                    priority: priority.toUpperCase() as CreateTaskRequestPriorityEnum,
                    description: description,
                    title: taskTitle
                })
                onAddTask(data);
                resetFormData();
                toast("Task Added", reactToastConfig('success'))

            } else {
                toast("Please enter full data", reactToastConfig('error'))
            }
        } catch (error) {

        }
    };


    function resetFormData() {
        setTaskTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');
        setCategory('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" sx={{marginTop: '10px', paddingX: '20px'}}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Task Title"
                        variant="outlined"
                        fullWidth
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Due Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            label="Priority"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="work">Work</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateTaskForm;