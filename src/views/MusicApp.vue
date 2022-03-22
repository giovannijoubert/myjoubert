<template>
  <div id="rsvp">
    <div class="invite-card">
      <div class="grid">
        <rsvpTunes
          :inviteSongSuggestionVotes="inviteSongSuggestionVotes"
          :songSuggestions="songSuggestions"
          :songSuggestionVotes="songSuggestionVotes"
          class="rsvp-card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import rsvpTunes from '@/components/rsvpTunes.vue';

export default {
  name: 'MusicApp',
  components: {
    rsvpTunes
  },
  data() {
    return {};
  },
  computed: {
    additionalGuests() {
      if (this.$store.state.invite)
        return this.$store.state.invite.num_additional_guests;
      return 0;
    },
    invite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      return this.getInvite();
    },
    adultCount() {
      if (!this.invitePeople) return null;
      return this.invitePeople.filter(
        i => i.attending && !i.kid && i.entire_weekend
      ).length;
    },
    kidCount() {
      if (!this.invitePeople) return null;
      return this.invitePeople.filter(
        i => i.attending && i.kid && i.entire_weekend
      ).length;
    },
    dayOnlyCount() {
      if (!this.invitePeople) return null;
      return this.invitePeople.filter(i => i.attending && !i.entire_weekend)
        .length;
    },
    groupName() {
      return this.invite.group_name;
    },
    inviteDescription() {
      return this.invite.description;
    },
    invitePeople() {
      return this.invite.people;
    },
    invitePayment() {
      return this.invite.payment_made;
    },
    songSuggestions() {
      return this.$store.state.songSuggestions
        ? this.$store.state.songSuggestions
        : null;
    },
    inviteSongSuggestionVotes() {
      return this.$store.state.invite
        ? this.$store.state.invite.song_suggestion_votes
        : null;
    },
    songSuggestionVotes() {
      return this.$store.state.songSuggestionVotes
        ? this.$store.state.songSuggestionVotes
        : null;
    },
    inviteID() {
      return this.getInvite().id;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch('getSongSuggestions').catch(() => {
      this.$router.push('/lockscreen');
      this.$vs.notification({
        color: 'danger',
        title: 'Aggenee',
        duration: 10000,
        text:
          'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
      });
    });
    this.$store.dispatch('getSongSuggestionVotes');
    this.updatePageView('tunes_viewed');
  }
};
</script>
<style scoped>
.rsvp-card {
  margin-top: 20px;
}
.invite-card {
  width: 80%;
  margin: 0 auto;
  border-radius: 25px;
}

@media screen and (max-width: 640px) {
  .invite-card {
    width: 95% !important;
  }
}
</style>
