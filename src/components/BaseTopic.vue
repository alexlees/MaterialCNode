<template>
  <v-card :class="$style.topic">
    <header :class="$style.header">
      <div :class="$style.author" v-ripple>
        <v-avatar :size="40">
          <img :src="data.author.avatar_url" :alt="data.author.loginname">
        </v-avatar>
        <span style="text-indent: 1em;">{{data.author.loginname}}</span>
      </div>
      <div :class="$style.right">
      </div>
    </header>
    <router-link tag="main" :to="`/topic/${data.id}`" :class="$style.content" v-ripple>
      <p>{{data.title}}</p>
    </router-link>
    <v-divider/>
    <footer :class="$style.footer">
      <v-btn flat round disabled>{{data.visit_count}}浏览</v-btn >
      <v-btn flat round disabled>{{data.reply_count}}评论</v-btn >
      <v-btn flat round disabled>
        {{data.last_reply_at | fromNow}}
      </v-btn >
    </footer>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeTopic } from '@/interface/cnode.interface';

@Component
export default class BaseTopic extends Vue {
  @Prop({ required: true })
  private data!: CNodeTopic;
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
.header{
  padding: 10px;
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
  flex-direction: column;
  justify-content: center;
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
</style>
