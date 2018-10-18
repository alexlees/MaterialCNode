<template>
  <div>
    <BaseTopic v-for="reply in myReplies" :key="reply.id" :data="reply"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTopic from '@/components/BaseTopic.vue';
import { CNodeReply } from '@/interface';
import { State } from 'vuex-class';
import { RootState } from '@/store/interface';

@Component({
  components: {
    BaseTopic,
  },
})
export default class MyReply extends Vue {
  @State((state: RootState) => state.user ? state.user.recent_replies : [])
  private myReplies!: CNodeReply[];
}
</script>
