import Vue from 'vue';
import Router from 'vue-router';

const Root = () => import('@/views/Root/index.vue');
const Home = () => import('@/views/Home/index.vue');
const Favorite = () => import('@/views/Favorite/index.vue');
const Me = () => import('@/views/Me/index.vue');
const Message = () => import('@/views/Message/index.vue');

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
  ],
});
