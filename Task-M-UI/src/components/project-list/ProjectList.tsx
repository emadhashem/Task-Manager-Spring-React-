import {Grid, Pagination, Paper, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CircularProgressWithLabel from "../Circular-Progress-With-Label/CircularProgressWithLabel.tsx";
import {useEffect, useState} from "react";
import useApiConfiguration from "../../common/hooks/useApiConfiguration.tsx";
import {CreateTaskResponse, ProjectApi, ProjectResponse} from "../../Api/generated";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {setProjects} from '../../redux/project-slice.ts'
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import reactToastConfig from "../../common/helper/react-toast-config.ts";


const ProjectList = () => {
    const [curPage, setCurPage] = useState(1)
    const [pages, setPages] = useState(10)
    const config = useApiConfiguration();
    const projectApi = new ProjectApi(config);
    const navigate = useNavigate();
    const projects = useSelector((state: RootState) => state.projects.projects)
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            await fetchProjects([
                undefined, curPage, 6
            ])
        })()
    }, [curPage])
    const fetchProjects = async (arr: any[]) => {
        try {
            const {data} = await projectApi.myProjects(...arr)
            dispatch(setProjects(data.content || []))
            setPages(data.totalPages || 1);
        } catch (e) {
            let code = 0;
            if (e instanceof AxiosError) {
                code = e.response!.status
            }
            if (code == 403 || code == 401) {
                toast('Please login again', reactToastConfig('error'))
            } else {
                toast('Some thing wrong happen', reactToastConfig('error'))
            }
        }
    }

    function handlePageChange(_: any, value: number) {
        setCurPage(value)
    }

    const calculateProgress = (tasksCompleted: number, taskCount: number) => {
        return Math.floor((tasksCompleted / taskCount) * 100);
    };

    function countCompletedTasks(tasks: CreateTaskResponse[]) {
        return tasks.filter((task: any) => task.completed).length
    }

    function navigateToProject(project: ProjectResponse) {
        navigate(`/projects/${project.id}`, {
            state: {project}
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} sx={{paddingY: '10px', paddingX: '20px'}}>
                <Grid display={"flex"} justifyContent={"center"} item xs={12}>
                    <Pagination page={curPage} onChange={handlePageChange} count={pages} size="small"/>
                </Grid>
                {projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard onClick={() => navigateToProject(project)} elevation={3}>
                            <ProjectName variant="h6">
                                {project.name}
                            </ProjectName>
                            <TaskCount variant="body2">
                                Tasks: {project.tasks?.length}
                            </TaskCount>
                            {
                                (project.tasks ?? []).length > 0 ? (<CircularProgressWithLabel
                                    variant="determinate"
                                    value={calculateProgress(countCompletedTasks(project.tasks ?? []),
                                        project.tasks?.length ?? 0)}
                                />) : <p>No Tasks Yet.</p>
                            }
                        </ProjectCard>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    );
};


const theme = createTheme({
    palette: {
        text: {
            secondary: '#888888',
        },
    },
});

const ProjectCard = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    cursor: 'pointer'
}));

const ProjectName = styled(Typography)(({theme}) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const TaskCount = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
}));

export default ProjectList;