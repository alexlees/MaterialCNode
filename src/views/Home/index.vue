<template>
  <div>
    <v-toolbar dark color="primary" tabs app scroll-off-screen class="tool-bar">
      <v-toolbar-title class="white--text">CNode.js中文社区</v-toolbar-title>
      <v-tabs slot="extension" centered color="primary" :value="tab" grow @input="setTab">
        <v-tab v-for="tab in tabs" :key="tab.code">
          {{tab.name}}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, namespace } from 'vuex-class';
import { TOPIC_TABS, TopicTabs } from '@/enum';
import { Log } from '@/utils';
import { HomeState, HomeMutationSetTab } from '@/store/interface';
import { HomeMutations, HomeModule } from '@/store/types';
const Mudule = namespace(HomeModule);

const AllTopic = () => import('./AllTopic.vue');
const AskTopic = () => import('./AskTopic.vue');
const DevTopic = () => import('./DevTopic.vue');
const GoodTopic = () => import('./GoodTopic.vue');
const JobTopic = () => import('./JobTopic.vue');
const ShareTopic = () => import('./ShareTopic.vue');
const Components = {
  [TopicTabs.ask]: AskTopic,
  [TopicTabs.share]: ShareTopic,
  [TopicTabs.all]: AllTopic,
  [TopicTabs.good]: GoodTopic,
  [TopicTabs.job]: JobTopic,
  [TopicTabs.dev]: DevTopic,
};

@Component
export default class Home extends Vue {
  private tabs = TOPIC_TABS;
  @Mudule.State((state: HomeState) => state.selectTab)
  private tab!: TopicTabs;
  @Mudule.Mutation(HomeMutations.SET_TAB)
  private setTab!: HomeMutationSetTab;
  private get component() {
    return Components[this.tab];
  }
}
</script>
<style>
</style>
