<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to='{name:"projectAdd"}' class="btn btn-primary">Create</router-link>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Projects</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">Sr. #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(element,index) in projects">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ element.name }}</td>
                                    <td>
                                        <button type="button" @click="deleteProject(element.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name:"projects",
    data(){
        return {
            projects: [],
        }
    },
    mounted(){
        this.getProjects()
    },
    computed: {
        indexedProjects() {
            return this.projects.map((project, index) => ({
                index,
                ...project,
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
        deleteProject(id){
            Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this project!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.axios.delete(`/api/project/${id}`).then(response=>{
                        this.getProjects()
                        Swal.fire({
                            title: 'Success',
                            text:   "Project has been deleted!",
                            icon: 'success',

                        });
                    }).catch(error=>{
                        console.log(error)
                    })
                }
                else{
                    Swal.fire({
                        title: 'Cancelled',
                        text:   "Project not deleted!",
                        icon: 'warning',

                    });
                }
            })
        }
    }
}
</script>
