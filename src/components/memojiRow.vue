<template>
  <div>
    <div v-for="person in memojis" :key="person.id" class="memoji-person">
      <memoji :name="person.name" :personId="person.id" />
    </div>
  </div>
</template>
<script>
import memoji from '@/components/memoji.vue';
export default {
  computed: {
    invite() {
      return this.getInvite();
    },
    memojis() {
      return this.invite.people.filter(i => !i.additional_guest);
    }
  },
  components: {
    memoji
  }
};
</script>
<style lang="scss">
.memoji-person {
  display: inline-block;
}

.memoji-person h3 {
  margin: 0px;
}
</style>
