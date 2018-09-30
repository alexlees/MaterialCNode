<template>
  <div>
    <v-toolbar app color="primary" tabs>
      <v-toolbar-title class="white--text">消息</v-toolbar-title>
      <v-spacer/>
      <v-btn dark icon @click="getMessages">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-tabs slot="extension" centered v-model="selectTab" grow color="primary">
        <v-tab v-for="(tab, index) in tabs" :key="index" class="white--text">{{tab}}</v-tab>
      </v-tabs>
    </v-toolbar>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MessageModule, messageActions } from '@/store/types';

const HasRead = () => import('./HasRead.vue');
const NotRead = () => import('./NotRead.vue');
const Components = [NotRead, HasRead];
const Module = namespace(MessageModule);
@Component
export default class Message extends Vue {
  private tabs: string[] = ['未读' , '已读'];
  private selectTab = 0;
  @Module.Action(messageActions.GET_USER_MESSAGES)
  private getMessages!: () => void;
  private get component() {
    return Components[this.selectTab];
  }
  private created() {
    this.getMessages();
  }
  private activated() {
    this.getMessages();
  }
  private deactivated() {
    this.getMessages();
  }
}
</script>
