import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from '@/store/interface';
import { rootMutations } from '@/store/types';
import home from './home';

Vue.use(Vuex);

const state: RootState = {
  showTabbar: true,
};
const mutations = {
  [rootMutations.SHOW_TABBAR](s: RootState) {
    s.showTabbar = true;
  },
  [rootMutations.HIDE_TABBAR](s: RootState) {
    s.showTabbar = false;
  },
};
const actions = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    home,
  },
});
