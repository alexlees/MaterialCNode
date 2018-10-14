<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <CommSnakBar/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommSnakBar from './CommSnakBar.vue';
import { Log } from '@/utils/log';

@Component({
  components: {
    CommSnakBar,
  },
})
export default class App extends Vue {
  private created() {
    window.addEventListener('offline', () => this.netWork('offline'));
    window.addEventListener('online', () => this.netWork('online'));
  }
  private netWork(tag: 'offline' | 'online') {
    Log.log(tag);
    if (tag === 'offline') {
      this.$router.push('/network');
    } else {
      // TODO
    }
  }
}
</script>
<style>
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
