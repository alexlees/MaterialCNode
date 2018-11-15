import { Module, ActionContext } from 'vuex';
import { MessageState } from '@/store/messages/interface';
import { RootState, SnackBar } from '@/store/interface';
import { messageMutations, messageActions } from '@/store/messages/types';
import { CNodeMessages } from '@/interface';
import { rootMutations } from '@/store/types';
import { Log } from '@/utils';
import { getUserMessages } from '@/api';

const MessageModule: Module<MessageState, RootState> = {
  namespaced: true,
  state: {
    message: {
      has_read_messages: [],
      hasnot_read_messages: [],
    },
  },
  mutations: {
    [messageMutations.SET_MESSAGES](s: MessageState, messages: CNodeMessages) {
      s.message = messages;
    },
  },
  actions: {
    async [messageActions.GET_USER_MESSAGES]({ commit, rootState }: ActionContext<MessageState, RootState>) {
      if (rootState.accesstoken) {
        const data = await getUserMessages({accesstoken: rootState.accesstoken});
        commit(messageMutations.SET_MESSAGES, data);
      } else {
        Log.err('未登录');
        commit(rootMutations.SHOW_SNACK_BAR, {message: '未登录!'} as SnackBar, { root: true });
      }
    },
    async [messageActions.MARK_MESSAGE]({rootState}, messageId: string) {
      if (rootState.accesstoken) {
        postMessage(messageId, rootState.accesstoken);
      }
    },
  },
};
export default MessageModule;
