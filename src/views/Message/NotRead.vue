<template>
  <div>
    <BaseMessage v-for="message in messages" :key="message.id" :data="message"/>
    <h3 v-if="messages.length === 0" class="black--text">暂无消息，刷新试试！</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MessageModule, messageActions } from '@/store/types';
import { CNodeMessage } from '@/interface';
import { MessageState } from '@/store/interface';
import BaseMessage from '@/components/BaseMessage.vue';

const Module = namespace(MessageModule);
@Component({
  components: {
    BaseMessage,
  },
})
export default class NotRead extends Vue {
  @Module.State((state: MessageState) => state.message.hasnot_read_messages)
  private messages!: CNodeMessage[];
}
</script>
