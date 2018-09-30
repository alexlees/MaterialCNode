<template>
  <v-app>
    <v-toolbar dark color="black" app>
      <v-btn icon @click="$router.back()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">你来到了无人之地</v-toolbar-title>
      <v-spacer/>
      <v-btn icon href="https://github.com/alexlees/MaterialCNode">
        <v-icon>code</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <h3>当前访问页面不存在</h3>

      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>
