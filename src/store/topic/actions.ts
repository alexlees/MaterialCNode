import { ActionTree, ActionContext } from 'vuex';
import { RootState, SnackBar, TopicState } from '@/store/interface';
import { topicActions, topicMutations } from '@/store/types';
import { getTopicDetail, postDeCollect, postCollect, postReplyUps, postNewReply } from '@/api';
import { Log } from '@/utils';
import { rootMutations } from '@/store/types';
import { findInArr } from './findTopicInArr';

const actions: ActionTree<TopicState, RootState> = {
  async [topicActions.COLLECT_OR_DE_COLLECT](
    { commit, state, rootState, dispatch }: ActionContext<TopicState, RootState>,
  ) {
    if (state.topicDetail === null) {
      commit(rootMutations.SHOW_SNACK_BAR, '主题为空', {root: true});
      return;
    }
    try {
      if (state.topicDetail.is_collect) {
        await postDeCollect({accesstoken: rootState.accesstoken as string, topic_id: state.topicDetail.id});
        await dispatch(topicActions.INIT_TOPIC_DETAIL, {id: state.topicDetail.id});
        commit(rootMutations.SHOW_SNACK_BAR, {message: '取消收藏成功', color: 'success'} as SnackBar, {root: true});
      } else {
        await postCollect({accesstoken: rootState.accesstoken as string, topic_id: state.topicDetail.id});
        await dispatch(topicActions.INIT_TOPIC_DETAIL, {id: state.topicDetail.id});
        commit(rootMutations.SHOW_SNACK_BAR, {message: '收藏成功', color: 'success'} as SnackBar, {root: true});
      }
    } catch (error) {
      const message = state.topicDetail.is_collect ? '取消收藏失败！' : '收藏失败！';
      commit(rootMutations.SHOW_SNACK_BAR, {message} as SnackBar, {root: true});
    }
  },
  async [topicActions.POST_REPLY_UPS](
    { commit, state, rootState, dispatch }: ActionContext<TopicState, RootState>,
    replyId: string,
  ) {
    if (rootState.accesstoken === null) {
      commit(rootMutations.SHOW_SNACK_BAR, {message: '未登录！'} as SnackBar, {root: true});
      return;
    }
    try {
      await postReplyUps(replyId, {accesstoken: rootState.accesstoken as string});
      await dispatch(topicActions.INIT_TOPIC_DETAIL, {id: state.topicDetail!.id});
    } catch (error) {
      const message = error.message || '网络错误';
      commit(rootMutations.SHOW_SNACK_BAR, {message} as SnackBar, {root: true});
    }
  },
  async [topicActions.POST_NEW_REPLY](
    { commit, state, rootState, dispatch }: ActionContext<TopicState, RootState>,
    content: string,
  ) {
    if (rootState.accesstoken === null) {
      commit(rootMutations.SHOW_SNACK_BAR, {message: '未登录！'} as SnackBar, {root: true});
      return false;
    }
    if (state.topicDetail) {
      try {
        // 添加后缀
        if (rootState.addPrefix) {
          content += rootState.prefix;
        }
        const reply = await postNewReply(state.topicDetail.id, {content, accesstoken: rootState.accesstoken});
        Log.log(reply);
        await dispatch(topicActions.INIT_TOPIC_DETAIL, {id: state.topicDetail.id});
        commit(rootMutations.SHOW_SNACK_BAR, {message: '评论成功！', color: 'success'} as SnackBar, {root: true});
      } catch (error) {
        const message = error.message || '评论失败！';
        commit(rootMutations.SHOW_SNACK_BAR, {message} as SnackBar, {root: true});
      }
    } else {
      commit(rootMutations.SHOW_SNACK_BAR, {message: '主题不存在！'} as SnackBar, {root: true});
    }
  },
  async [topicActions.INIT_TOPIC_DETAIL](
    { commit, state }: ActionContext<TopicState, RootState>,
    {id, init = false}: {id: string; init: boolean},
  ) {
    const findTopicDetail = findInArr(state.topicDetails, id);
    if (findTopicDetail && init) {
      Log.log('findTopicDetail');
      await commit(topicMutations.SET_TOPIC_DETAIL, findTopicDetail);
      return true;
    } else {
      try {
        const data = await getTopicDetail(id);
        commit(topicMutations.ADD_TOPIC_DETAIL, {id, topicDetail: data});
        Log.log('data');
        await commit(topicMutations.SET_TOPIC_DETAIL, data);
        if (state.topicDetails.length >= 10) {
          Log.log('REMOVE_TOPIC_DETAIL');
          commit(topicMutations.REMOVE_TOPIC_DETAIL);
        }
        return true;
      } catch (error) {
        Log.err(error);
        // TODO 全局错误
        return false;
      }
    }
  },
};
export default actions;
