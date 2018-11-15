import { rootMutations } from './types';
import { RootState, UserInfo, SnackBar, Dialog } from './interface';
import { setAccessToken, removeAccessToken } from '@/utils';
import { MutationTree } from 'vuex';
import { CNodeTopic } from '@/interface';

const mutations: MutationTree<RootState> = {
  [rootMutations.SHOW_TABBAR](state: RootState) {
    state.showTabbar = true;
  },
  [rootMutations.HIDE_TABBAR](state: RootState) {
    state.showTabbar = false;
  },
  [rootMutations.SET_ACCESS_TOKEN](state: RootState, accesstoken: string) {
    state.accesstoken = accesstoken;
    setAccessToken(accesstoken);
  },
  [rootMutations.SET_USER_INFO](state: RootState, userInfo: UserInfo) {
    state.user = userInfo;
  },
  [rootMutations.SHOW_SNACK_BAR](state: RootState, {message, timeout = 6000, color = 'error'}: SnackBar) {
    state.snackBar.color = color;
    state.snackBar.timeout = timeout;
    state.snackBar.message = message;
    state.snackBar.value = true;
  },
  [rootMutations.HIDE_SNACK_BAR](state: RootState) {
    state.snackBar = {
      value: false,
      timeout: 6000,
      color: 'error',
      message: '',
    };
  },
  [rootMutations.DELETE_ACCESS_TOKEN](state: RootState) {
    state.accesstoken = null;
    removeAccessToken();
  },
  [rootMutations.TOGGLE_ADD_PREFIX](state: RootState) {
    state.addPrefix = !state.addPrefix;
  },
  [rootMutations.SET_MYFAVORITES](state: RootState, favorites: CNodeTopic[]) {
    state.myFavorites = [...favorites];
  },
  [rootMutations.SHOW_DIALOG](state: RootState, dialog: Dialog) {
    dialog.value = true;
    state.dialog = dialog;
  },
  [rootMutations.HIDE_DIALOG](state: RootState) {
    state.dialog = { value: false };
  },
};

export default mutations;
