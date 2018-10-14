<template>
  <article class="markdown-body" v-html="content"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseMarkDown extends Vue {
  @Prop({ required: true })
  private content!: string;
}
</script>
<style>
@import '~github-markdown-css';
.markdown-body{
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  word-wrap: break-word;
}
.markdown-body code {
  box-shadow: none;
}
</style>
