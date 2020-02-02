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
    console.log("Let's test our SendBird Connection");
    SendBirdService.testConnection();
  }
};
</script>

<style scoped>
</style>
