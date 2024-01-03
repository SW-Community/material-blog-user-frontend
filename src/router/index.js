import {ref} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import MyProfileView from '../views/MyProfileView.vue'
import AllPostsView from "../views/AllPostsView.vue"
import PostDetailView from '../views/PostDetailView.vue'
import TopicsView from '../views/TopicsView.vue'
import TopicAndDateView from '../views/TopicAndDateView.vue'
import AddPostView from '../views/AddPostView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path:'/myProfile',
      name:'myProfile',
      component:MyProfileView
    },
    {
      path:'/posts',
      name:'posts',
      component:AllPostsView
    },
    {
      path: '/postDetail/:id',
      name:'postDetail',
      component:PostDetailView
    },
    {
      path:'/topics',
      name:'topics',
      component:TopicsView
    },
    {
      path:'/topicAndDate/:id/:name',
      name:'topicAndDate',
      component:TopicAndDateView
    },
    {
      path:'/addPost/:tid/:tName/:locked',
      name:'addPost',
      component:AddPostView
    },
    {
      path:'/comingSoon',
      component:ComingSoonView
    }
  ]
})

export default router
