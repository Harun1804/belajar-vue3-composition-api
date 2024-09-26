//import vue router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/IndexHomePage.vue')
  },
  {
    path: '/posts',
    name: 'posts.index',
    component: () => import( /* webpackChunkName: "post.index" */ '@/views/posts/IndexPage.vue')
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import( /* webpackChunkName: "post.create" */ '@/views/posts/CreatePage.vue')
  },
  {
    path: '/posts/edit/:id',
    name: 'posts.edit',
    component: () => import( /* webpackChunkName: "post.edit" */ '@/views/posts/EditPage.vue')
  }
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes  // config routes
})

export default router