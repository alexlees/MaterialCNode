<template>
  <div>
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
      <v-card-text>
        <span>积分：{{userInfo.score}}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn icon :href="`https://github.com/${userInfo.githubUsername}`">
          <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </v-btn>
        <v-btn flat depressed disabled>
          创建于: {{userInfo.create_at | fromNow}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CNodeUserInfo } from '@/interface';
import { State } from 'vuex-class';
import { RootState } from '@/store/interface';
@Component
export default class MyDetail extends Vue {
  @State((state: RootState) => state.user)
  private userInfo!: CNodeUserInfo;
}
</script>
