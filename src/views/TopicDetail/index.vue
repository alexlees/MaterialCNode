<template>
  <v-app>
    <v-toolbar color="white" app tabs>
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
      <v-tabs slot="extension" centered v-model="selectTab" grow>
        <v-tab v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <keep-alive>
          <component :is="component"/>
        </keep-alive>
        <NewReply v-model="dialog"/>
        <v-btn
          :disabled="!topicDetail"
          @click="dialog = true"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { CNodeTopicDetail } from '@/interface';
import { topicActions, topicMutations, TopicModule } from '@/store/types';
import { namespace } from 'vuex-class';
import {
  TopicState,
  TopicGetTopicDetail,
  TopicCollectOrDeCollect,
  TopicSetReplyId,
  TopicDeleteReplyId,
} from '@/store/interface';
import { Log } from '@/utils';
import '@/directives/directive-photoswipe';

const Detail = () => import('./Detail.vue');
const Topic = () => import('./Topic.vue');
const Reply = () => import('./Reply.vue');
const NewReply = () => import('./NewReply.vue');
const Module = namespace(TopicModule);
const Components = [Detail, Topic, Reply];

@Component({
  components: {
    NewReply,
  },
})
export default class TopicDetail extends Vue {
  @Module.State((state: TopicState) => state.topicDetail)
  private topicDetail!: CNodeTopicDetail;
  @Module.Action(topicActions.GET_TOPIC_DETAIL)
  private getTopicDetail!: TopicGetTopicDetail;
  @Module.Mutation(topicMutations.DELET_TOPIC_DETAIL)
  private deleteTopicDetail!: () => void;
  @Module.Action(topicActions.COLLECT_OR_DE_COLLECT)
  private collectOrDeCollect!: TopicCollectOrDeCollect;
  @Module.Mutation(topicMutations.SET_REPLY_ID)
  private setReplyId!: TopicSetReplyId;
  @Module.Mutation(topicMutations.DELET_REPLY_ID)
  private deleteReplyId!: TopicDeleteReplyId;

  private tabs: string[] = ['详情', '正文', '评论'];
  private selectTab: number = 1;
  private dialog: boolean = false;

  private get component() {
    return Components[this.selectTab];
  }
  private created() {
    this.dispatchGetTopicDetail();
    this.shouldScroll();
  }
  private activated() {
    this.dispatchGetTopicDetail();
    this.shouldScroll();
  }
  private deactivated() {
    this.deleteTopicDetail();
    this.selectTab = 1;
    this.deleteReplyId();
  }
  private shouldScroll() {
    if (this.$route.query.reply === null) {
      this.selectTab = 2;
    }
    if (this.$route.hash) {
      // setTimeout(() => {
      //   const el = document.getElementById(this.$route.hash.slice(1))!;
      //   Log.log(el);
      //   el.scrollIntoView();
      // }, 30);
      this.setReplyId(this.$route.hash.slice(1));
    }
  }
  private async dispatchGetTopicDetail() {
    const { id } = this.$route.params;
    const isOk = await this.getTopicDetail(id);
    // TODO 错误提示
  }
}
</script>
