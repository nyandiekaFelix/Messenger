<template>
  <v-card md8>
      <v-card md12 class="actions" height="40px" outlined>
        <v-btn color="red" small> Delete</v-btn>
      </v-card>
      <v-card md12 class="messages-container" height="60vh" outlined>
        yfkuftfg
      </v-card>
      <v-card md12 class="message-input" height="12vh">
        <v-text-field placeholder="Type Message..."></v-text-field>
      </v-card>
  </v-card>
</template>

<script>
import SendBirdService from '../../services/SendBird.js'

export default {
  props: {
    channel: { type : Object, required: false }
  },
  data() {
    return {}
  },
  computed: {
    messages() {
      const history = SendBirdService.getChatMessages();
      
      return history;
    }
  },
  methods: {
    send() {
      SendBirdService.sendMessage(this.channel, message);
    }
  }
}
</script>

<style lang="css">
.message-input>input{
  height: 100%;
  width: 100%;
}
</style>