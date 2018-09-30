<template>
  <TopicList :tab="tab"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TopicTabs } from '@/enum';
import TopicList from './TopicList.vue';
@Component({
  components: {
    TopicList,
  },
})
export default class AskTopic extends Vue {
  private tab = TopicTabs.ask;
}
</script>
