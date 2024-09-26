<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="card border-0 rounded shadow-sm">
                <div class="card-body">
                    <h4>Data Posts</h4>
                    <hr>
                    <router-link :to="{name: 'posts.create'}" class="btn btn-md btn-success">TAMBAH POST</router-link>

                    <table class="table table-striped table-bordered mt-4">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">TITLE</th>
                                <th scope="col">CONTENT</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(post, index) in posts" :key="index">
                                <td>{{ post.title }}</td>
                                <td>{{ post.body }}</td>
                                <td class="text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        let posts = ref([])

        onMounted(() => {
            getDataPosts()
        })

        function getDataPosts() {
            axios.get('http://localhost:8000/api/blog')
            .then(res => {
                posts.value = res.data.data.data
            })
            .catch((err) => {
                console.log(err.response.data)
            })
        }

        return {
            posts,
            getDataPosts
        }
    }
}
</script>

<style>

</style>