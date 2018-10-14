import Vue from 'vue';
import Router from 'vue-router';
import { Log } from '@/utils/log';
import store from '@/store';
import { topicActions } from '@/store/types';

const Root = () => import('@/views/Root/index.vue');
const Home = () => import('@/views/Home/index.vue');
const Favorite = () => import('@/views/Favorite/index.vue');
const Me = () => import('@/views/Me/index.vue');
const Message = () => import('@/views/Message/index.vue');
const TopicDetail = () => import('@/views/TopicDetail/index.vue');
const NetWork = () => import('@/views/NetWork/index.vue');
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
      async beforeEnter(to, from, next) {
        const isOk = await store.dispatch(`topic/${topicActions.INIT_TOPIC_DETAIL}`, {id: to.params.id, init: true});
        if (isOk) {
          next();
        } else {
          next('/network');
        }
      },
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
      path: '/network',
      component: NetWork,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      const findEle = document.getElementById(to.hash.slice(1))!;
      findEle.style.borderWidth = '1px';
      findEle.style.borderStyle = 'solid';
      findEle.style.borderColor = 'red';
      findEle.scrollIntoView({behavior: 'smooth', block: 'center'});
      return ;
    }
    if (to.path.includes('topic')) {
      return {x: 0, y: 0};
    }
  },
});
