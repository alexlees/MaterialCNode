<template>
  <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <v-card :class="$style.page">
      <v-toolbar dark color="primary" >
        <v-btn icon @click="$router.back()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>添加评论</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="评论"
                hint="添加评论吧"
                persistent-hint
                required
                v-model="content"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="users"
                label="@"
                hint="@当前主题涉及用户"
                multiple
                chips
                v-model="at"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="$router.back()">取消</v-btn>
        <v-btn color="blue darken-1" flat @click.native="sendReply">发送</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { TopicModule, topicActions } from '@/store/types';
import { TopicState, TopicNewReply } from '@/store/interface';
import { CNodeReply } from '@/interface';
const Module = namespace(TopicModule);

@Component
export default class NewReply extends Vue {
  @Module.State((state: TopicState) => state.topicDetail ? state.topicDetail.replies : [])
  private replies!: CNodeReply[];
  @Module.State((state: TopicState) => state.topicDetail ? state.topicDetail.author.loginname : '')
  private topicAuthorName!: string;
  @Module.Action(topicActions.POST_NEW_REPLY)
  private newReply!: TopicNewReply;
  private content: string = '';
  private at = [];
  private get users() {
    const replyAuthors = this.replies.map((v) => v.author.loginname);
    return [this.topicAuthorName, ...replyAuthors];
  }
  private async sendReply() {
    const at = this.at.map((s) => `@${s}`)
    .join(' ');

    await this.newReply(`${at} ${this.content}`);
    this.$router.back();
    this.content = '';
    this.at = [];
  }
}
</script>
<style>
@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInUp {
  animation: slideInUp 1s ease both;
}
@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}

.slideOutDown {
  animation: slideOutDown 1s ease both;
}
</style>
<style module>
.page{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
</style>
