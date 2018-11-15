<template>
  <v-card :class="$style.topic">
    <header :class="$style.header">
      <router-link tag="div" :to="`/user/${data.author.loginname}`" :class="$style.author" >
        <v-avatar :size="40">
          <img :src="data.author.avatar_url" :alt="data.author.loginname">
        </v-avatar>
        <span style="text-indent: 1em;">{{data.author.loginname}}</span>
      </router-link>
      <div :class="$style.right">
        <span class="greeb--text">{{data.has_read ? '已读' : '未读'}}</span>
      </div>
    </header>
    <router-link tag="main" :to="`/topic/${data.topic.id}/reply#${data.reply.id}`" :class="$style.content" >
      <BaseMarkDown :content="data.reply.content"/>
    </router-link>
    <v-divider/>
    <footer :class="$style.footer">
      <v-btn flat round disabled>
        {{data.create_at | fromNow}}
      </v-btn >
      <v-chip>
        {{data.type | type}}
      </v-chip>
    </footer>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CNodeTopic, CNodeMessage } from '@/interface/cnode.interface';
import BaseMarkDown from './BaseMarkDown.vue';
@Component({
  components: {
    BaseMarkDown,
  },
  filters: {
    type(t: 'reply' | 'at') {
      return t === 'reply' ? '回复' : '@';
    },
  },
})
export default class BaseMessage extends Vue {
  @Prop({ required: true })
  private data!: CNodeMessage;
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
