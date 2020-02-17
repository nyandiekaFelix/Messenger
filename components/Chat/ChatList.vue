<template>
  <v-card md4>
    <ChatCard v-for="chat in chatList" :channel="chat" :key="chat.id"></ChatCard>
  </v-card>
</template>

<script>
import SendBirdService from '../../services/SendBird.js';
import ChatCard from './ChatCard';

export default {
  components: { ChatCard },
  data() {
    return {
      chatList: [
        { url: 'blaaaaa'},
        { url: 'neeee' },
        { url: 'doooo'}
      ]
    }
  },
  methods: {
    getList() {
      const list = SendBirdService.getChatList();
      return list;
    },
  }
}
</script>

