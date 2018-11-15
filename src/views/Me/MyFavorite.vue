<template>
  <div>
    <BaseTopic v-for="topic in favorites" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeTopic } from '@/interface';
import { State } from 'vuex-class';
import { RootState } from '@/store/interface';
import BaseTopic from '@/components/BaseTopic.vue';

@Component({
  components: {
    BaseTopic,
  },
})
export default class MyFavorite extends Vue {
  @State((state: RootState) => state.myFavorites)
  private favorites!: CNodeTopic[];
}
</script>
