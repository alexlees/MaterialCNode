import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { postAccessToken, getUserInfo } from '@/api';
import { Log, setAccessToken, getAccessToken, removeAccessToken } from '@/utils';
import { RootState, UserInfo, SnackBar } from '@/store/interface';
import { rootMutations, rootActions } from '@/store/types';
import home from './home';
import topic from './topic';
import favorite from './favorite';
import author from './author';
import messages from './messages';

Vue.use(Vuex);

const initState: RootState = {
  showTabbar: true,
  user: null,
  accesstoken: getAccessToken(),
  snackBar: {
    value: false,
    timeout: 6000,
    color: 'error',
    message: '',
  },
  prefix: `
  ------
  来自[MaterialCNode](https://alexlees.top)
  `,
  addPrefix: true,
};
const mutations = {
  [rootMutations.SHOW_TABBAR](s: RootState) {
    s.showTabbar = true;
  },
  [rootMutations.HIDE_TABBAR](s: RootState) {
    s.showTabbar = false;
  },
  [rootMutations.SET_ACCESS_TOKEN](s: RootState, accesstoken: string) {
    s.accesstoken = accesstoken;
    setAccessToken(accesstoken);
  },
  [rootMutations.SET_USER_INFO](s: RootState, userInfo: UserInfo) {
    s.user = userInfo;
  },
  [rootMutations.SHOW_SNACK_BAR](s: RootState, {message, timeout = 6000, color = 'error'}: SnackBar) {
    s.snackBar.color = color;
    s.snackBar.timeout = timeout;
    s.snackBar.message = message;
    s.snackBar.value = true;
  },
  [rootMutations.HIDE_SNACK_BAR](s: RootState) {
    s.snackBar = {
      value: false,
      timeout: 6000,
      color: 'error',
      message: '',
    };
  },
  [rootMutations.DELETE_ACCESS_TOKEN](s: RootState) {
    s.accesstoken = null;
    removeAccessToken();
  },
  [rootMutations.TOGGLE_ADD_PREFIX](s: RootState) {
    s.addPrefix = !s.addPrefix;
  },
};
const actions = {
  async [rootActions.LOGIN]({commit, dispatch, state}: ActionContext<RootState, RootState>, accesstoken: string) {
    if (!accesstoken && state.accesstoken) {
      accesstoken = state.accesstoken;
    } else if (!accesstoken && !state.accesstoken) {
      commit(rootMutations.SHOW_SNACK_BAR, {message: 'accesstoken错误'});
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
};
const store = new Vuex.Store({
  state: initState,
  mutations,
  actions,
  modules: {
    home,
    topic,
    favorite,
    author,
    messages,
  },
});
store.dispatch(rootActions.LOGIN);
export default store;
