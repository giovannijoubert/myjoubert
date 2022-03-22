<template>
  <div id="chat-app">
    <div class="chat-container">
      <Chat
        title="Hoe dit als begin het"
        she="Toe ek daai oulike Isaac Newton in ons Gr.8 groentjie konsert gesien het, het
          ek geweet ek wil hom leer ken."
        he="Toe ek hoor daai blonde meisie voor in die klas het .7 meer as ek in ’n
          Wiskunde toets gekry, het ek geweet dis GAME ON."
      />
    </div>
  </div>
</template>
<script>
import Chat from '@/components/Chat';
export default {
  data() {
    return {};
  },
  mounted() {
    this.updatePageView('kitstik_viewed');
  },
  components: { Chat },
  methods: {}
};
</script>
<style lang="scss">
#chat-app {
  width: 100%;
  height: 100%;
}

.chat-container {
  max-width: 500px;
  margin: 0px auto;
  padding-top: 15px;
  height: 95%;
}

@media (max-width: 764px) {
  .chat-container {
    margin: 50px auto;
    height: 90%;
  }
}
</style>
