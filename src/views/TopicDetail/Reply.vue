<template>
  <div>
    <BaseReply v-for="reply in replies" :key="reply.id" :data="reply"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeReply } from '@/interface';
import BaseReply from '@/components/BaseReply.vue';
import { namespace } from 'vuex-class';
import { TopicState } from '@/store/interface';
const Module = namespace('topic');

@Component({
  components: {
    BaseReply,
  },
})
export default class Reply extends Vue {
  @Module.State((state: TopicState) => state.topicDetail ? state.topicDetail.replies : [])
  private replies!: CNodeReply[];
}
</script>
