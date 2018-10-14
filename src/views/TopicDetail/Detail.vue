<template>
  <v-card v-if="topicDetail">
    <v-card-title>
      <v-btn block flat depressed style="height: auto;" :to="`/user/${topicDetail.author.loginname}`">
        <v-avatar>
          <img :src="topicDetail.author.avatar_url" :alt="topicDetail.author.loginname">
        </v-avatar>
        <v-spacer/>
        <span>
          {{topicDetail.author.loginname}}
        </span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      {{topicDetail.title}}
    </v-card-text>
    <v-card-actions>
      <v-chip color="pink" text-color="white" v-if="topicDetail.top">置顶</v-chip>
      <v-chip color="primary" text-color="white" v-if="topicDetail.good">精华</v-chip>
      <v-chip text-color="white">{{topicDetail.tab}}</v-chip>
    </v-card-actions>
    <v-card-text>
      <span>发布于{{topicDetail.create_at | fromNow}}</span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { TopicModule } from '@/store/types';
import { TopicState } from '@/store/interface';
import { CNodeTopicDetail } from '@/interface';

const Module = namespace(TopicModule);
@Component
export default class Detail extends Vue {
  @Module.State((state: TopicState) => state.topicDetail)
  private topicDetail!: CNodeTopicDetail;
}
</script>
