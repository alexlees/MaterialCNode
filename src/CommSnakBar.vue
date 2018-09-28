<template>
  <v-snackbar :value="snackBar.value" :color="snackBar.color" :timeout="snackBar.timeout" @input="input">
    {{snackBar.message}}
    <v-btn dark flat @click="hide">知道了</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { SnackBar, RootState } from '@/store/interface';
import { rootMutations } from '@/store/types';
@Component
export default class CommSnakBar extends Vue {
  @State((state: RootState) => state.snackBar)
  private snackBar!: SnackBar;
  @Mutation(rootMutations.HIDE_SNACK_BAR)
  private hide!: () => void;
  private input(v: boolean) {
    if (v === false) {
      this.hide();
    }
  }
}
</script>
