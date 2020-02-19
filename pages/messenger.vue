<template>
  <v-flex md12>
    <v-toolbar dark color="primary darken-1">
      <v-toolbar-title>Messenger</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="1" tile>
      <v-layout row>
        <v-flex md4>
          <ChatList @selectChat="selectChat"></ChatList>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex md8>
          <ChatWindow v-if="selectedChat" :channel="selectedChat"></ChatWindow>
          <v-container v-else>No chat selected</v-container>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import SendBirdService from "../services/SendBird.js";
import ChatWindow from '../components/Chat/ChatWindow';
import ChatList from '../components/Chat/ChatList';


export default {
  components: {
    ChatList, ChatWindow
  },
  data () { return { selectedChat: null } },
  methods: {
    selectChat(channel) {
      console.log('cha cha', channel);
      this.selectedChat = channel;
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
