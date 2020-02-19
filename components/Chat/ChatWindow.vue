<template>
  <v-layout>
    <v-flex md12>
      <v-card flat color="primary lighten-4">
        <v-card-text>
          <v-container>
            <v-list ref="chat" id="messages">
              <template v-for="(item, index) in messages">
                <v-subheader :class="item.type" :key="item.id">{{ item.text }}</v-subheader>
                <br/>
              </template>
            </v-list>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-form @submit.prevent="send">
            <v-text-field v-model="newMessage" label="Type Message..." single-line >
              <template slot="append">
                <v-btn flat icon color="info" type="submit">
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
  computed: {
    //async messages() {
      //try{
        //const history = await SendBirdService.getChatMessages(this.channel);
        
        //return history;
      //} catch(err) { console.log(err) }
    //}
  },
  methods: {
    async send() {
      if (this.newMessage) {
        try{
          await SendBirdService.sendMessage(this.channel, this.newMessage);
        } catch(err) { console.log(err) }
      } 
    },
   
  }
}
</script>

<style lang="css">
.sent {  }
.received {  }
.v-form { width: 100% }
</style>