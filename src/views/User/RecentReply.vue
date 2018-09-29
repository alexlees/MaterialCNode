<template>
  <div>
    <BaseTopic v-for="topic in topics" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeTopic } from '@/interface';
import BaseTopic from '@/components/BaseTopic.vue';
import { namespace } from 'vuex-class';
import { AuthorModule, authorAction, authorMutation } from '@/store/types';
import { AuthorState } from '@/store/interface';

const Module = namespace(AuthorModule);
@Component({
  components: {
    BaseTopic,
  },
})
export default class RecentReply extends Vue {
  @Module.State((state: AuthorState) => state.author ? state.author.recent_replies : [])
  private topics!: CNodeTopic[];
}
</script>
