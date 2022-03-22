<template>
  <div id="rsvp">
    <div class="m-t-50">
      <memoji personId="6027dfa9cf22c501c35e9f61-greet" />
      <memoji personId="6027df93cf22c501c35e9f60-greet" />
    </div>
    <div class="invite-card">
      <div class="grid">
        <vs-row justify="center">
          <h2>Hello {{ groupName }} 👋</h2>
        </vs-row>
        <vs-row justify="center" class="m-b-25">
          <p class="section-description">
            <span v-html="inviteDescription"></span>
          </p>
        </vs-row>
        <rsvpPeople :people="invitePeople" class="rsvp-card" />
        <vs-row justify="center">
          <createPerson
            class="vs-xl-3 additional-guest-card vs-lg-4 vs-md-6"
            v-for="guest in additionalGuests"
            :key="guest"
            :guestLabel="'#' + guest"
          />
        </vs-row>

        <transition name="slide-fade">
          <rsvpPayment
            v-if="invite.payment"
            :groupName="groupName"
            :kidCount="kidCount"
            :adultCount="adultCount"
            :dayOnly="dayOnlyCount"
            :invitePaymentMade="invitePayment"
          />
        </transition>
        <h2>Dress Code</h2>
        <p class="section-description m-b-20">
          Waatookal jou hart begeer. P.S. ons sal dit ❤️ as jy in jou
          <b>SNEAKERS</b>
          opdaag! <br />
          <i>Converse, Soviet, Levis, Pep-store - ons judge nie.</i>
        </p>

        <appLink
          iconType="podcasts"
          clickAction="dresscode"
          title="Dress Code"
          description="Dis niks te hectic nie, belowe."
        />
        <appLink
          iconType="apple-music"
          clickAction="tunes"
          title="Liedjie Voorstelle"
          description="Onthou om jou tunes te laai!"
        />
        <appLink
          iconType="mail"
          clickAction="vrae"
          title="Iets onduidelik?"
          description="Vra ons gerus!"
        />
      </div>
    </div>
  </div>
</template>

<script>
import rsvpPeople from '@/components/rsvpPeople.vue';
import rsvpPayment from '@/components/rsvpPayment.vue';
import createPerson from '@/components/createPerson.vue';
import appLink from '@/components/appLink.vue';
import Memoji from '../components/memoji.vue';

export default {
  name: 'WalletApp',
  components: {
    appLink,
    rsvpPeople,
    rsvpPayment,
    createPerson,
    Memoji
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
    this.$store.dispatch('getSongSuggestions');
    this.$store.dispatch('getSongSuggestionVotes');

    this.updatePageView('rsvp_viewed');
  }
};
</script>
<style>
#rsvp {
  width: 100%;
}

.vs-switch:active {
  -webkit-transform: unset !important;
  transform: unset !important;
}

@media (max-width: 600px) {
  #rsvp .memoji-wrapper {
    width: 80px !important;
    height: 80px !important;
  }
}

.additional-guest-card .vs-card {
  margin: 0 auto;
}

.rsvp-card {
  margin-top: 20px;
}
.sneakers-full-length {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: block;
  border-radius: 15px;
}
</style>
