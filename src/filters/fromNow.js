import Vue from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

Vue.filter('fromNow', (time) => {
  return dayjs(time).fromNow();
});
