<template>
  <div>
    <vs-row justify="center">
      <h2>RSVP</h2>
    </vs-row>
    <vs-row justify="center">
      <p class="section-description m-b-25">
        Maak al die emoji's gelukkig, ag toe?
      </p>
    </vs-row>
    <vs-row justify="center" class="person-cards-container">
      <vs-col
        v-for="person in people"
        :key="person.id"
        class="vs-xl-3 vs-lg-4 vs-md-6"
        align="center"
        :style="person.kid ? 'z-index:1000' : ''"
      >
        <vs-card class="person-card">
          <template #title>
            <memoji v-if="!person.additional_guest" :personId="person.id" />
            <memoji
              v-if="person.additional_guest"
              :plusone="person.additional_guest"
            />
            <h3 class="m-t-15">{{ person.name }} {{ person.surname }}</h3>
          </template>
          <template #text>
            <label :for="'attendingSwitch' + person.id"
              >Kom {{ person.name }}?</label
            >
            <vs-switch
              style="max-width:100px; margin: 0 auto"
              class="m-b-5 m-t-5"
              :id="'attendingSwitch' + person.id"
              color="success"
              v-model="person.attending"
              @click="updatePerson(person.id)"
            >
              <template #on>Ja</template>
              <template #off>Nee</template>
            </vs-switch>
            <label v-if="person.attending" :for="'dayOnlySwitch' + person.id"
              >Die hele naweek?</label
            >
            <vs-switch
              v-if="person.attending"
              style="max-width:100px; margin: 0 auto"
              class="m-b-5 m-t-5"
              :id="'dayOnlySwitch' + person.id"
              color="success"
              v-model="person.entire_weekend"
              @click="updatePerson(person.id)"
            >
              <template #on>Ja</template>
              <template #off>Nee</template>
            </vs-switch>
            <p
              v-if="person.attending && person.entire_weekend"
              class="emoji-reaction"
            >
              😁
            </p>
            <p
              v-if="person.attending && !person.entire_weekend"
              class="emoji-reaction"
            >
              🙂
            </p>
            <p v-if="!person.attending" class="emoji-reaction">😭</p>
            <transition name="slide-fade">
              <div
                v-if="!person.kid && person.attending"
                class="center content-inputs"
              >
                <vs-input
                  class="m-b-10"
                  v-model="person.email"
                  placeholder="e-pos"
                  @change="updatePerson(person.id)"
                >
                  <template v-if="validEmail(person.email)" #message-success>
                    E-pos Geldig
                  </template>
                  <template
                    v-if="!validEmail(person.email) && person.email"
                    #message-danger
                  >
                    E-pos Ongeldig
                  </template>
                  <template #icon>
                    <i class="bx bx-envelope"></i>
                  </template>
                </vs-input>
                <vs-input
                  class="m-b-10"
                  v-model="person.cellnumber"
                  placeholder="selfoon"
                  @change="updatePerson(person.id)"
                >
                  <template #icon>
                    <i class="bx bx-phone"></i>
                  </template>
                </vs-input>
              </div>
            </transition>
            <transition name="slide-fade">
              <div v-if="person.kid && person.attending">
                <label :for="'birthdayCalendar' + person.id"
                  >Wat is {{ person.name }} se geboortedatum?</label
                >
                <date-picker
                  class="m-t-10"
                  v-model="person.birthdate"
                  valueType="format"
                  @change="updateBirthday(person.id)"
                  :clearable="false"
                ></date-picker>
              </div>
            </transition>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import memoji from '@/components/memoji';

export default {
  components: { DatePicker, memoji },
  data() {
    return {
      name: 'rsvpPeopel',
      songSuggestion: ''
    };
  },
  methods: {
    formatDateForWidget(dateString) {
      return new Date(dateString)
        .toLocaleDateString('en-CA')
        .replaceAll('-0', '-');
    },
    validEmail(email) {
      return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    },
    getPersonByID(id) {
      return this.$store.state.invite.people.filter(i => i.id.includes(id))[0];
    },
    updateBirthday(id) {
      // ensure state changes before calling
      setTimeout(() => {
        this.updatePerson(id);
      }, 200);
    },
    updatePerson(personID) {
      this.$store
        .dispatch('updatePerson', {
          personID: personID
        })
        .then(res => {
          if (res.status == 201 || res.status == 200) {
            // successfully updated person
            console.log('Successfully updated', res);
          } else {
            this.$vs.notification({
              color: 'danger',
              title: 'Aggenee',
              duration: 10000,
              text:
                'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
            });
          }
        })
        .catch(() => {
          this.$router.push('/lockscreen');
          this.$vs.notification({
            color: 'danger',
            title: 'Aggenee',
            duration: 10000,
            text:
              'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
          });
        });

      this.$store.dispatch('updateInviteStatus', {
        invite: this.getInvite(),
        invite_status: 'responded'
      });
    }
  },
  name: 'rsvpPeople',
  props: ['people']
};
</script>
<style lang="scss">
.vs-input,
.vs-input-content {
  max-width: 100%;
}
.vs-switch__text {
  font-size: 13px !important;
  font-weight: 600;
}
label {
  font-size: 14px;
}
.vs-input-content {
  margin: 0 auto;
}

.vfc-main-container {
  border-radius: 25px !important;
}

.vfc-top-date span.vfc-underline {
  underline: rgb(23, 201, 100) !important;
}

.vfc-months-container .vfc-content .vfc-months div.vfc-item.vfc-selected {
  background-color: rgb(23, 201, 100) !important;
}

.vfc-week .vfc-day span.vfc-span-day.vfc-marked {
  background-color: rgb(23, 201, 100) !important;
}
.vfc-week .vfc-day span.vfc-span-day.vfc-today {
  background-color: unset !important;
  color: #000 !important;
}

.person-card {
  margin: 10px;
}

.vs-card-content {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.vs-switch {
  border-radius: 20px !important;
}

.person-cards-container {
  max-width: 1300px;
  margin: 0 auto;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
