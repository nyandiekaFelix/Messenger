<template>
  <v-container fluid style="padding: 0; background: grey">
    <v-layout row>
    <v-flex md4>
      <ChatList></ChatList>
    </v-flex>
    <v-flex md8>
      <ChatWindow :channel="selectedChat"></ChatWindow>
    </v-flex>
    </v-layout>
  </v-container>
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
  mounted() {
    // SendBirdService.loginUser('1')
      // .then(user => {console.log("Current user\n", user)});
  }
};
</script>

<style scoped>
</style>
