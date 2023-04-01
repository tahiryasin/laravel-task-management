const Welcome = () => import('./Welcome.vue' /* webpackChunkName: "resource/js/components/welcome" */)
const TaskList = () => import('./task/List.vue' /* webpackChunkName: "resource/js/components/task/list" */)
const TaskCreate = () => import('./task/Add.vue' /* webpackChunkName: "resource/js/components/task/add" */)
const TaskEdit = () => import('./task/Edit.vue' /* webpackChunkName: "resource/js/components/task/edit" */)
const ProjectList = () => import('./project/List.vue' /* webpackChunkName: "resource/js/components/task/list" */)
const ProjectCreate = () => import('./project/Add.vue' /* webpackChunkName: "resource/js/components/task/list" */)

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Welcome
    },
    {
        name: 'taskList',
        path: '/task',
        component: TaskList
    },
    {
        name: 'taskEdit',
        path: '/task/:id/edit',
        component: TaskEdit
    },
    {
        name: 'taskAdd',
        path: '/task/add',
        component: TaskCreate
    },
    {
        name: 'projectList',
        path: '/project',
        component: ProjectList
    },
    {
        name: 'projectAdd',
        path: '/project/add',
        component: ProjectCreate
    },
]
