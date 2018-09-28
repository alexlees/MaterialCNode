<template>
  <div>
    <v-toolbar app color="primary">
      <v-toolbar-title class="white--text">收藏</v-toolbar-title>
      <v-spacer/>
      <v-btn dark icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <BaseTopic v-for="topic in favorites" :key="topic.id" :data="topic"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeTopic } from '@/interface';
import { namespace } from 'vuex-class';
import { FavoriteModule, favoriteAction } from '@/store/types';
import { FavoriteState } from '@/store/interface';
import { Log } from '@/utils';
import BaseTopic from '@/components/BaseTopic.vue';
const Module = namespace(FavoriteModule);

@Component({
  components: {
    BaseTopic,
  },
})
export default class Favorite extends Vue {
  @Module.Action(favoriteAction.GET_FAVORITES)
  private getFavorites!: () => void;
  @Module.State((state: FavoriteState) => state.favorites)
  private favorites!: CNodeTopic[];
  private created() {
    Log.log('created');
    this.getFavorites();
  }
}
</script>
