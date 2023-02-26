<template>
  <div class="grid place-items-center h-96">
  <q-btn @click="connectWallet" v-if="isMetaMaskSupported" class="text-center" color="orange" label="sign in with MetaMask" type="submit" rounded></q-btn>
  <div class="q-pa-sm"></div>
  <title v-else>Install Meta Mask extension</title>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, defineAsyncComponent} from "vue";

/*declare global{
  interface Window{
    ethereum: any
  }
}*/
//const Title = defineAsyncComponent(()=>import (/*webPackChunkName:"title"*/ '..com'))

/*let isMetaMaskSupported: boolean = ref(false)
onMounted(()=>{ isMetaMaskSupported = typeof (window as any).ethereum !== 'undefined'

})*/

/*async function connectWallet(){
  ((window as any).ethereum.request({ method: 'eth_requestAccounts' }))
}*/
export default {
  name: "MetaMask",

}
</script>

<style scoped>

</style>
