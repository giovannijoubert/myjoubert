<template>
  <div id="app">
    <transition name="slide-fade">
      <vs-button
        v-if="!activePage('App Switcher') && !activePage('Lockscreen')"
        class="back-app-button"
        size="large"
        @click="linkBack"
        floating
      >
        <i class="bx bx-chevron-left m-r-5"></i> Terug</vs-button
      >
    </transition>
    <div>
      <div
        v-if="!activePage('Lockscreen') && !activePage('Game')"
        class="navigation m-t-15"
      >
        <vs-row justify="center">
          <vs-button
            :active="activePage('App Switcher')"
            @click="$router.push('/apps')"
            large
            border
            ><i class="bx bxs-home m-r-5"></i> myJoubert</vs-button
          >
          <vs-button
            :active="activePage('Venue')"
            @click="$router.push('/venue')"
            large
            border
            ><i class="bx bxs-map m-r-5"></i> Venue</vs-button
          >
          <vs-button
            :active="activePage('RSVP')"
            @click="$router.push('/rsvp')"
            large
            border
            ><i class="bx bxs-envelope-open m-r-5"></i> RSVP</vs-button
          >
        </vs-row>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="!activePage('Lockscreen') && !activePage('Game')"
        id="darkModeToggle"
      >
        <vs-switch
          class="m-b-5 m-t-5"
          color="primary"
          @click="themeChange"
          v-model="lightsOn"
        >
          <template #on>☀️</template>
          <template #off>🌚</template>
        </vs-switch>
      </div>
    </transition>
    <div
      class="content-container"
      :class="activePage('Friends') ? 'full-width' : ''"
    >
      <div class="m-b-5"></div>
      <transition name="scale" mode="out-in" appear>
        <router-view />
      </transition>
      <div class="m-b-50"><br /><br /></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lightsOn: true
    };
  },
  mounted() {
    console.log('INVITE', this.getInvite());
    if (!this.activePage('Lockscreen')) {
      if (!this.getInvite().id) {
        this.$router.push('/locked');
      } else {
        // refresh invite
        this.$store
          .dispatch('getInvite', { inviteID: this.getInvite().id })
          .then(res => {
            if (res.status == 200) {
              localStorage.setItem(
                'invite',
                btoa(unescape(encodeURIComponent(JSON.stringify(res.data))))
              );
            }
          });
      }
    }
  },
  methods: {
    themeChange() {
      if (!this.lightsOn) {
        this.$vs.setTheme('light');
        document.querySelector('body').classList.remove('dark-mode');
      } else {
        this.$vs.setTheme('dark');
        document.querySelector('body').classList.add('dark-mode');
      }
    },
    activePage(val) {
      if (this.$route.name === val || this.$route.name.includes(val))
        return true;
      else return false;
    }
  }
};
</script>

<style lang="scss">
#app {
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#darkModeToggle {
  position: absolute;
  right: 30px;
  top: 18px;
  width: 60px;
  z-index: 99999;
}

.content-container {
  flex-direction: column;
  align-content: center;
  display: flex;
  overflow-y: scroll;
  height: 100%;
  margin: 0px auto;
}

.content-container > div {
  margin-top: auto;
  margin-bottom: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.content-container::-webkit-scrollbar {
  display: none;
}

.full-width {
  width: 100% !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
.content-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.navigation {
  transition: background box-shadow 0.5s;
  -webkit-box-shadow: 0 6px 6px 6px #adadad54;
  -moz-box-shadow: 0 6px 6px 6px #adadad54;
  box-shadow: 0 6px 6px 6px #adadad54;
  background-color: #fff;
  padding: 10px;
  position: fixed;
  bottom: 10px;
  width: 90%;
  max-width: 90%;
  max-width: 450px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .content-container {
    width: 90%;
  }
}
</style>
