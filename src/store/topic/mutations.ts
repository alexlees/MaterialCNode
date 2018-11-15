import { MutationTree } from 'vuex';
import { TopicState } from '@/store/interface';
import { topicMutations } from '@/store/types';
import { AddDetailsParmas } from './interface';
import { CNodeTopicDetail } from '@/interface';
import { Log } from '@/utils';

const mutations: MutationTree<TopicState> = {
  [topicMutations.ADD_TOPIC_DETAIL](state: TopicState, data: AddDetailsParmas) {
    state.topicDetails = [...new Set([...state.topicDetails, data.topicDetail])];
  },
  [topicMutations.REMOVE_TOPIC_DETAIL](state: TopicState) {
    // 删除最早的5个
    state.topicDetails.splice(0, 5);
  },
  [topicMutations.SET_TOPIC_DETAIL](state: TopicState, topicDetail: CNodeTopicDetail) {
    Log.log('SET_TOPIC_DETAIL');
    state.topicDetail = topicDetail;
    Log.log(state.topicDetail);
  },
};

export default mutations;
