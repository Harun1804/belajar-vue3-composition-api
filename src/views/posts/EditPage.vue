<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="card border-0 rounded shadow-sm">
                <div class="card-body">
                    <h4>EDIT POST</h4>
                    <hr>
                    <div v-if="validation.errors" class="mt-2 alert alert-danger">
                        <ul class="mt-0 mb-0">
                            <li v-for="(error, index) in validation.errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                    <form @submit.prevent="update" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="title" class="font-weight-bold mb-2">TITLE</label>
                            <input type="text" class="form-control" v-model="post.title"
                                placeholder="Masukkan Judul Post">
                        </div>
                        <div class="form-group">
                            <label for="title" class="font-weight-bold mb-2">Image</label>
                            <input type="file" class="form-control" @change="handleFileUpload"
                                placeholder="Masukkan Thumbnail">
                        </div>
                        <div class="form-group mt-3">
                            <label for="content" class="font-weight-bold mb-2">CONTENT</label>
                            <textarea class="form-control" rows="4" v-model="post.body"
                                placeholder="Masukkan Konten Post"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const post = reactive({
            title: '',
            body: ''
        })

        const validation = ref([])

        const router = useRouter()
        const route = useRoute()

        //mounted
        onMounted(() => {

        //get API from Backend
            axios.get(`http://localhost:8000/api/blog/${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.title  = response.data.data.title  
                    post.body   = response.data.data.body  
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        function update() {

            let title   = post.title
            let body    = post.body

            axios.put(`http://localhost:8000/api/blog/${route.params.id}`, {
                title,
                body
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'posts.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        return {
            post,
            validation,
            router,
            route,
            update
        }
    }
}
</script>

<style>

</style>