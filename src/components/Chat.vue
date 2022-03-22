<template>
  <div class="chat-component">
    <div class="chat-header">
      <vs-avatar class="chat-avatar  m-r-15" history history-gradient circle>
        <img
          src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/images/group_pp.jpg"
          alt=""
        />
      </vs-avatar>
      {{ title }}
    </div>
    <div class="chat-body">
      <transition name="fade">
        <div v-if="chatOrder == -1" class="chat-bubble-container left">
          <vs-avatar
            class="chat-avatar christi"
            history
            history-gradient
            circle
          >
            <img
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/6027dfa9cf22c501c35e9f61.png"
              alt=""
            />
          </vs-avatar>
          <div class="chat-bubble left typing">
            <div class="chat-bubble-header">Christi</div>
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </transition>
      <transition name="chat-bubble">
        <div v-if="chatOrder >= 1" class="chat-bubble-container left">
          <vs-avatar
            class="chat-avatar christi"
            history
            history-gradient
            circle
          >
            <img
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/6027dfa9cf22c501c35e9f61.png"
              alt=""
            />
          </vs-avatar>
          <div class="chat-bubble left">
            <div class="chat-bubble-header">Christi</div>
            {{ she }}
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="chatOrder == 2" class="chat-bubble-container right">
          <div class="chat-bubble right typing">
            <div class="chat-bubble-header">Giovanni</div>
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <vs-avatar
            class="chat-avatar giovanni"
            history
            history-gradient
            circle
          >
            <img
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/6027df93cf22c501c35e9f60.png"
              alt=""
            />
          </vs-avatar>
        </div>
      </transition>
      <transition name="chat-bubble">
        <div v-if="chatOrder >= 4" class="chat-bubble-container right">
          <div class="chat-bubble right">
            <div class="chat-bubble-header right">Giovanni</div>
            {{ he }}
          </div>
          <vs-avatar
            class="chat-avatar giovanni"
            history
            history-gradient
            circle
          >
            <img
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/6027df93cf22c501c35e9f60.png"
              alt=""
            />
          </vs-avatar>
        </div>
      </transition>
      <transition name="chat-bubble">
        <div v-if="chatOrder >= 5" class="chat-bubble-container left">
          <vs-avatar
            class="chat-avatar christi"
            history
            history-gradient
            circle
          >
            <img
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/6027dfa9cf22c501c35e9f61.png"
              alt=""
            />
          </vs-avatar>
          <div class="chat-bubble left attachment">
            <div class="chat-bubble-header">Christi</div>
            Kyk die cuties! <br />
            <img
              @click="navigateToPhotos()"
              class="chat-gallery attachment"
              src="https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/images/chat-gallery.jpg"
            />
          </div>
        </div>
      </transition>
    </div>
    <div class="chat-box">
      <div class="center content-inputs p-t-15">
        <vs-input
          type="text"
          icon-after
          v-model="message"
          placeholder="Tik 'n boodskap"
        >
          <template #icon>
            <i class="chat-send bx bx-send"></i>
          </template>
        </vs-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Chat',
  data() {
    return { message: '', chatOrder: -1 };
  },
  props: ['he', 'she', 'title'],
  mounted() {
    document.querySelector('.vs-input__icon--after').onclick = this.sendMsg;
    setTimeout(() => {
      this.chatOrder++;
    }, 1450);
    setTimeout(() => {
      this.chatOrder++;
    }, 2000);
    setTimeout(() => {
      this.chatOrder++;
    }, 2500);
    setTimeout(() => {
      this.chatOrder++;
    }, 6500);
    setTimeout(() => {
      this.chatOrder++;
    }, 7050);
    setTimeout(() => {
      this.chatOrder++;
    }, 10000);
  },

  methods: {
    sendMsg() {
      this.$vs.notification({
        color: 'danger',
        title: 'Hey! 😏',
        text: 'Wie se storie is hierdie mhmm?'
      });
    },
    navigateToPhotos() {
      this.$router.push('/fotos');
    }
  }
};
</script>
<style lang="scss">
.chat-component {
  -webkit-box-shadow: 0 6px 6px 6px #adadad15;
  -moz-box-shadow: 0 6px 6px 6px #adadad15;
  box-shadow: 0 6px 6px 6px #adadad15;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  position: relative;
}

.chat-body {
  padding-top: 20px;
  max-height: 82%;
  overflow-y: scroll;
}

.attachment {
  cursor: pointer;
  transition: all 0.3s;
}

.attachment:hover {
  cursor: pointer;
  transform: scale(1.03);
  transition: all 0.3s;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.chat-body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chat-body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.chat-bubble-header {
  font-size: 13px;
}

.chat-bubble-header.right {
  text-align: right;
}

.chat-gallery {
  max-width: 180px;
}

.chat-avatar.christi .vs-avatar {
  background: rgb(241, 206, 218) !important;
}

.chat-avatar.giovanni .vs-avatar {
  background: rgb(206, 231, 241) !important;
}

.chat-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  background: rgba(var(--vs-primary), 1);
  color: #fff;
  height: 60px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.chat-send,
.vs-input__icon.vs-input__icon--after {
  pointer-events: all;
  cursor: pointer;
}

.chat-bubble {
  color: #fff;
  padding: 10px;
  text-align: left;
  background: rgba(var(--vs-primary), 1);
  max-width: 75%;
  margin: 10px;
  border-radius: 10px;
  min-height: 60px;
}

.chat-bubble.left {
  background-color: rgb(231, 231, 231);
  color: #333;
}

.chat-bubble.typing {
  min-height: 45px;
}
.chat-bubble.attachment {
  margin-bottom: 30px;
}

.chat-gallery.attachment {
  margin-top: 10px !important;
}

.chat-box {
  z-index: 1;
  height: 60px;
  width: 100%;
  margin: 0px auto;
  background: rgba(var(--vs-primary), 1);
  bottom: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
}

.chat-avatar {
  height: 44px !important;
  min-width: 44px !important;
  max-width: 44px !important;
  z-index: 0;
  margin: 5px;
}
.chat-bubble-container {
  display: flex;
}

.chat-bubble-container.right {
  justify-content: flex-end;
}

.typing-indicator {
  will-change: transform;
  width: auto;
  border-radius: 50px;
  padding: 10px;
  display: table;
  margin: 0 auto;
  position: relative;
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin: 0 1px;
    background-color: #9e9ea1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * 0.3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}
</style>
