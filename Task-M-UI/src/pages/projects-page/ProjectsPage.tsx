import {Button, Divider, Grid, TextField} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import ProjectList from "../../components/project-list/ProjectList.tsx";
import {Outlet} from "react-router-dom";
import {ProjectApi} from "../../Api/generated";
import useApiConfiguration from "../../common/hooks/useApiConfiguration.tsx";
import {useDispatch} from "react-redux";
import {addProject} from '../../redux/project-slice.ts'
import {toast} from "react-toastify";
import reactToastConfig from "../../common/helper/react-toast-config.ts";

export default function ProjectsPage() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const config = useApiConfiguration();
    const projectApi = new ProjectApi(config);
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (name.trim()) {
                setName('');
                const {data} = await projectApi.createProject({name})
                dispatch(addProject({...data, task: []}))
                toast('Project added', reactToastConfig('success'))
            } else {
                toast('Please enter a name', reactToastConfig('error'))
            }
        } catch (e: any) {
            toast(e.response.data.error, reactToastConfig('error'))
        }
    };


    return (
        <Box sx={{paddingY: '10px', paddingX: '20px'}}>
            <Outlet/>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" sx={{paddingY: '20px'}}>
                    <Grid item xs={12}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            New Project
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Divider/>
            <ProjectList/>
        </Box>
    )
}