import { Module, ActionContext } from 'vuex';
import { RootState, SnackBar, FavoriteState } from '@/store/interface';
import { getUserFavorite } from '@/api';
import { rootMutations, favoriteAction, favoriteMutation } from '@/store/types';
import { CNodeTopic } from '@/interface';
import { Log } from '@/utils';

const ModuleFavorite: Module<FavoriteState, RootState> = {
  namespaced: true,
  state: {
    favorites: [],
  },
  mutations: {
    [favoriteMutation.SET_FAVORITES](state: FavoriteState, favorites: CNodeTopic[]) {
      state.favorites = [...favorites];
    },
  },
  actions: {
    async [favoriteAction.GET_FAVORITES]({rootState, commit, dispatch}: ActionContext<FavoriteState, RootState>) {
      if (rootState.user && rootState.user.loginname) {
        try {
          const data = await getUserFavorite(rootState.user.loginname);
          Log.log(data);
          commit(favoriteMutation.SET_FAVORITES, data);
        } catch (error) {
          Log.err(error);
          commit(rootMutations.SHOW_SNACK_BAR, {message: error.message || 'err'} as SnackBar, {root: true});
        }
      } else if (rootState.user === null && rootState.accesstoken) {
        commit(
          rootMutations.SHOW_SNACK_BAR,
          {message: '正在获取用户信息...请等待.',
          color: 'info', timeout: 1000} as SnackBar,
          {root: true},
        );
        setTimeout(() => {
          dispatch(favoriteAction.GET_FAVORITES);
        }, 100);
      } else {
        commit(rootMutations.SHOW_SNACK_BAR, {message: '未登录'} as SnackBar, {root: true});
      }
    },
  },
};

export default ModuleFavorite;
