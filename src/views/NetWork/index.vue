<template>
  <v-app>
    <v-toolbar dark color="error" app>
      <v-btn icon @click="$router.back()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">网络似乎有问题？</v-toolbar-title>
      <v-spacer/>
      <v-btn icon href="https://github.com/alexlees/MaterialCNode">
        <v-icon>code</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <h3>网络似乎有问题？</h3>
        <p>刚刚的网络请求失败了，点击左上角重试。</p>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NetWork extends Vue {}
</script>
