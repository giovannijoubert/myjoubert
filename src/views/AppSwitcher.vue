<template>
  <div class="app-switcher-container">
    <memojiRow />
    <h1>Hello {{ group_name }}!</h1>
    <p class="section-description m-b-50">
      Welkom by ons storie. 😊 Gebruik die apps hieronder om te RSVP, liedjie
      voorstelle te maak en nog meer!
    </p>
    <div class="icons-container">
      <AppIcon
        :hasNotification="msgNotification"
        icon-type="ios-message"
        icon-label="Kitstik"
        icon-click="kitstik"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="podcasts"
        icon-label="Dress Code"
        icon-click="dresscode"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="photos"
        icon-label="Foto's"
        icon-click="fotos"
        @iconClicked="iconClicked"
      />
      <AppIcon
        v-if="2 == 1"
        icon-type="maps"
        icon-label="Aanwysings"
        icon-click="aanwysings"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="apple-store"
        icon-label="Geskenklys"
        icon-click="geskene"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="mail"
        icon-label="Vrae"
        icon-click="vrae"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="home"
        icon-label="Venue"
        icon-click="venue"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="clock"
        icon-label="Countdown"
        icon-click="countdown"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="apple-music"
        icon-label="Tunes"
        @iconClicked="functionClosed"
      />
      <AppIcon
        icon-type="find-my-friends"
        icon-label="Friends"
        icon-click="friends/quiz/start"
        @iconClicked="iconClicked"
      />
      <AppIcon
        v-if="2 == 1"
        icon-type="wallet"
        icon-label="Betaling"
        icon-click="betaling"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="game-center"
        icon-label="Game"
        icon-click="game"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="reminders"
        icon-label="Onthou"
        icon-click="onthou"
        @iconClicked="iconClicked"
      />
      <AppIcon
        icon-type="calendar"
        icon-label="RSVP"
        icon-click="rsvp"
        @iconClicked="iconClicked"
      />
    </div>
  </div>
</template>
<script>
import AppIcon from '@/components/AppIcon';
import memojiRow from '@/components/memojiRow';
export default {
  data() {
    return {
      msgNotification: false,
      msgNotificationObject: null
    };
  },
  computed: {
    invite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      return this.getInvite();
    },
    group_name() {
      return this.getInvite().group_name;
    }
  },
  components: {
    AppIcon,
    memojiRow
  },
  name: 'icons',
  mounted() {
    if (
      this.getInvite().status == 'unsent' ||
      this.getInvite().status == 'sent'
    )
      this.$store.dispatch('updateInviteStatus', {
        invite: this.getInvite(),
        invite_status: 'link_viewed'
      });

    if (this.getInvite().id === '60284147e1bb64008d772b4d') {
      this.$vs.notification({
        color: 'danger',
        title: 'GAAN LEER FRANNA',
        text: 'Hou op die game score jaag, jyt eksamens of iets',
        duration: 10000
      });
    }

    if (this.getInvite().id === '602840c9e1bb64008d772b48') {
      this.$vs.notification({
        color: 'danger',
        title: 'GAAN WEN VIR FRANNA',
        text: 'Gaan regtig jou game moet up en vir Franna inhaal',
        duration: 10000
      });
    }

    if (this.$store.state.firstLoad) {
      setTimeout(() => {
        this.msgNotification = true;
        this.msgNotificationObject = this.$vs.notification({
          color: 'success',
          title: 'Nuwe Kitstik Boodskap',
          text: 'Gaan loer gou!',
          duration: 10000
        });
      }, 1000);
      this.$store.commit('firstLoadComplete');
    }
  },
  methods: {
    functionClosed() {
      this.msgNotificationObject = this.$vs.notification({
        color: 'danger',
        title: 'Gesluit',
        text: 'Die tunes lys is reeds vol 😁',
        duration: 10000
      });
    },
    iconClicked() {
      if (this.msgNotificationObject) this.msgNotificationObject.close();
    }
  }
};
</script>
<style lang="scss">
.icons-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
}

.app-switcher-container {
  max-width: 1400px;
  margin: 0 auto;
  justify-self: center;
  background-size: cover !important;
  background-position-y: center !important;
  background-repeat: no-repeat !important;
}

@media (max-width: 800px) {
  .icons-container {
    width: 90%;
  }
}
</style>
