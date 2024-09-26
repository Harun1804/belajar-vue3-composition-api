<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="card border-0 rounded shadow-sm">
                <div class="card-body">
                    <h4>TAMBAH POST</h4>
                    <hr>
                    <div v-if="validation.errors" class="mt-2 alert alert-danger">
                        <ul class="mt-0 mb-0">
                            <li v-for="(error, index) in validation.errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                    <form @submit.prevent="store" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="title" class="font-weight-bold mb-2">TITLE</label>
                            <input type="text" class="form-control" v-model="post.title" placeholder="Masukkan Judul Post">
                        </div>
                        <div class="form-group">
                            <label for="title" class="font-weight-bold mb-2">Image</label>
                            <input type="file" class="form-control" @change="handleFileUpload" placeholder="Masukkan Thumbnail">
                        </div>
                        <div class="form-group mt-3">
                            <label for="content" class="font-weight-bold mb-2">CONTENT</label>
                            <textarea class="form-control" rows="4" v-model="post.body" placeholder="Masukkan Konten Post"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        const post = reactive({
            title: '',
            body: '',
            image: new Image()
        })

        const validation = ref([])

        const router = useRouter()

        function handleFileUpload(event) {
            post.image = event.target.files[0];
        }

        function store() {
            let title = post.title
            let body = post.body
            let image = post.image

            let formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('image', image);

            axios.post('http://localhost:8000/api/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                router.push({ name: 'posts.index' })
            })
            .catch((err) => {                
                validation.value = err.response.data
            })
        }

        return {
            post,
            validation,
            store,
            router,
            handleFileUpload
        }
    }
}
</script>

<style>

</style>