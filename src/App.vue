<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <CommSnakBar/>
    <CommDialog/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommSnakBar from './CommSnakBar.vue';
import CommDialog from './CommDialog.vue';
import { Log } from '@/utils/log';

@Component({
  components: {
    CommSnakBar,
    CommDialog,
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
