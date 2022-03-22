<template>
  <div class="clock-app-container">
    <vs-row justify="center">
      <h2>
        christi
        <span class="emoji-reaction large">
          💁🏼‍♀️
        </span>
        + giovanni
        <span class="emoji-reaction large">
          👨🏼‍💻
        </span>
        = myjoubert
        <span class="emoji-reaction large">
          👫
        </span>
      </h2>
    </vs-row>
    <vs-row style="align-items: center;" justify="center">
      <vue-countdown-timer
        class="countdown-text"
        :start-time="'2019-12-21 10:00:00'"
        :end-time="1638622800"
        :interval="1000"
        label-position="begin"
        :day-txt="'dae'"
        :hour-txt="'ure'"
        :minutes-txt="'minute'"
        :seconds-txt="'sekondes'"
      >
      </vue-countdown-timer>
      <p class="emoji-reaction">
        🚀
      </p>
    </vs-row>
  </div>
</template>
<script>
export default {
  computed: {
    invite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      return this.getInvite();
    },
    group_name() {
      return this.getInvite().group_name;
    }
  },
  mounted() {
    this.updatePageView('countdown_viewed');
  },

  name: 'ClockApp',

  methods: {}
};
</script>
<style lang="scss">
.clock-app-container h2 {
  font-size: 40px;
}

.clock-app-container .countdown-text {
  letter-spacing: 5px;
  text-transform: uppercase;
  font-size: 25px;
}

.clock-app-container .countdown-text i {
  font-style: normal !important;
}
</style>
