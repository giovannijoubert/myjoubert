<template>
  <div id="wallet">
    <vs-row justify="center">
      <vs-col w="12" class="vs-lg-8 vs-xl-6">
        <rsvpPayment
          v-if="invite.payment"
          :groupName="groupName"
          :kidCount="kidCount"
          :adultCount="adultCount"
          :dayOnly="dayOnlyCount"
          :invitePaymentMade="invitePayment"
          :walletApp="true"
        />
      </vs-col>
    </vs-row>

    <appLink
      class="m-t-20 m-b-50"
      :whiteIcon="true"
      iconType="calendar"
      clickAction="rsvp"
      title="RSVP?"
      description="There's an app for that!"
    />
  </div>
</template>

<script>
import rsvpPayment from '@/components/rsvpPayment.vue';
import appLink from '@/components/appLink';
export default {
  name: 'RSVP',
  components: {
    rsvpPayment,
    appLink
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
  mounted() {
    this.updatePageView('betaling_viewed');
  },
  methods: {}
};
</script>
<style lang="scss">
#wallet {
  width: 100%;
  align-self: center;
}
</style>
