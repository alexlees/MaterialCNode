<template>
  <div>
    <BaseMessage v-for="message in messages" :key="message.id" :data="message"/>
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
export default class HasRead extends Vue {
  @Module.State((state: MessageState) => state.message.has_read_messages)
  private messages!: CNodeMessage[];
}
</script>
