<template>
  <div>
    <BaseTopic v-for="topic in topicList" :key="topic.id" :data="topic"/>
    <div v-show="topicList.length" :class="$style.between">
      <v-btn fab dark color="primary" @click="prev">
        <v-icon dark medium>navigate_before</v-icon>
      </v-btn>
      <v-btn fab dark color="primary" @click="next">
        <v-icon dark medium>navigate_next</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TopicTabs } from '@/enum';
import { HomeGetterCurrentPage, HomeActionPrevPage, HomeActionNextPage } from '@/store/interface';
import { namespace } from 'vuex-class';
import { HomeModule, HomeGetters, HomeMutations, HomeActions } from '@/store/types';
import { Log } from '@/utils';
import { CNodeTopic } from '@/interface/cnode.interface';
import { getTopics } from '@/api';
import BaseTopic from '@/components/BaseTopic.vue';

const Mudule = namespace(HomeModule);
@Component({
  components: {
    BaseTopic,
  },
})
export default class TopicList extends Vue {
  @Prop({ required: true, type: Number })
  private tab!: TopicTabs;
  private topicList: CNodeTopic[] = [];
  @Mudule.Getter(HomeGetters.CURRENTPAGE)
  private getPage!: HomeGetterCurrentPage;
  @Mudule.Action(HomeActions.NEXT_PAGE)
  private nextPage!: HomeActionNextPage;
  @Mudule.Action(HomeActions.PREV_PAGE)
  private prevPage!: HomeActionPrevPage;
  private created() {
    this.getTopicList();
  }
  private async getTopicList() {
    try {
      const data = await getTopics({page: this.getPage(this.tab), tab: this.tab});
      this.topicList = [...data];
      window.scroll(0, 0);
    } catch (error) {
      // TODO 错误提示
      Log.err(error);
    }
  }
  private async next() {
    const next = await this.nextPage(this.tab);
    if (next) {
      this.getTopicList();
    }
  }
  private async prev() {
    const next = await this.prevPage(this.tab);
    if (next) {
      this.getTopicList();
    }
  }
}
</script>

<style module>
.between{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}
</style>
