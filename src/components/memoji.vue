<template>
  <div class="memoji-holder">
    <div class="memoji-wrapper" :class="'memoji-' + personId">
      <div
        v-if="personId"
        class="memoji-png"
        :style="'background-image: url(' + memojiUrl + ')'"
      />
      <h2 class="plusone-memoji" v-if="plusone && !personId">+one</h2>
    </div>
    <h3>{{ name }}</h3>
  </div>
</template>
<script>
export default {
  computed: {
    memojiUrl() {
      return (
        'https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/memoji/' +
        this.personId +
        '.png'
      );
    }
  },
  props: ['personId', 'name', 'plusone'],
  mounted() {
    var pastelColor = this.getColor();
    document.querySelector('.memoji-' + this.personId).style.background =
      pastelColor + (85 + 10 * Math.random()) + '%)';

    if (this.plusone) {
      document.querySelector(
        '.memoji-' + this.personId + ' .plusone-memoji'
      ).style.color = pastelColor + (30 + 10 * Math.random()) + '%)';
    }
  },
  methods: {
    getColor() {
      return (
        'hsl(' + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,'
      );
    }
  }
};
</script>
<style lang="scss">
.memoji-holder {
  width: fit-content;
  display: inline-block;
}
.memoji-wrapper:hover {
  transform: scale(1.15);
  transition: transform 0.5s;
}

.memoji-wrapper {
  transition: transform 0.5s;
  margin: 10px;
  margin-bottom: 2px;
  display: inline-block;
  background: rgb(222, 238, 234);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 10px;
}

.memoji-png:hover {
  transform: scale(1.1);
  transition: transform 0.5s;
}

.memoji-png {
  transition: transform 0.5s;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

.plusone-memoji {
  color: rgb(82, 82, 82);
  font-size: 35px !important;
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .memoji-wrapper {
    width: 50px;
    height: 50px;
  }
}
</style>
