import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {styled} from "@mui/system";
import {Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Tabs} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ProjectResponse, TaskApi, UnassignedTaskResponse} from "../../../Api/generated";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ReactProps} from "../../../common/types/ReactProps.ts";
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import useApiConfiguration from "../../../common/hooks/useApiConfiguration.tsx";
import {useDispatch} from "react-redux";
import {updateProject} from "../../../redux/project-slice.ts";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import reactToastConfig from "../../../common/helper/react-toast-config.ts";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProjectPage = () => {
    const {projectId} = useParams();
    const [openProject, setOpenProject] = useState(false)
    const [project, setProject] = useState<ProjectResponse | null>(null)
    const [value, setValue] = useState(0);
    const config = useApiConfiguration();
    const taskApi = new TaskApi(config);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [findByTitle, setFindByTitle] = useState('')
    const [unAssignedTasks, setUnAssignedTasks] = useState<UnassignedTaskResponse[]>([])
    const [chosenTasks, setChosenTasks] = useState<UnassignedTaskResponse[]>([])
    useEffect(() => {
        if (location.state.project)
            setProject(location.state.project)
    }, [location.state]);

    useEffect(() => {
        if (projectId) {
            handleClickOpen()
        } else {
            handleClose()
        }
    }, [projectId]);

    useEffect(() => {
        fetchUnAssignedTasks([])
    }, []);

    async function fetchUnAssignedTasks(filters: any[]) {
        try {
            const {data} = await taskApi.findUnassignedTasks(...filters);
            setUnAssignedTasks(data || [])
        } catch (e: any) {
            toast(e.response.data.error ?? 'Unable to fetch data', reactToastConfig('error'))
        }
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleClickOpen = () => {
        setOpenProject(true);
    };
    const handleClose = () => {
        setOpenProject(false);
        navigate("/projects")
    };
    const handleUnAssignTask = async (taskId: number) => {
        try {
            await taskApi.updateTask(taskId, {});
            const curProject = {
                ...project,
                tasks: (project?.tasks ?? []).filter((task) => task.id !== taskId)
            }
            setProject(curProject)
            dispatch(updateProject(curProject));
            toast('Project Updated', reactToastConfig('success'))
        } catch (e: any) {
            toast(e.response.d.error ?? 'Project Not Updated', reactToastConfig('error'))
        }
    }

    const handleChangeTask = async (task: UnassignedTaskResponse) => {
        if (chosenTasks.findIndex(item => item.id === task.id) === -1) {
            setChosenTasks(arr => [...arr, task])
        } else {
            setChosenTasks(arr => arr.filter(item => item.id !== task.id))
        }
    }

    async function handleFilter() {
        await fetchUnAssignedTasks([findByTitle])
    }

    async function handleSaveChanges() {
        try {
            await taskApi
                .assignTasksToProject(
                    project!.id || parseInt(projectId!),
                    chosenTasks.map(item => item.id!)
                );
            handleClose()
            const updatedProject = {
                ...project,
                tasks: [...(project?.tasks ?? []), ...chosenTasks],
            }
            setProject(updatedProject);
            dispatch(updateProject(updatedProject));
            toast('Project Updated', reactToastConfig('success'))
        } catch (e: any) {
            toast('Project not Updated', reactToastConfig('error'))
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openProject}
        >
            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                {project?.name ?? ""}
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
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{width: '50%'}} label="Project Tasks" {...a11yProps(0)} />
                        <Tab sx={{width: '50%'}} label="Assign New Tasks" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>

                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap flexWrap="wrap">
                        {
                            project && (
                                (project.tasks ?? [])
                                    .map(task => (
                                        <Chip

                                            label={task.title} key={task.id}
                                            variant="outlined"
                                            onDelete={() => handleUnAssignTask(task.id!)}
                                        />
                                    ))
                            )
                        }
                    </Stack>


                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Stack>
                        <TextField value={findByTitle}
                                   onChange={e => setFindByTitle(e.target.value)}
                        />
                        <Button onClick={() => handleFilter()}>
                            Find
                        </Button>
                    </Stack>
                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap flexWrap="wrap">
                        {
                            (unAssignedTasks)
                                .map(task => (
                                    <Chip
                                        label={task.title} key={task.id}
                                        variant="outlined"
                                        onClick={() => handleChangeTask(task)}
                                    />
                                ))

                        }
                    </Stack>
                    <Divider sx={{marginY: 2}}/>
                    <Stack spacing={{xs: 1, sm: 2}} direction="row" useFlexGap flexWrap="wrap">
                        {
                            (chosenTasks)
                                .map(task => (
                                    <Chip
                                        label={task.title} key={task.id}
                                        variant="outlined"
                                        onClick={() => handleChangeTask(task)}
                                    />
                                ))

                        }
                    </Stack>
                    <Stack spacing={{xs: 1, sm: 2}}
                           sx={{marginY: 1}}
                           direction="row" justifyContent={"center"}>
                        <Button disabled={chosenTasks.length === 0} onClick={handleSaveChanges}>
                            Save New Assigned Tasks
                        </Button>
                    </Stack>
                </CustomTabPanel>
            </DialogContent>
        </BootstrapDialog>
    );
};

interface TabPanelProps extends ReactProps {
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3, minWidth: 400, minHeight: 300}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default ProjectPage;