import {useEffect, useState} from 'react';
import {TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Pagination} from '@mui/material';
import useApiConfiguration from "../../common/hooks/useApiConfiguration.tsx";
import {TaskApi} from "../../Api/generated";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import reactToastConfig from "../../common/helper/react-toast-config.ts";

interface ApiFilter {
    title?: string | undefined,
    priority?: string | undefined,
    category?: string | undefined,
    completed?: boolean | undefined,
    projectId?: number | undefined,
    pageNo?: number | undefined,
    pageSize?: number | undefined,
}

const PAGE_SIZE = 6;

const TaskFilterForm = ({onFetch, onSort}: any) => {
    const [filterData, setFilterData] = useState({
        title: '',
        priority: '',
        category: '',
        page: 1
    });
    const [curPage, setCurPage] = useState(1)
    const [pages, setPages] = useState(10)
    const [sortOption, setSortOption] = useState('');
    const config = useApiConfiguration();
    const taskApi = new TaskApi(config)
    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFilterData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        (async () => {
            await fetchTasks([
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                curPage, PAGE_SIZE
            ])
        })()
    }, [curPage])

    const handleSortChange = (event: any) => {
        setSortOption(event.target.value);
    };

    async function fetchTasks(filters: any[]) {
        try {
            const {data} = await taskApi.getMyTasks(...filters)
            onFetch(data.content || []);
            setPages(data.totalPages || 1);
        } catch (e: any) {
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const filter: ApiFilter = {
            title: filterData.title,
            priority: filterData.priority.toUpperCase(),
            category: filterData.category,
            completed: undefined,
            projectId: undefined,
            pageNo: filterData.page,
            pageSize: PAGE_SIZE
        }
        await fetchTasks(Object.values(filter))
    };

    const handleSort = () => {
        onSort(sortOption);
    };

    function handlePageChange(_: any, value: number) {
        setCurPage(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        name="title"
                        label="Task Title"
                        value={filterData.title}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="priority"
                            value={filterData.priority}
                            onChange={handleChange}
                            label="Priority"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={filterData.category}
                            onChange={handleChange}
                            label="Category"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                            <MenuItem value="work">Work</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={handleSortChange}
                            label="Sort By"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="taskName">Task Name</MenuItem>
                            <MenuItem value="priority">Priority</MenuItem>
                            <MenuItem value="category">Category</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Button type="submit" variant="contained" color="primary">
                        Filter
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSort}
                        disabled={!sortOption}
                        style={{marginLeft: '8px'}}
                    >
                        Sort
                    </Button>
                </Grid>
                <Grid display={"flex"} justifyContent={"center"} item xs={12}>
                    <Pagination page={curPage} onChange={handlePageChange} count={pages} size="small"/>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskFilterForm;