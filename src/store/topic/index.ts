import { Module, ActionTree, ActionContext, MutationTree } from 'vuex';
import { TopicState } from '@/store/topic/interface';
import { RootState } from '@/store/interface';
import { topicActions, topicMutations } from '@/store/topic/types';
import { getTopicDetail } from '@/api';
import { Log } from '@/utils';
import { CNodeTopicDetail } from '@/interface';

const actions: ActionTree<TopicState, RootState> = {
  async [topicActions.GET_TOPIC_DETAIL](
    { commit, state }: ActionContext<TopicState, RootState>,
    id: string,
  ) {
    if (state.topicDetail && state.topicDetail.id === id) {
      return true;
    }
    try {
      const data = await getTopicDetail(id);
      commit(topicMutations.SET_TOPIC_DETAIL, data);
      return true;
    } catch (error) {
      Log.err(error);
      // TODO 全局错误
      return false;
    }
  },
};
const mutations: MutationTree<TopicState> = {
  [topicMutations.SET_TOPIC_DETAIL](state: TopicState, data: CNodeTopicDetail) {
    state.topicDetail = data;
  },
};
const TopicModule: Module<TopicState, RootState> = {
  namespaced: true,
  state: {
    topicDetail: null,
  },
  mutations,
  actions,
};

export default TopicModule;
