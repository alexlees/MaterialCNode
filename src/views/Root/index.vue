<template>
  <v-app>
    <v-content>
      <v-container fluid v-touch="{
        up: () => swipe('Up'),
        down: () => swipe('Down')}">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </v-container>
    </v-content>
    <v-bottom-nav :value="showTabbar" app color="white">
      <v-btn color="primary" flat to="home">
        <span>首页</span>
        <v-icon>lens</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="favorite">
        <span>收藏</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="message">
        <span>消息</span>
        <v-icon>email</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="me">
        <span>我的</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { RootState, RootMutationShowTabbar, RootMutationHideTabbar } from '@/store/interface';
import { rootMutations } from '@/store/types';
import { Log } from '@/utils';

@Component
export default class Root extends Vue {
  @State((state: RootState) => state.showTabbar)
  private showTabbar!: boolean;
  @Mutation(rootMutations.SHOW_TABBAR)
  private show!: RootMutationShowTabbar;
  @Mutation(rootMutations.HIDE_TABBAR)
  private hide!: RootMutationHideTabbar;
  private scrollY: number | null = null;
  private timmerId: NodeJS.Timer | null = null;
  private swipe(down: 'Down' | 'Up') {
    if (down === 'Down') {
      this.show();
    } else {
      this.hide();
    }
  }
}
</script>
