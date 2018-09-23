<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
}
</script>

<style>
</style>
