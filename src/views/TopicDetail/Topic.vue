<template>
  <BaseMarkDown :content="content" v-photoswipe/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import BaseMarkDown from '@/components/BaseMarkDown.vue';
import { TopicState } from '@/store/interface';

const Module = namespace('topic');
@Component({
  components: {
    BaseMarkDown,
  },
})
export default class Topic extends Vue {
  @Module.State((state: TopicState) => state.topicDetail ? state.topicDetail.content : '加载中...')
  private content!: string;
}
</script>
