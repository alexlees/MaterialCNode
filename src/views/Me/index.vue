<template>
  <div>
    <v-toolbar app color="primary">
      <v-toolbar-title class="white--text">个人中心</v-toolbar-title>
    </v-toolbar>
    <v-btn block dark v-if="user" @click="logOut">
      <span>注销</span>
      <v-icon right dark>person</v-icon>
    </v-btn>
    <v-btn block color="primary" dark v-else to="/login">
      <span>登陆</span>
      <v-icon right dark>person</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInfo, RootState, RootActionLogOut } from '@/store/interface';
import { State, Action } from 'vuex-class';
import { rootActions } from '@/store/types';

@Component
export default class Me extends Vue {
  @State((state: RootState) => state.user)
  private user!: UserInfo;
  @Action(rootActions.LOGOUT)
  private logOut!: RootActionLogOut;
}
</script>
