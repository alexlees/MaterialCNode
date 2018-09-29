<template>
  <v-card v-if="userInfo">
    <v-card-title>
      <v-btn block flat depressed style="height: auto;">
        <v-avatar>
          <img :src="userInfo.avatar_url" :alt="userInfo.loginname">
        </v-avatar>
        <v-spacer/>
        <span>
          {{userInfo.loginname}}
        </span>
      </v-btn>
    </v-card-title>
    <v-card-media>
      <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" alt="">
    </v-card-media>
    <v-card-text>
      <span>积分：{{userInfo.score}}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn block flat depressed disabled>
        创建于: {{userInfo.create_at | fromNow}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserInfo, AuthorState } from '@/store/interface';
import { namespace } from 'vuex-class';
import { AuthorModule, authorAction, authorMutation } from '@/store/types';

const Module = namespace(AuthorModule);

@Component
export default class UserDetail extends Vue {
  @Module.State((state: AuthorState) => state.author)
  private userInfo!: UserInfo | null;
}
</script>
