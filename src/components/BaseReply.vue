<template>
  <div :class="{[$style.topic]: true}" :id="data.id">
    <header :class="$style.header">
      <router-link :class="$style.author"  tag="div" :to="`/user/${data.author.loginname}`">
        <v-avatar :size="40">
          <img :src="data.author.avatar_url" :alt="data.author.loginname">
        </v-avatar>
        <span style="text-indent: 1em;">{{data.author.loginname}}</span>
      </router-link>
      <div :class="$style.right">
        <v-btn flat :to="`/topic/${$route.params.id}/newreply?at=${data.author.loginname}`">
          <v-icon>reply</v-icon>
        </v-btn>
        <v-btn flat @click="$emit('click-up')">
          <v-icon :color="data.is_uped ? 'pink' : 'black'">thumb_up</v-icon>
          <span style="text-indent: 1em;">{{data.ups.length}}</span>
        </v-btn>
      </div>
    </header>
    <BaseMarkDown :content="data.content" style="padding: 15px;"/>
    <v-divider/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeReply } from '@/interface';
import BaseMarkDown from './BaseMarkDown.vue';
import { Log } from '@/utils';

@Component({
  components: {
    BaseMarkDown,
  },
})
export default class BaseReply extends Vue {
  @Prop({required: true})
  private data!: CNodeReply;
}
</script>

<style module>
.topic{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}
.content{
  flex: 1;
  padding: 15px;
}
.author{
  flex: 1;
  line-height: 40px;
}
.header, .author, .content{
  min-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}
.right{
  min-width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.footer{
  min-height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: stretch;
  align-items: stretch;
}
.select{
  border: 1px solid pink;
}
</style>
