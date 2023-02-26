<template>
  <div>
    <!--<p v-if="!isMetaMaskInstalled">Please install MetaMask to use this app.</p>-->
    <!--<p v-else-if="accounts.length > 0">Logged in as {{ accounts[0] }}</p>-->
    <q-btn  @click="login">Connect to MetaMask</q-btn>
  </div>
</template>

<script>
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { detectEthereumProvider } from '@metamask/detect-provider';

export default {
  name: 'MetaMaskLogin',
  setup() {
    const isMetaMaskInstalled = ref(false);
    const accounts = ref([]);

    const checkMetaMaskInstalled = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        isMetaMaskInstalled.value = true;
        getAccounts();
      } else {
        isMetaMaskInstalled.value = false;
      }
    };

    const getAccounts = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      accounts.value = accounts;
    };

    const login = async () => {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        getAccounts();
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      checkMetaMaskInstalled();
    });
    console.log(isMetaMaskInstalled)
    console.log(accounts)
    //console.log(login)

    return {
      isMetaMaskInstalled,
      accounts,
      login
    }
  }
}
</script>


<style scoped>

</style>
