import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("./views/home/index.vue"),
      children: [
        { path: "films", component: () => import("./views/home/films.vue") },
        {
          path: "cinemas",
          component: () => import("./views/home/cinemas.vue")
        },
        { path: "center", component: () => import("./views/home/center.vue") },
        { path: "", redirect: "/films" }
      ]
    },
    {
      path: "/film/:filmId",
      name: 'film',
      component: () => import("./views/film/index.vue")
    },
    {
      path: "/city",
      component: () => import("./views/city/index.vue")
    },
    {
      path: '/login',
      component: () => import('./views/login/index.vue')
<<<<<<< HEAD
=======
    },
    {
      path: '/card',
      component: () => import('./views/user/card.vue'),
      meta: {
        //是否已经登录
        isLogined: true
      }
>>>>>>> Zx
    },
    {
      path: "*",
      redirect: "/films"
    }
  ]
});
//全局前置守卫实现路由拦截功能
router.beforeEach((to, from, next) => {
  // 要去的页面是不是有限制
   if(to.meta.isLogined && !store.state.login.userInfo) {  // 判断是否登陆过
    return next({
      path: '/login',//没有就去登录页
      query: {
        redirect: to.fullPath
      }
    })
   }
   next()
  })

export default router