<template>
  <v-flex md12>
    <v-toolbar dark color="primary darken-1">
      <v-toolbar-title>Messenger</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="1" tile>
      <v-layout row>
        <v-flex md3>
          <ChatList @selectChat="selectChat"></ChatList>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex md9>
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
  props: {},
  components: {
    ChatList, ChatWindow
  },
  data () { return { selectedChat: null } },
  methods: {
    selectChat(channel) {
      this.selectedChat = channel;
    }
  },
  async mounted() {
    if(this.$route.params.recipient) {
      try{
        const chat = await SendBirdService.startChat(['1',`${this.$route.params.recipient}`]);
        this.selectedChat = chat;
      } catch(err) { console.log(err)}
    }
  }
};
</script>

<style scoped>
</style>
