<template>
  <section>
    <div>
      <h2 class="subtitle">This is the messaging window</h2>
    </div>
  </section>
</template>

<script>
import SendBirdService from "../services/SendBird.js";

export default {
  mounted() {
    const mocks = [
      {name: 'user1', id: 1},
      {name: 'user2', id: 2},
      {name: 'user3', id: 3},
      {name: 'user4', id: 4},
      {name: 'user5', id: 5},
    ];

    console.group()
    SendBirdService.loginUser('1')
      .then(user => {console.log("Current user\n", user)});

    SendBirdService.startChat(['2', '1'])
      .then(channel => {
        SendBirdService.getChat(channel.url)
          .then(channel => {console.log("New chat started\n", channel)});

        SendBirdService.sendMessage(channel, 'Send a test message')
          .then(message => {console.log("Sent message\n", message)});

        SendBirdService.getChatList()
          .then(list => { console.log("Our chat list", list); })

        SendBirdService.getChatMessages(channel)
          .then(messages => {console.log("Messages in our chat\n", messages)});

        SendBirdService.deleteChat(channel)
          .then(res => {console.log("deleted\n", res)});
      });
    console.groupEnd();
  }
};
</script>

<style scoped>
</style>
