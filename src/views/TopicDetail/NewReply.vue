<template>
    <v-layout row justify-center>
    <v-dialog :value="value" full-width persistent max-width="500px" fullscreen lazy transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary" >
          <v-btn icon @click="$emit('input', false)">
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
          <v-btn color="blue darken-1" flat @click.native="$emit('input', false)">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="sendReply">发送</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
  @Prop({required: true})
  private value!: boolean;
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
    this.$emit('input', false);
    this.content = '';
  }
}
</script>
