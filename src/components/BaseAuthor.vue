<template>
  <header :class="$style.header">
    <div :class="$style.author">
      <v-avatar :size="40">
        <img :src="avatar" :alt="name">
      </v-avatar>
      <span style="margin-left: 1em;">{{name}}</span>
    </div>
    <div :class="$style.right"  @click="$emit('click-right')">
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseAuthor extends Vue {
  @Prop({ required: true })
  private avatar!: string;
  @Prop({ required: true })
  private name!: string;
}
</script>
<style module>
.header{
  flex: 1;
  display: flex;
}
.author{
  flex: 1;
}
.right{
  min-width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
