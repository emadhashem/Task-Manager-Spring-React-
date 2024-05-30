import {ProjectResponse} from "../Api/generated";
import {createSlice} from "@reduxjs/toolkit";

interface ProjectsState {
    projects: ProjectResponse[]
}

const initialState: ProjectsState = {
    projects: []
}

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state: ProjectsState, {payload}) => {
            state.projects = payload;
        },
        updateProject: (state: ProjectsState, {payload}) => {
            state.projects = state
                .projects
                .map((project) => {
                    if (project.id == payload.id) {
                        return payload;
                    }
                    return project;
                });
        },
        addProject: (state: ProjectsState, {payload}) => {
            state.projects.push(payload);
        },
        deleteProject: (state: ProjectsState, {payload}) => {
            state.projects = state.projects.filter((p) => p.id !== payload);
        }
    }
})
export const {
    setProjects,
    deleteProject,
    updateProject,
    addProject
} = projectSlice.actions

export default projectSlice.reducer