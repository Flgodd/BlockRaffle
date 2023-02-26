<template>
  <div>
    <h1>Meta Mask</h1>
    <MetaMaskLogin />
  </div>
</template>

<script>
import MetaMaskLogin from 'components/MetaMaskLogin.vue';
export default {
  name: "Meta",
  components: {
    MetaMaskLogin,
  },
};
</script>

<style scoped>

</style>
