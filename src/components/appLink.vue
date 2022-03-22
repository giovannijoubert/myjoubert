<template>
  <vs-card
    @click="linkClicked()"
    class="appLink"
    :class="whiteIcon ? 'whiteIcon' : ''"
    type="3"
  >
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <template #img>
      <img class="card-img-icon" :src="iconPath" alt="" />
    </template>
    <template #text>
      <p>
        {{ description }}
      </p>
    </template>
  </vs-card>
</template>
<script>
export default {
  computed: {
    iconPath() {
      return (
        'https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/icons/' +
        this.iconType +
        '.svg'
      );
    }
  },
  props: ['iconType', '', 'clickAction', 'title', 'description', 'whiteIcon'],
  name: 'tunesLink',
  methods: {
    linkClicked() {
      this.$router.push('/' + this.clickAction);
    }
  }
};
</script>
<style lang="scss">
.appLink {
  width: fit-content;
  display: inline-block;
  margin: 10px;
}

.appLink .card-img-icon {
  width: 75px;
  padding: 5px;
  min-width: unset !important;
}

.appLink.whiteIcon .vs-card__img {
  box-shadow: 0 3px 15px 0 rgb(0 0 0 / 10%);
}

.appLink.vs-card-content.type-3 .vs-card {
  max-width: 280px !important;
}
</style>
