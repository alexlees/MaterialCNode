<template>
  <header :class="$style.header">
    <div :class="$style.author" v-ripple>
      <v-avatar :size="40">
        <img :src="author.avatar_url" :alt="author.loginname">
      </v-avatar>
      <span style="margin-left: 1em;">{{author.loginname}}</span>
    </div>
    <div :class="$style.right" v-ripple @click="$emit('click-right')">
      <slot name="right"/>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeAuthor } from '@/interface/cnode.interface';

@Component
export default class Author extends Vue {
  @Prop({required: true})
  private author!: CNodeAuthor;
}
</script>

<style module>
.header{
  flex: 1;
  display: flex;
}
.author{
  flex: 1;
  display: flex;
  align-items: center;
  align-content: center;
}
.right{
  min-width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
