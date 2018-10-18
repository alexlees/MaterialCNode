<template>
  <v-dialog :value="dialog.value" max-width="290" persistent>
    <v-card>
      <v-card-title class="headline">{{dialog.title}}</v-card-title>
      <v-card-text>{{dialog.content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="fail">取消</v-btn>
        <v-btn color="green darken-1" flat @click.native="success">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Dialog, RootState } from '@/store/interface';
import { State, Mutation } from 'vuex-class';
import { rootMutations } from '@/store/types';

@Component
export default class CommDialog extends Vue {
  @State((state: RootState) => state.dialog)
  private dialog!: Dialog;
  @Mutation(rootMutations.HIDE_DIALOG)
  private hide!: () => void;
  private fail() {
    if (this.dialog.failCb) {
      this.dialog.failCb();
    }
    this.hide();
  }
  private success() {
    if (this.dialog.successCb) {
      this.dialog.successCb();
    }
    this.hide();
  }
}
</script>
