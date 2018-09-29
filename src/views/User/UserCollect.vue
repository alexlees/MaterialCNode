<template>
  <div>
    <BaseTopic v-for="topic in topics" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BaseTopic from '@/components/BaseTopic.vue';
import { getUserFavorite } from '@/api';
import { CNodeTopic } from '@/interface';

@Component({
  components: {
    BaseTopic,
  },
})
export default class UserCollect extends Vue {
  private topics: CNodeTopic[] = [];
  private created() {
    this.getCollects();
  }
  @Watch('$route.params.name')
  private onNameChange(name: string) {
    if (name) {
      this.getCollects();
    }
  }
  private async getCollects() {
    const {name} = this.$route.params;
    const topics = await getUserFavorite(name);
    this.topics = [...topics];
  }
}
</script>
