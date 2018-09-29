import { Module, ActionContext } from 'vuex';
import { RootState, AuthorState, UserInfo, SnackBar } from '@/store/interface';
import { authorMutation, authorAction } from '@/store/author/types';
import { getUserInfo } from '@/api';
import { rootMutations } from '@/store/types';

const ModuleFavorite: Module<AuthorState, RootState> = {
  namespaced: true,
  state: {
    author: null,
  },
  mutations: {
    [authorMutation.SET_AUTHOR](s: AuthorState, author: UserInfo) {
      s.author = author;
    },
    [authorMutation.CLEAR_AUTHOR](s: AuthorState) {
      s.author = null;
    },
  },
  actions: {
    async [authorAction.GET_AUTHOR]({commit}: ActionContext<AuthorState, RootState>, loginname: string) {
      try {
        const author = await getUserInfo(loginname);
        commit(authorMutation.SET_AUTHOR, author);
      } catch (error) {
        const message = error.message || '用户详情获取失败！';
        commit(rootMutations.SHOW_SNACK_BAR, {message} as SnackBar, {root: true});
      }
    },
  },
};

export default ModuleFavorite;
