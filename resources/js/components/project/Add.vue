<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Add Project</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="project.name">
                                    <div class="input-errors" v-for="error of v$.project.name.$errors" :key="error.$uid">
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
import {required} from '@vuelidate/validators'
import Swal from "sweetalert2";

export default {
    setup() {
        return {v$: useValidate()}
    },
    name: "add-task",
    data() {
        return {
            project: {
                name: "",
            },
        }
    },
    validations() {
        return {
            project: {
                name: {required},
            },
        }
    },
    mounted() {

    },
    methods: {
        async create() {
            this.v$.$validate();
            if (!this.v$.$errors.length) {
                await this.axios.post('/api/project', this.project).then(response => {
                    Swal.fire({
                        title: 'Success',
                        text:   "Project has been added!",
                        icon: 'success',

                    });
                    this.$router.push({name: "projectList"})
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>
