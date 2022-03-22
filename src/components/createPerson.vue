<template>
  <vs-card class="create-person-card">
    <template #title>
      <h3 class="m-t-15">Addisionele Gas {{ guestLabel }}</h3>
    </template>
    <template #text>
      <div class="m-t-20 m-b-10">
        <vs-input class="m-t-10" placeholder="naam" v-model="name">
          <template v-if="!name && submitted" #message-danger>
            Vul asseblief hierdie veld in
          </template>
        </vs-input>

        <vs-input class="m-t-10" placeholder="van" v-model="surname">
          <template v-if="!surname && submitted" #message-danger>
            Vul asseblief hierdie veld in
          </template>
        </vs-input>
        <vs-input class="m-t-10" placeholder="e-pos" v-model="email">
          <template #icon> <i class="bx bx-envelope"></i> </template>
          <template v-if="validEmail(email)" #message-success>
            E-pos Geldig
          </template>
          <template v-if="!validEmail(email) && email" #message-danger>
            E-pos Ongeldig
          </template></vs-input
        >
        <vs-input class="m-t-10" placeholder="selfoon" v-model="cellphone">
          <template #icon> <i class="bx bx-phone"></i> </template>
        </vs-input>
        <vs-button
          @click="inviteGuest"
          floating
          style="margin: 0 auto;"
          class="m-t-20"
          >Nooi {{ name }}</vs-button
        >
      </div>
    </template>
  </vs-card>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      cellphone: '',
      email: '',
      submitted: false
    };
  },
  name: 'createPerson',
  props: ['guestLabel'],
  methods: {
    validEmail(email) {
      return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    },
    inviteGuest() {
      this.submitted = true;
      if (!this.name || !this.surname) {
        return;
      }

      this.$store.dispatch('inviteGuest', {
        invite: this.getInvite(),
        guest: this.$data
      });
    }
  }
};
</script>
<style>
.create-person-card {
  padding: 10px;
}
</style>
