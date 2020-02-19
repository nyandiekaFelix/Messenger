<template>
  <v-list two-line>
    <template v-for="(item, index) in chatList">
      <v-list-tile :key="index" avatar ripple @click="openChat(item)">
        <v-list-tile-avatar tile>
          <img :src="item.coverUrl">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action @click="deleteChat(item)">
          <v-icon small color="red lighten-1">delete</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="index + 1 < chatList.length" :key="`divider-${index}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
import SendBirdService from '../../services/SendBird.js';

export default {
  props: {},
  data() {
    return { chatList: [] };
  },
  mounted() {
    (async()=>{ await this.getList() })();
  },
  methods:{
    async getList() {
      try {
        await SendBirdService.loginUser('1');
        const list = await SendBirdService.getChatList();
        this.chatList = list;
        console.log(this.chatList);
      } catch(err) { console.log(err) }
    },
    async deleteChat(channel) {
      try {
        await SendBirdService.loginUser('1');
        await SendBirdService.deleteChat(channel);
      } catch(err) { console.log(err) }
    },
    openChat(channel) {
      this.$emit('selectChat', channel);
    }
  },
}
</script>

