<template>
  <v-layout>
    <v-flex md12>
      <v-card flat color="primary lighten-4">
        <v-card-text>
          <v-container class="justify-right">
            <v-list id="messages" :style="{'align-items': 'right'}">
              <template v-for="(item, index) in messages">
                <v-card class="pa-2" :key="item.message_id">{{ item.message }}</v-card>
                <br/>
              </template>
            </v-list>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-form @submit.prevent>
            <v-text-field v-model="newMessage" label="Type Message..." single-line >
              <template slot="append">
                <v-btn flat icon type="submit" @click="send()">
                  <v-icon dark>send</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SendBirdService from '../../services/SendBird.js'

export default {
  props: {
    channel: { type : Object, required: false }
  },
  data() {
    return { 
      newMessage: '',
      messages: [] 
    };
  },
  methods: {
    async getMessages() {
      try{
        const history = await SendBirdService.getChatMessages(this.channel);
        
        this.messages = history;
      } catch(err) { console.log(err) }
    },
    async send() {
      if (this.newMessage) {
        try{
          await SendBirdService.sendMessage(this.channel, this.newMessage);
          this.newMessage = '';
        } catch(err) { console.log(err) }
      } 
    },
   
  }, 
  async mounted() {
    await this.getMessages();
  }
}
</script>

<style lang="css">
.sent { float: right; color: red !important }
.received { float: left }
.v-form { width: 100% }
</style>