import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TaskList from "../../components/task-list/TaskList.tsx";
import {Dialog, DialogContent, DialogTitle, Fab, IconButton} from "@mui/material";
import {useState} from "react";
import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';

import CreateTaskForm from "../../components/create-task-form/CreateTaskForm.tsx";
import {CreateTaskResponse} from "../../Api/generated";

const BootstrapDialog = styled(Dialog)(({theme}: any) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function HomePage() {
    const [openCreateNewTask, setOpenCreateNewTask] = useState(false);
    const [newTask, setNewTask] = useState<CreateTaskResponse | null>(null)
    const handleClickOpen = () => {
        setOpenCreateNewTask(true);
    };
    const handleClose = () => {
        setOpenCreateNewTask(false);
    };

    const onSubmitAddTask = (newTask: CreateTaskResponse) => {
        setNewTask(newTask)
        handleClose()
    }
    return (
        <ThemeProvider theme={createTheme()}>
            <CssBaseline/>
            <Fab
                onClick={handleClickOpen}
                size="small" color="primary" aria-label="add" sx={{
                position: 'fixed',
                bottom: 16,
                right: 4,
            }}>
                <AddIcon/>
            </Fab>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openCreateNewTask}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Add New Task
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <CreateTaskForm onAddTask={onSubmitAddTask}/>
                </DialogContent>
            </BootstrapDialog>
            <TaskList newTask={newTask}/>
        </ThemeProvider>
    );
}


