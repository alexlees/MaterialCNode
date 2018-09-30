<template>
  <div :class="{[$style.topic]: true, [$style.select]: data.id === replyId}">
    <header :class="$style.header">
      <div :class="$style.author" v-ripple>
        <v-avatar :size="40">
          <img :src="data.author.avatar_url" :alt="data.author.loginname">
        </v-avatar>
        <span style="text-indent: 1em;">{{data.author.loginname}}</span>
      </div>
      <div :class="$style.right">
        <v-btn flat @click="$emit('click-up')">
          <v-icon :color="data.is_uped ? 'pink' : 'black'">thumb_up</v-icon>
          <span style="text-indent: 1em;">{{data.ups.length}}</span>
        </v-btn>
      </div>
    </header>
    <BaseMarkDown :content="data.content"/>
    <v-divider/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeReply } from '@/interface';
import BaseMarkDown from './BaseMarkDown.vue';
import { Log } from '@/utils';
import { namespace } from 'vuex-class';
import { topicActions, topicMutations, TopicModule } from '@/store/types';
import { TopicState } from '@/store/interface';

const Module = namespace(TopicModule);
@Component({
  components: {
    BaseMarkDown,
  },
})
export default class BaseReply extends Vue {
  @Prop({required: true})
  private data!: CNodeReply;
  @Module.State((state: TopicState) => state.replyId)
  private replyId!: string;
  private mounted() {
    if (this.data.id === this.replyId) {
      this.$el.scrollIntoView();
    }
  }
}
</script>

<style module>
.topic{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}
.content{
  flex: 1;
  padding: 15px;
}
.author{
  flex: 1;
  line-height: 40px;
}
.header{
  padding: 10px;
}
.header, .author, .content{
  min-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}
.right{
  min-width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.footer{
  min-height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: stretch;
  align-items: stretch;
}
.select{
  border: 1px solid pink;
}
</style>
