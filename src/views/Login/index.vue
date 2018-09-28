<template>
  <v-app>
    <v-toolbar app color="primary">
      <v-btn icon @click="$router.back()" class="white--text">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">登陆CNode.js中文社区</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-text-field
          @update:error="checkField"
          label="AccessToken"
          v-model="AccessToken"
          :rules="rules"
          required
          :counter="36"
        ></v-text-field>
        <v-btn :disabled="error" @click="login">登陆</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Log } from '@/utils';
import { Action } from 'vuex-class';
import { RootActionLogin } from '@/store/interface';
import { rootActions } from '@/store/types';

@Component
export default class Login extends Vue {
  @Action(rootActions.LOGIN)
  private loginAction!: RootActionLogin;
  private AccessToken: string = '';
  private rules = [
    (v: string) => !!v || 'AccessToken 必填',
    (v: string) => v.length === 36 || 'AccessToken 为36位字符',
  ];
  private error = true;
  private checkField(error: boolean) {
    this.error = error;
  }
  private async login() {
    if (this.error) {
      // TODO 错误提示
      Log.err('错误输入！');
    } else {
      Log.log(this.AccessToken);
      const res = await this.loginAction(this.AccessToken);
      if (res) {
        this.$router.back();
      } else {
        Log.err('登陆错误');
      }
      this.AccessToken = '';
    }
  }
}
</script>
