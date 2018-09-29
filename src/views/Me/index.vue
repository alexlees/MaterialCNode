<template>
  <div>
    <v-toolbar app color="primary">
      <v-toolbar-title class="white--text">个人中心</v-toolbar-title>
      <v-spacer/>
      <v-btn icon v-if="user" :to="`/user/${user.loginname}`">
        <v-icon color="white">more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-btn block dark v-if="user" @click="logOut">
      <span>注销</span>
      <v-icon right dark>person</v-icon>
    </v-btn>
    <v-btn block color="primary" dark v-else to="/login">
      <span>登陆</span>
      <v-icon right dark>person</v-icon>
    </v-btn>
    <v-switch :value="addPrefix" @change="toggle" label="评论加尾"></v-switch>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInfo, RootState, RootActionLogOut } from '@/store/interface';
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
  @Action(rootActions.LOGOUT)
  private logOut!: RootActionLogOut;
}
</script>
