import Vue from 'vue';
import Router from 'vue-router';

const Root = () => import('@/views/Root/index.vue');
const Home = () => import('@/views/Home/index.vue');
const Favorite = () => import('@/views/Favorite/index.vue');
const Me = () => import('@/views/Me/index.vue');
const Message = () => import('@/views/Message/index.vue');
const TopicDetail = () => import('@/views/TopicDetail/index.vue');
const Login = () => import('@/views/Login/index.vue');
const User = () => import('@/views/User/index.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: Root,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
        },
        {
          path: '/favorite',
          component: Favorite,
        },
        {
          path: '/message',
          component: Message,
        },
        {
          path: '/me',
          component: Me,
        },
      ],
    },
    {
      path: '/topic/:id',
      component: TopicDetail,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/user/:name',
      component: User,
    },
  ],
});
