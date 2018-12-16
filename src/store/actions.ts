import { rootActions, rootMutations } from './types';
import { ActionContext, ActionTree } from 'vuex';
import { RootState, SnackBar, Dialog } from './interface';
import { postAccessToken, getUserInfo, getUserFavorite, postNewTopic } from '@/api';
import { Log } from '@/utils';
import { PostNewTopicData } from '@/interface';

const actions: ActionTree<RootState, RootState> = {
  async [rootActions.LOGIN]({commit, dispatch, state}: ActionContext<RootState, RootState>, accesstoken: string) {
    if (!accesstoken && state.accesstoken) {
      accesstoken = state.accesstoken;
    } else if (!accesstoken && !state.accesstoken) {
      // commit(rootMutations.SHOW_SNACK_BAR, {message: 'accesstoken错误'});
      return false;
    }
    try {
      const userInfo = await postAccessToken(accesstoken);
      // 保存accesstoken
      commit(rootMutations.SET_ACCESS_TOKEN, accesstoken);
      // 请求用户信息
      if (await dispatch(rootActions.GET_USER_INFO, userInfo.loginname)) {
        return true;
      }
      return false;
    } catch (error) {
      Log.err(error);
      return false;
    }
  },
  async [rootActions.GET_USER_INFO]({commit}: ActionContext<RootState, RootState>, loginname: string) {
    try {
      const userInfo = await getUserInfo(loginname);
      commit(rootMutations.SET_USER_INFO, userInfo);
      return true;
    } catch (error) {
      Log.err(error);
      return false;
    }
  },
  async [rootActions.LOGOUT]({commit}: ActionContext<RootState, RootState>) {
    commit(rootMutations.SET_USER_INFO, null);
    commit(rootMutations.DELETE_ACCESS_TOKEN);
  },
  async [rootActions.GET_MYFAVORITES]({commit, state, dispatch}: ActionContext<RootState, RootState>) {
    if (state.user) {
      try {
        const data = await getUserFavorite(state.user.loginname);
        commit(rootMutations.SET_MYFAVORITES, data);
      } catch (error) {
        const message = error.message || '请求收藏失败';
        commit(rootMutations.SHOW_SNACK_BAR, { message } as SnackBar);
        Log.log(error);
      }
    } else if (state.user === null && state.accesstoken) {
      commit(
        rootMutations.SHOW_SNACK_BAR,
        {message: '正在获取用户信息...请等待.',
        color: 'info', timeout: 1000} as SnackBar,
      );
      setTimeout(() => {
        dispatch(rootActions.GET_MYFAVORITES);
      }, 500);
    } else {
      commit(rootMutations.SHOW_SNACK_BAR, { message: '未登录不能获取收藏' } as SnackBar);
      Log.log('未登录');
    }
  },
  async [rootActions.CREATE_TOPIC]({commit, state}: ActionContext<RootState, RootState>, topic: PostNewTopicData) {
    if (state.accesstoken) {
      try {
        const newTopic: PostNewTopicData = Object.create(null);
        Object.assign(newTopic, topic);
        newTopic.accesstoken = state.accesstoken;
        const data = await postNewTopic(newTopic);
        Log.log(data);
        return data;
      } catch (error) {
        const message = error.message || '网络错误';
        commit(rootMutations.SHOW_SNACK_BAR, {message} as SnackBar);
        return null;
      }
    } else {
      commit(rootMutations.SHOW_SNACK_BAR, { message: '未登录不能发布主题' } as SnackBar);
      return null;
    }
  },
};
export default actions;
