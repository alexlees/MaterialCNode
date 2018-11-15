<template>
  <v-app>
    <v-toolbar color="white" app tabs :scroll-off-screen="scroll">
      <v-btn icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn
        v-if="topicDetail"
        @click="collectOrDeCollect"
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
      <v-tabs slot="extension" centered grow>
        <v-tab :to="`/topic/${$route.params.id}/info`" exact replace>详情</v-tab>
        <v-tab :to="`/topic/${$route.params.id}/topic`" exact replace>正文</v-tab>
        <v-tab :to="`/topic/${$route.params.id}/reply`" exact replace>评论</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <keep-alive>
          <router-view/>
        </keep-alive>
        <v-btn
          :disabled="!topicDetail"
          @click="toNewReply"
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
import { topicActions, TopicModule } from '@/store/types';
import { namespace } from 'vuex-class';
import {
  CollectOrDeCollect,
  TopicState,
} from '@/store/interface';
import { Log } from '@/utils';
import '@/directives/directive-photoswipe';

const Module = namespace(TopicModule);

@Component
export default class TopicDetail extends Vue {
  @Module.State((state: TopicState) => state.topicDetail)
  private topicDetail!: CNodeTopicDetail;
  @Module.Action(topicActions.COLLECT_OR_DE_COLLECT)
  private collectOrDeCollect!: CollectOrDeCollect;

  private get scroll() {
    return document.body.scrollHeight >= 1000;
  }
  private toNewReply() {
    this.$router.push({path: `/topic/${this.$route.params.id}/newreply`});
  }
}
</script>
