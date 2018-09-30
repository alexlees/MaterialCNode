<template>
  <v-app>
    <v-toolbar color="white" app tabs scroll-off-screen extended class="tool-bar">
      <v-btn icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- TODO @click="changeCollect" -->
      <v-btn
        v-if="topicDetail"
        :color="topicDetail.is_collect ? 'pink' : 'black'"
        dark
        small
        absolute
        bottom
        right
        fab>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-toolbar-title class="black--text">{{topicDetail ? topicDetail.title : '加载中...'}}</v-toolbar-title>
      <v-tabs slot="extension" centered v-model="selectTab" grow>
        <v-tab v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <keep-alive>
          <component :is="component"/>
        </keep-alive>
        <!-- 添加评论 -->
        <v-btn
          :disabled="!topicDetail"
          color="green"
          dark
          fixed
          bottom
          right
          fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeTopicDetail } from '@/interface';
import { topicActions, topicMutations } from '@/store/types';
import { namespace } from 'vuex-class';
import { TopicState, TopicGetTopicDetail } from '@/store/interface';

const Detail = () => import('./Detail.vue');
const Topic = () => import('./Topic.vue');
const Reply = () => import('./Reply.vue');
const Module = namespace('topic');
const Components = [Detail, Topic, Reply];

@Component
export default class TopicDetail extends Vue {
  @Module.State((state: TopicState) => state.topicDetail)
  private topicDetail!: CNodeTopicDetail;
  @Module.Action(topicActions.GET_TOPIC_DETAIL)
  private getTopicDetail!: TopicGetTopicDetail;
  @Module.Mutation(topicMutations.DELET_TOPIC_DETAIL)
  private deleteTopicDetail!: () => void;

  private tabs: string[] = ['详情', '正文', '评论'];
  private selectTab: number = 1;
  private get component() {
    return Components[this.selectTab];
  }
  private created() {
    this.dispatchGetTopicDetail();
  }
  private activated() {
    this.dispatchGetTopicDetail();
  }
  private deactivated() {
    this.deleteTopicDetail();
  }
  private async dispatchGetTopicDetail() {
    const { id } = this.$route.params;
    const isOk = await this.getTopicDetail(id);
    // TODO 错误提示
  }
}
</script>
