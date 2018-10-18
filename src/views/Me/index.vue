<template>
  <div>
    <v-toolbar app color="primary" tabs>
      <v-toolbar-title class="white--text">{{user ? user.loginname : '未登录'}}</v-toolbar-title>
      <v-spacer/>
      <v-btn icon @click="logInOrOut">
        <v-icon color="white">{{user ? 'power_settings_new' : 'account_circle'}}</v-icon>
      </v-btn>
      <v-tabs slot="extension" centered grow color="primary">
        <v-tab to="/me/topic" replace class="white--text">主题</v-tab>
        <v-tab to="/me/detail" replace class="white--text">详情</v-tab>
        <v-tab to="/me/favorite" replace class="white--text">收藏</v-tab>
        <v-tab to="/me/reply" replace class="white--text">评论</v-tab>
      </v-tabs>
    </v-toolbar>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  UserInfo,
  RootState,
  RootActionLogOut,
  RootActionGetFavor,
  RootMutationShowDialog,
  Dialog,
} from '@/store/interface';
import { State, Action, Mutation } from 'vuex-class';
import { rootActions, rootMutations } from '@/store/types';

@Component
export default class Me extends Vue {
  @State((state: RootState) => state.user)
  private user!: UserInfo | null;
  @State((state: RootState) => state.addPrefix)
  private addPrefix!: boolean;
  @Mutation(rootMutations.TOGGLE_ADD_PREFIX)
  private toggle!: () => void;
  @Mutation(rootMutations.SHOW_DIALOG)
  private showDialog!: RootMutationShowDialog;
  @Action(rootActions.LOGOUT)
  private logOut!: RootActionLogOut;
  @Action(rootActions.GET_MYFAVORITES)
  private getMyFavorites!: RootActionGetFavor;
  private created() {
    this.getMyFavorites();
  }
  private activated() {
    this.getMyFavorites();
  }
  private logInOrOut() {
    if (this.user) {
      const dialog: Dialog = {
        title: '注意?',
        content: '确认退出登陆?',
        successCb: () => this.logOut(),
      };
      this.showDialog(dialog);
    } else {
      this.$router.push('/login');
    }
  }
}
</script>
