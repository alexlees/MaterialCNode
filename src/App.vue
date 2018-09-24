<template>
  <router-view/>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
}
</script>

<style>
html{
  max-width: 500px;
  margin: 0 auto;
}
@media (min-width: 500px) {
  .tool-bar{
    max-width: 500px;
    left: calc(50% - 250px);
  }
}
</style>
