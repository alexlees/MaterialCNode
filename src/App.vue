<template>
  <div>
    <router-view/>
    <CommSnakBar/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommSnakBar from './CommSnakBar.vue';

@Component({
  components: {
    CommSnakBar,
  },
})
export default class App extends Vue {
}
</script>
