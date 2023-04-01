<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"taskAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Task</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="project">Filter by project:</label>
                            <select v-model="selectedProject" class="form-control" @change="getTasks(selectedProject)">
                                <option value="">All Projects</option>
                                <option v-for="(project, key) in projects" :key="key" :value="project.id">{{ project.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">Sr. #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Project</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <draggable v-model="tasks" tag="tbody" item-key="id" @change="onDrag">
                                <template #item="{ element,index }">
                                    <tr>
                                        <td>{{ index+1 }}</td>
                                        <td>{{ element.name }}</td>
                                        <td>{{ element.project.name }}</td>
                                        <td>
                                            <router-link :to='{name:"taskEdit",params:{id:element.id}}' class="btn btn-success">Edit</router-link>
                                            <button type="button" @click="deleteTask(element.id)" class="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                </template>
                            </draggable>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import Swal from 'sweetalert2'

export default {
    name:"tasks",
    components: {
        draggable
    },
    data(){
        return {
            display: "Table Column",
            dragging: false,
            tasks:[],
            projects: [],
            selectedProject: "",
        }
    },
    mounted(){
        this.getProjects();
        this.getTasks()
    },
    computed: {
        indexedTasks() {
            return this.tasks.map((task, index) => ({
                index,
                ...task,
            }));
        },
    },
    methods:{
        async getProjects() {
            await this.axios
                .get("/api/project")
                .then((response) => {
                    this.projects = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.projects = [];
                });
        },
        async getTasks(projectId = null){

            let url = '/api/task';
            if (projectId) {
                this.selectedProject = projectId;
                url += `?project_id=${projectId}`;
            }
            await this.axios.get(url).then(response=>{
                this.tasks = response.data.data
            }).catch(error=>{
                this.tasks = []
            })
        },
        filterTasks(event) {
            const projectId = event.target.value;
            this.getTasks(projectId);
        },
        deleteTask(id){
            Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this task!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/task/${id}`).then(response=>{
                        this.getTasks()
                        Swal.fire({
                            title: 'Success',
                            text:   "Task has been deleted!",
                            icon: 'success',

                        });
                    }).catch(error=>{
                        console.log(error)
                    })
                }
                else{
                    Swal.fire({
                        title: 'Cancelled',
                        text:   "Task not deleted!",
                        icon: 'warning',

                    });
                }
            })
        },
        onDrag(event){
            let newIndex = event.moved.newIndex;
            let task = event.moved.element;
            task.priority = newIndex+1;
            task._method = "patch";

            this.axios.post(`/api/task/${task.id}`,task).then(response=>{
                Swal.fire({
                    title: 'Task updated',
                    text:   "Priority of the task has been changed!",
                    icon: 'success',

                });
                this.$router.push({name:"taskList"})
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
