import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Todo from '@/views/ToDo.vue';
import Upload from '@/views/Upload.vue';
import Notecards from '@/views/Notecards.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
      path: "/todo/:id",
      name: "todo",
      component: Todo
    },
    {
      path: "/notecards/:id",
      name: "notecards",
      component: Notecards
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload
    }
]
});

export default router;
