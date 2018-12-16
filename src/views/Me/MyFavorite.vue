<template>
  <div>
    <BaseTopic v-for="topic in favorites" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeTopic } from '@/interface';
import { State, Action } from 'vuex-class';
import { RootState, RootActionGetFavor } from '@/store/interface';
import { rootActions } from '@/store/types';
import BaseTopic from '@/components/BaseTopic.vue';

@Component({
  components: {
    BaseTopic,
  },
})
export default class MyFavorite extends Vue {
  @State((state: RootState) => state.myFavorites)
  private favorites!: CNodeTopic[];
  @Action(rootActions.GET_MYFAVORITES)
  private getMyFavorites!: RootActionGetFavor;
  private created() {
    this.getMyFavorites();
  }
  private activated() {
    this.getMyFavorites();
  }
}
</script>
