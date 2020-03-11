<template>

  <v-list one-line>
    <template v-for="(item, index) in chatList">
      <v-list-tile :key="index" :id="item.url" class="chat-list-item" avatar ripple @click="openChat($event, item)">
        <v-list-tile-avatar>
          <img :src="getRecipient(item).avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="name">{{ getRecipient(item).name }}</span>
            <span class="time">{{ getLastMessage(item).time }}</span>
          </v-list-tile-title>
          <v-list-tile-sub-title>{{  getLastMessage(item).message }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    </template>
  </v-list>
</template>

<script>
import SendBirdService, {sb} from '../../services/SendBird.js';
import users from './userMocks.js'

export default {
  props: {},
  data() {
    return { chatList: [], selectedId: null };
  },
  async mounted() {
    await this.getList();
  },
  methods:{
    async getList() {
      try {
        SendBirdService.loginUser('id3').then(res => {
        
         console.log(JSON.stringify(res))
         
         //SendBirdService.addUserMetadata({fullName: 'John Doe1'}).then(chat => {console.log('1',chat)})
        });
       // SendBirdService.startChat(['id2','id3']).then(chat => {console.log('2',JSON.stringify(chat))})
        const list = await SendBirdService.getChatList();
        this.chatList = list;
      } catch(err) { console.log(err) }
    },
    getRecipient(chat) {
      const currentUser = sb.currentUser
      const {members} = chat
      const [recipient] = members.filter(user => user.userId !== currentUser.userId)
      return {
        name: recipient.metaData.fullName,
        avatar: recipient.metaData.avatar || null // could have a default picture for every profile
      }
    },
    getLastMessage(chat) {
      if (chat.lastMessage) {
        const { lastMessage: { createdAt, message} } = chat;
        const timestamp = new Date(createdAt).toLocaleDateString('en-US')
        return { time: timestamp, message }
      }
      return { time: 'timestamp', message: 'none' }
    },
    async deleteChat(channel) {
      try {
        await SendBirdService.deleteChat(channel);
      } catch(err) { console.log(err) }
    },
    openChat(event, channel) {
      const prevClicked = document.getElementById(this.selectedId);
      if(prevClicked) prevClicked.style.background = 'white';
      
      const currentClicked = document.getElementById(channel.url);
      this.selectedId = channel.url
      currentClicked.style.background = '#E0E0E0'
      this.$emit('selectChat', channel);
    }
  },
}
</script>

<style lang="css">
.time{
  float: right;
  font-size: 11px;
  color: rgba(0,0,0,0.75);
}
.name{
  font-size: 15px;
  font-weight: 600
}
</style>
