<template>
  <div>
    <BaseTopic v-for="topic in myTopics" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTopic from '@/components/BaseTopic.vue';
import { CNodeTopic } from '@/interface';
import { State } from 'vuex-class';
import { RootState } from '@/store/interface';
@Component({
  components: {
    BaseTopic,
  },
})
export default class MyTopic extends Vue {
  @State((state: RootState) => state.user ? state.user.recent_topics : [])
  private myTopics!: CNodeTopic[];
}
</script>
