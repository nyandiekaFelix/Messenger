<template>
  <v-layout>
    <v-flex md12>
      <template flat color="primary lighten-4">
        <v-layout id="message-card">
          <v-flex xs12 v-scroll:#message-card="loadMoreMessages">
            <v-list>
              <template v-for="(item, index) in messages">
                <v-list-tile class="ma-0 pa-0">
                  <v-spacer v-if="isCurrentUser(item)"></v-spacer>
                  <v-avatar size="24" v-if="!isCurrentUser(item)"><img :src="recipient.avatar || ''"/></v-avatar> 
                  <v-chip :color="isCurrentUser(item) ? 'secondary' : null" :class="`pa-2 my-2 message ${getClass(item)}`" :key="item.message_id">{{ item.message }}</v-chip>
                </v-list-tile>
                <v-list-tile>
                  <v-spacer v-if="isCurrentUser(item)"></v-spacer>
                  <v-subheader class="caption" outline>{{ getDate(item.createdAt) }}</v-subheader>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-actions>
          <v-form @submit.prevent>
            <v-text-field v-model="newMessage" label="Type Message..." solo flat>
              <template slot="append">
                <v-btn flat icon type="submit" @click="send()">
                  <v-icon dark>send</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-card-actions>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import SendBirdService, {sb} from '../../services/SendBird.js'

export default {
  props: {
    channel: { type : Object, required: false }
  },
  data() {
    return { 
      newMessage: '',
      messages: [],
      recipient: {},
      messageQuery: null
    };
  },
  computed: {
  },
  methods: {
    async getMessages() {
      try{
        const history = await SendBirdService.getChatMessages(this.messageQuery);
        this.messages = [...history, ...this.messages];
      } catch(err) { console.log(err) }
    },
    async loadMoreMessages(event) {
      const offsetTop = event.target.scrollTop
      if(offsetTop === 0) {
        console.log('Top')
        this.getMessages()
      }
    },
    getRecipient(){
      const currentUser = sb.currentUser
      const { members } = this.channel
      const [recipient] = members.filter(user => user.userId !== currentUser.userId);
      this.recipient = { userId: recipient.userId, ...recipient.metaData };
    },
    isCurrentUser(message) {
      return message._sender.userId !== this.recipient.userId;
    },
    getClass(message) {
      return this.isCurrentUser(message) ? 'sent' : 'received'
    },
    async send() {
      if (this.newMessage) {
        try{
          const response = await SendBirdService.sendMessage(this.channel, this.newMessage);
          this.messages.push(response)
          this.newMessage = '';
        } catch(err) { console.log(err) }
      } 
    },
    getDate(timestamp) {
      return new Date(timestamp).toLocaleTimeString();
    }
   
  }, 
  async mounted() {
    this.getRecipient();
    this.messageQuery = await this.channel.createPreviousMessageListQuery()
    await this.getMessages();
    this.$emit('recipientMeta', this.recipient);
  }
}
</script>

<style lang="css">
#message-card { max-height: 60vh; overflow-y: scroll }
.timestamp > .v-subheader{ font-size: 12px !important}
.message { border-radius: 10px;}
.v-card__actions{ height: 49px }
.v-input__slot{ margin-top: 27px }
.sent { background-color: rgb(41, 182, 246) !important; color: white !important }
.received { }
.v-form { width: 100%}
</style>