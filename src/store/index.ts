import Vue from 'vue';
import Vuex from 'vuex';
import { rootActions } from '@/store/types';
import home from './home';
import topic from './topic';
import author from './author';
import messages from './messages';
import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    home,
    topic,
    author,
    messages,
  },
});
store.dispatch(rootActions.LOGIN);
export default store;
