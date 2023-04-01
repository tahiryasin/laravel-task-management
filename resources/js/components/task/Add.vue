<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Add Task</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label for="">Project</label>
                                    <select v-model="task.project_id" class="form-control" >
                                        <option value="">Select Project</option>
                                        <option v-for="project in projects" :value="project.id">{{ project.name }}</option>
                                    </select>
                                    <div class="input-errors" v-for="error of v$.task.project_id.$errors"
                                         :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="task.name">
                                    <div class="input-errors" v-for="error of v$.task.name.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Priority</label>
                                    <input type="text" class="form-control" v-model="task.priority">
                                    <div class="input-errors" v-for="error of v$.task.priority.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Swal from "sweetalert2";
export default {
    setup () {
        return { v$: useValidate() }
    },
    name:"add-task",
    data(){
        return {
            task:{
                project_id:"",
                name:"",
                priority:""
            },
            projects:{},
        }
    },
    validations() {
        return {
            task:{
                project_id: { required},
                name:{ required},
                priority:{ required}
            }
        }
    },
    mounted(){
        this.getAllProjects()
    },
    methods:{
        async getAllProjects(){
            await this.axios.get(`/api/project`).then(response=>{
                this.projects = response.data.data
            }).catch(error=>{
                console.log(error)
            })
        },
        async create(){
            this.v$.$validate();
            if (!this.v$.$errors.length) {
                await this.axios.post('/api/task',this.task).then(response=>{
                    Swal.fire({
                        title: 'Success',
                        text:   "Task has been added!",
                        icon: 'success',

                    });
                    this.$router.push({name:"taskList"})
                }).catch(error=>{
                    console.log(error)
                })
            }

        },

    }
}
</script>
