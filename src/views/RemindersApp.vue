<template>
  <div id="reminders-app">
    <div class="reminders-container">
      <div v-for="reminderGroup in reminders" :key="reminderGroup.title">
        <h3>{{ reminderGroup.title }}</h3>
        <vs-checkbox
          @click="remindClicked"
          v-for="item in reminderGroup.items"
          :key="item.title"
          v-model="item.checked"
          >{{ item.title }}
          <br />
          <p class="subtitle">{{ item.subtitle }}</p>
        </vs-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: false,
      reminders: [
        {
          title: 'ONTHOU',
          items: [
            {
              title: 'Sneakers is baie welkom 😎',
              checked: false
            },
            {
              title: 'Lys jou liedjie-versoeke 🎶',
              checked: false
            },
            { title: 'Laat weet as jy kos-allergieë het ✉️', checked: false }
          ]
        },
        {
          title: 'WAT MOET JY DOEN?',
          items: [
            {
              title: 'Check-in vanaf 16:00 Vrydag',
              subtitle: 'Naweek gaste',
              checked: false
            },
            {
              title: 'Arriveer enige tyd vanaf 11:00',
              subtitle: 'Saterdag gaste',
              checked: false
            },
            {
              title: 'Gryp ’n biertjie',
              checked: false
            },
            {
              title: 'Check die riviertjie',
              checked: false
            },
            {
              title: 'Soek ’n diertjie',
              checked: false
            }
          ]
        },
        {
          title: 'IN JOU NAWEEK TAS 🧳',
          items: [
            {
              title: 'Koffie, tee, suiker en melk',
              subtitle: ' (daar is ’n ketel, yskassie en bekers in die kamer)',
              checked: false
            },
            {
              title: 'Koeldranke, geen alkohol',
              subtitle: 'Daar is ’n kontantkroeg',
              checked: false
            },
            {
              title: 'Snacks',
              subtitle: 'As jy bang is jy word honger',
              checked: false
            },
            { title: 'Peaceful sleep', checked: false },
            { title: 'Reëngoed en warmgoed', checked: false }
          ]
        },
        {
          title: 'OPSIONEEL 😏',
          items: [
            { title: 'Swemklere', checked: false },
            { title: 'Handoeke', checked: false },
            { title: 'Sonroom', checked: false },
            { title: 'Piekniek kombers', checked: false },
            { title: 'Kampstoele', checked: false },
            { title: 'Stapskoene', checked: false }
          ]
        }
      ]
    };
  },
  computed: {
    inviteReminders() {
      if (this.$store.state.invite) return this.$store.state.invite.reminder;
      return null;
    }
  },
  mounted() {
    if (this.inviteReminders) {
      this.syncReminders();
    }

    this.updatePageView('onthou_viewed');
  },
  watch: {
    inviteReminders: function(val) {
      if (val) {
        this.syncReminders();
      }
    }
  },
  methods: {
    syncReminders() {
      for (let index = 0; index < this.reminders.length; index++) {
        var reminderGroup = this.inviteReminders.filter(
          i => i.title == this.reminders[index].title
        );
        if (reminderGroup.length > 0) {
          for (
            let indexItems = 0;
            indexItems < this.reminders[index].items.length;
            indexItems++
          ) {
            var reminderItem = reminderGroup[0].items.filter(
              i => i.title == this.reminders[index].items[indexItems].title
            );
            if (reminderItem.length > 0) {
              this.reminders[index].items[indexItems].checked =
                reminderItem[0].checked;
            }
          }
        }
      }
    },
    remindClicked() {
      this.$store.dispatch('updateReminders', {
        invite: this.getInvite(),
        reminder: this.$data.reminders
      });
    }
  }
};
</script>
<style lang="scss">
.reminders-container .subtitle {
  font-size: 12px;
  display: contents;
}
.reminders-container .vs-checkbox-content {
  justify-content: center;
}

.reminders-container .vs-checkbox-label {
  font-size: 17px;
  max-width: 100%;
}
.vs-checkbox-content {
  width: fit-content;
  margin: 0 auto;
}

.vs-icon-check .line1 {
  width: 5px !important;
}
</style>
