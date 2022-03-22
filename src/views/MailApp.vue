<template>
  <div class="mail-app-container m-t-50">
    <div class="mj-card">
      <h2>
        Iets onduidelik?
        <span class="emoji-reaction">
          🤔
        </span>
      </h2>
      <p>Vra ons en ons sal terug kom na jou toe.</p>
      <form class="contact-form" @submit.prevent="sendEmail">
        <input type="hidden" v-model="reply_to" name="reply_to" />
        <vs-select
          v-if="invitePersonsWithMails.length > 0"
          class="mj-center"
          placeholder="wie vra?"
          v-model="reply_to"
        >
          <vs-option
            v-for="person in invitePersonsWithMails"
            :key="person.id"
            :label="person.name"
            :value="person.email"
          >
            {{ person.name }} <br />
            <div class="mj-light-grey">
              {{ person.email }}
            </div>
          </vs-option>
        </vs-select>
        <input type="hidden" name="invite_group" v-model="group_name" />
        <vs-input
          class="m-b-10 m-t-10"
          name="msg_subject"
          v-model="msg_subject"
          placeholder="onderwerp"
        >
          <template #icon>
            <i class="bx bx-pencil"></i>
          </template>
        </vs-input>
        <textarea
          style="height: 200px;"
          placeholder="Tik jou boodskap hier"
          type="text"
          name="msg_body"
          v-model="msg_body"
          class="mj-input-text"
        />
        <vs-button
          :loading="sending"
          type="submit"
          value="Send"
          class="mj-center m-t-15"
          floating
        >
          <i class="bx bx-paper-plane m-r-5"></i>Stuur</vs-button
        >
      </form>
    </div>
  </div>
</template>
<script>
import emailjs from 'emailjs-com';
export default {
  data() {
    return {
      msg_subject: '',
      msg_body: '',
      reply_to: '',
      sending: false
    };
  },
  mounted() {
    this.updatePageView('vrae_viewed');
  },
  computed: {
    invite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      return this.getInvite();
    },
    invitePersonsWithMails() {
      var emails = [];
      if (this.invite.people)
        this.invite.people.forEach(person => {
          if (person.email) emails.push(person);
        });
      return emails;
    },
    group_name() {
      return this.getInvite().group_name;
    }
  },

  name: 'MailApp',
  methods: {
    sendEmail(e) {
      if (!this.msg_subject) {
        this.$vs.notification({
          color: 'danger',
          title: 'Whoopsie',
          text: "'n Onderwerp word benodig"
        });
        return;
      }
      this.sending = true;
      emailjs
        .sendForm(
          'ons@mj',
          'myjoubert_query',
          e.target,
          'user_ZgKa7CAcM94kCo9VDpr5j'
        )
        .then(
          result => {
            console.log('SUCCESS!', result.status, result.text);
            this.sending = false;
            this.$vs.notification({
              color: 'success',
              title: 'Whoop',
              text: 'Jou boodskap is gestuur'
            });
          },
          error => {
            console.log('FAILED...', error);
            this.$vs.notification({
              color: 'danger',
              title: 'Ag poef 💩',
              text: 'Iets het fout gegaan'
            });
            this.sending = false;
          }
        );
    }
  }
};
</script>
<style lang="scss">
.mail-app-container {
  width: 100%;
}
.vs-select__option {
  flex-direction: column !important;
}
</style>
