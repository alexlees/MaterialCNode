import {Module, ActionContext} from 'vuex';
import { HomeState, TabName } from '@/store/home/interface';
import { RootState } from '@/store/interface';
import { TopicTabs } from '@/enum';
import { HomeMutations, HomeActions, HomeGetters } from '@/store/home/types';

const ModuleHome: Module<HomeState, RootState> = {
  namespaced: true,
  state: {
    selectTab: TopicTabs.all,
    pages: {
      ask: 1,
      share: 1,
      all: 1,
      good: 1,
      job: 1,
      dev: 1,
    },
  },
  mutations: {
    [HomeMutations.SET_TAB](state: HomeState, tab: TopicTabs) {
      state.selectTab = tab;
    },
  },
  actions: {
    async [HomeActions.PREV_PAGE]({state}: ActionContext<HomeState, RootState>, tab: TopicTabs) {
      const tabName: TabName = TopicTabs[tab] as TabName;
      if (state.pages[tabName] > 1) {
        state.pages[tabName] -= 1;
        return true;
      } else {
        // TODO 全局错误 已经是第一页了
        return false;
      }
    },
    async [HomeActions.NEXT_PAGE]({state}: ActionContext<HomeState, RootState>, tab: TopicTabs) {
      const tabName: TabName = TopicTabs[tab] as TabName;
      state.pages[tabName] += 1;
      return true;
    },
  },
  getters: {
    [HomeGetters.CURRENTPAGE](state: HomeState) {
      return (tab: TopicTabs) => {
        const tabName: TabName = TopicTabs[tab] as TabName;
        return state.pages[tabName];
      };
    },
  },
};

export default ModuleHome;
