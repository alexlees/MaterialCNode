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
const NotFound = () => import('@/views/NotFound/index.vue');
const Topic = () => import('@/views/TopicDetail/Topic.vue');
const Detail = () => import('@/views/TopicDetail/Detail.vue');
const Reply = () => import('@/views/TopicDetail/Reply.vue');
const NewReply = () => import('@/views/TopicDetail/NewReply.vue');
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
      redirect: '/topic/:id/topic',
      children: [
        {
          path: '/topic/:id/topic',
          component: Topic,
        },
        {
          path: '/topic/:id/reply',
          component: Reply,
        },
        {
          path: '/topic/:id/info',
          component: Detail,
        },
        {
          path: '/topic/:id/newreply',
          component: NewReply,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/user/:name',
      component: User,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});
