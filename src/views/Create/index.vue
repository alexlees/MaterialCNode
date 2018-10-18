<template>
  <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <v-card :class="$style.page">
      <v-toolbar dark color="primary" >
        <v-btn icon @click="$router.back()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>新建主题</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form v-model="valid">
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="标题"
                  :rules="titleRules"
                  required
                  v-model="title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="select"
                  :items="items"
                  label="分类"></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-textarea
                  auto-grow
                  clearable
                  counter
                  v-model="content"
                  required
                  :rules="contentRules"
                  label="正文"
                ></v-textarea>
              </v-flex>
            </v-form>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="$router.back()">取消</v-btn>
        <v-btn color="blue darken-1" flat @click.native="newTopic" :disabled="!valid">发布</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RootActionCreateTopic, RootMutationShowDialog, Dialog } from '@/store/interface';
import { Action, Mutation } from 'vuex-class';
import { rootActions, rootMutations } from '@/store/types';
import { PostNewTopicData } from '@/interface';
import { Log } from '@/utils';

const items = ['分享', '问答', '招聘', '客户端测试'];
const itemsValue = {
  [items[0]]: 'share',
  [items[1]]: 'ask',
  [items[2]]: 'job',
  [items[3]]: 'dev',
};
@Component
export default class Create extends Vue {
  private select = items[3];
  private items = [...items];
  private title = '';
  private content = '';
  private titleRules = [
    (v: string) => !!v || '标题 必填',
    (v: string) => v.length >= 10 || '标题字数10个以上',
  ];
  private contentRules = [
    (v: string) => !!v || '正文 必填',
    (v: string) => v.length >= 10 || '正文字数10个以上',
  ];
  private valid: boolean = false;
  @Action(rootActions.CREATE_TOPIC)
  private createTopic!: RootActionCreateTopic;
  @Mutation(rootMutations.SHOW_DIALOG)
  private showDialog!: RootMutationShowDialog;
  private async newTopic() {
    const topic: PostNewTopicData = Object.create(null);
    topic.title = this.title;
    topic.content = this.content;
    topic.tab = itemsValue[this.select];
    const isOk = await this.createTopic(topic);
    if (isOk) {
      const dialog: Dialog = {
        title: '发布成功!',
        content: '前去查看该主题？',
        successCb: () => {
          this.$router.replace(`/topic/${isOk.topic_id}`);
        },
        failCb: () => {
          this.$router.back();
        },
      };
      this.showDialog(dialog);
      this.select = items[3];
      this.title = '';
      this.content = '';
    }
  }
}
</script>
<style scoped>
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
  animation: slideInUp 400ms ease both;
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
  animation: slideOutDown 400ms ease both;
}
</style>
<style module>
.page{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
}
</style>
