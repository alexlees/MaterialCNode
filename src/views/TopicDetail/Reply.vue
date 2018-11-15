<template>
  <div>
    <BaseReply v-for="reply in replies" :key="reply.id" :data="reply" @click-up="replyUp(reply.id)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseReply from '@/components/BaseReply.vue';
import { namespace } from 'vuex-class';
import { TopicState } from '@/store/interface';
import { topicActions } from '@/store/types';
import { CNodeReply } from '@/interface';
const Module = namespace('topic');

@Component({
  components: {
    BaseReply,
  },
})
export default class Reply extends Vue {
  @Module.Action(topicActions.POST_REPLY_UPS)
  private replyUp!: () => void;
  @Module.State((state: TopicState) => state.topicDetail!.replies)
  private replies!: CNodeReply[];
}
</script>
