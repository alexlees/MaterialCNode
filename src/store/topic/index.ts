import { Module } from 'vuex';
import { RootState, TopicState } from '@/store/interface';

import mutations from './mutations';
import actions from './actions';
import state from './state';
import getters from './getters';

const TopicModule: Module<TopicState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default TopicModule;
