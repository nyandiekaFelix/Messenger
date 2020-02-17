<template>
  <v-card height="12vh" outlined>
    <v-layout row height="20px">
      <v-flex md4>av</v-flex>
      <v-flex md8>name</v-flex>
    </v-layout>
    </v-card>
</template>

<script>
import SendBirdService from '../../services/SendBird.js';
export default {
  props: {
   channel: { type: Object, required: true}
  },
  methods: {
  }
}
</script>

<style lang="css">
.chat-card {
  height: 10px
}
</style>