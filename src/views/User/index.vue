<template>
  <v-app>
    <v-toolbar color="white" app tabs>
      <v-btn icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="black--text">{{userInfo ? userInfo.loginname : '加载中...'}}</v-toolbar-title>
      <v-tabs slot="extension" centered v-model="selectTab" grow>
        <v-tab v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <keep-alive>
          <component :is="component"/>
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserInfo, ActionGetAuthor, AuthorState } from '@/store/interface';
import { namespace } from 'vuex-class';
import { AuthorModule, authorAction, authorMutation } from '@/store/types';
import { Log } from '@/utils';
import { Route } from 'node_modules/vue-router/types';

const Module = namespace(AuthorModule);
const RecentTopic = () => import('./RecentTopic.vue');
const UserDetail = () => import('./UserDetail.vue');
const UserCollect = () => import('./UserCollect.vue');
const RecentReply = () => import('./RecentReply.vue');
const Components = [
  RecentTopic,
  UserDetail,
  UserCollect,
  RecentReply,
];
@Component
export default class User extends Vue {
  @Module.State((state: AuthorState) => state.author)
  private userInfo!: UserInfo | null;
  private tabs: string[] = ['主题', '详情', '收藏', '评论'];
  private selectTab: number = 1;
  @Module.Action(authorAction.GET_AUTHOR)
  private getAuthor!: ActionGetAuthor;
  @Module.Mutation(authorMutation.CLEAR_AUTHOR)
  private deleAuthor!: () => void;
  private get component() {
    return Components[this.selectTab];
  }
  @Watch('$route.params.name')
  private onRouteChange(value: string) {
    if (value) {
      this.getAuthor(value);
    }
  }
  private created() {
    this.getInfo();
  }
  private activated() {
    this.getInfo();
  }
  private getInfo() {
    this.getAuthor(this.$route.params.name);
  }
}
</script>
