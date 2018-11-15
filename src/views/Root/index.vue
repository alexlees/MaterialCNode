<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </v-container>
    </v-content>
    <v-bottom-nav :value="true" app color="white">
      <v-btn color="primary" flat to="/home">
        <span>首页</span>
        <v-icon>lens</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="/create">
        <span>新建</span>
        <v-icon>create</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="/message">
        <span>消息</span>
        <v-icon>email</v-icon>
      </v-btn>
      <v-btn color="primary" flat to="/me">
        <span>我的</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Root extends Vue {
}
</script>
