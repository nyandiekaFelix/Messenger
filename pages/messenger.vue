<template>
  <v-flex md12>
    <v-card elevation="2" tile>
      <v-layout row>
        <v-flex xs4 elevation="1">
          <v-toolbar flat dense>
            <v-toolbar-title>Messenger</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <ChatList @selectChat="selectChat" ></ChatList>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex xs8>
          <v-toolbar flat dense>
            <v-toolbar-title v-if="recipient">
              <v-avatar size="36">
                <img src="recipient.avatar || ''">
              </v-avatar>
              {{ recipient.fullName }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
              <v-menu absolute v-if="recipient" offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>more_horiz</v-icon>
                  </v-btn>
                </template>
                <v-list id="dropdown" one-line>
                  <v-list-tile @click="">
                    <v-list-tile-title class="menu-item">
                    View Profile
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="">
                    <v-list-tile-title class="menu-item">
                    Block User
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="">
                    <v-list-tile-title class="menu-item">
                    Report User
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="">
                    <v-list-tile-title class="menu-item">
                    Clear Chat
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
          </v-toolbar>
          <v-divider></v-divider>
          <ChatWindow 
            v-if="selectedChat"
            @recipientMeta="setRecipient"
            :channel="selectedChat" 
            :key="selectedChat.url"></ChatWindow>
          <v-layout v-else>
            <v-flex md12>
              <v-container>No chat selected</v-container>
            </v-flex>
          </v-layout>
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
  data () { 
    return { 
      selectedChat: null, 
      recipient: null
      } 
    },
  methods: {
    selectChat(channel) {
      this.selectedChat = channel;
    },
    setRecipient(user) {
      this.recipient = user;
    }
  },
  async mounted() {
    if(this.$route.params.recipient) {
      try{
        const chat = await SendBirdService.startChat(['1',`${this.$route.params.recipient}`]); // The initiator's ID could come from localstorage
        this.selectedChat = chat;
      } catch(err) { console.log(err)}
    }
  }
};
</script>

<style scoped>
.v-toolbar__title{
  font-size: 1.0em;
  font-weight: 600
}
#dropdown {  }
.menu-item { height: 28px; font-size: 11px !important }
.menu > .v-list__tile { font-size: 11px !important }
.v-menu__content { top: 70px; left: 860px }
</style>

