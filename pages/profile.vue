<template>
  <v-container fluid>
    <NLink 
      :to="{name:'messenger', params:{recipient: '003'}}">
      <v-icon>comment</v-icon>
    </NLink>
  </v-container>
</template>

<script>
export default {

}
</script>